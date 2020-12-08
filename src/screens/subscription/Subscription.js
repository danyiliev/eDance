import React from 'react';
import {stylesApp} from '../../styles/app.style';
import {styles} from './styles';
import {Platform, Text, View} from 'react-native';
import {Button} from 'react-native-elements';
import {User} from '../../models/user.model';
import RNIap, {
  purchaseUpdatedListener,
  purchaseErrorListener,
  InAppPurchase,
  SubscriptionPurchase,
  ProductPurchase,
  IAPErrorCode,
} from 'react-native-iap';
import {config} from '../../helpers/config';
import Toast from 'react-native-simple-toast';
import {LoadingHUD} from 'react-native-hud-hybrid';
import {ApiService} from '../../services';
import {setUserInfo} from '../../actions/user';
import {connect} from 'react-redux';

class Subscription extends React.Component {
  static NAV_NAME = 'subscription';

  state = {
    subscriptions: [],
  };

  currentUser = null;

  constructor(props) {
    super(props);

    props.navigation.setOptions({
      title: 'Subscription',
    });

    this.currentUser = props.UserReducer.user;

    this.loadingHUD = new LoadingHUD();
  }

  async componentDidMount(): void {
    const itemSkus = Platform.select({
      ios: [config.iapStarter],
      android: [config.iapStarter],
    });

    try {
      const result = await RNIap.initConnection();
      console.log('init connection: ', result);

      // we make sure that "ghost" pending payment are removed
      // (ghost = failed pending payment that are still marked as pending in Google's native Vending module cache)
      await RNIap.flushFailedPurchasesCachedAsPendingAndroid();

      const subscriptions = await RNIap.getSubscriptions(itemSkus);
      console.log(subscriptions);

      this.setState({subscriptions});

      this.purchaseUpdateSubscription = purchaseUpdatedListener(
        (purchase: InAppPurchase | SubscriptionPurchase | ProductPurchase) => {
          this.onUpdatePurchase(purchase);
        },
      );

      this.purchaseErrorSubscription = purchaseErrorListener((error) => {
        console.log('purchaseErrorListener', error);

        this.onPurchaseError(error);
      });
    } catch (err) {
      console.log(err); // standardized err.code and err.message available

      Toast.show(err.message);
    }
  }

  componentWillUnmount() {
    if (this.purchaseUpdateSubscription) {
      this.purchaseUpdateSubscription.remove();
      this.purchaseUpdateSubscription = null;
    }
    if (this.purchaseErrorSubscription) {
      this.purchaseErrorSubscription.remove();
      this.purchaseErrorSubscription = null;
    }
  }

  render() {
    return (
      <View style={stylesApp.viewContainer}>
        {/* header */}
        <View style={styles.viewHeader}>
          <View>
            <Text style={styles.txtHeaderLabel}>Upgrade to</Text>
            <Text style={styles.txtHeaderTitle}>Starter Account</Text>
          </View>
        </View>

        <View style={styles.viewContent}>
          <View>
            {/* price */}
            <View style={styles.viewPrice}>
              <Text style={styles.txtPrice}>
                {this.state.subscriptions.length > 0 ? this.state.subscriptions[0].localizedPrice : '$---'}
              </Text>
              <Text style={styles.txtPriceDesc}>per month</Text>
            </View>

            {/* desc */}
            <View style={styles.viewDesc}>
              {this.renderDescItem('Listen to Dance Radio')}
              {this.renderDescItem('Watch Dance TV videos')}
              {this.renderDescItem('Book lessons from teachers')}
            </View>
          </View>

          {/* footer */}
          <View>
            {/* terms */}
            <Button
              type="clear"
              title="Terms and Policies"
              titleStyle={styles.titleButTerm}
              onPress={() => this.onButLogin()}
            />
            <Text style={styles.txtTerm}>
              The subscription will automatically renew unless auto-renew is turned off at least 24 hours before the end of the current period. You can go to your iTunes Account settings to manage your subscription and turn off auto-renew. Your iTunes Account will be charged when the purchase is confirmed.
            </Text>

            {/* actions */}
            <View style={styles.viewAction}>
              <Button
                title="Upgrade"
                disabled={this.state.subscriptions.length <= 0}
                buttonStyle={stylesApp.butPrimary}
                disabledStyle={[stylesApp.butPrimary, stylesApp.semiTrans]}
                titleStyle={stylesApp.titleButPrimary}
                onPress={() => this.onButUpgrade()}
              />
              <Button
                type="clear"
                containerStyle={stylesApp.mt6}
                title="Restore Purchases"
                titleStyle={styles.titleButRestore}
                onPress={() => this.onButRestore()}
              />
            </View>
          </View>
        </View>
      </View>
    );
  }

  renderDescItem(text) {
    return (
      <View style={styles.viewDescItem}>
        <Text style={styles.bullet}>{'\u2022'}</Text>
        <Text style={styles.bulletText}>{text}</Text>
      </View>
    );
  }

  async onUpdatePurchase(purchase) {
    console.log(purchase);

    try {
      const receipt = purchase.transactionReceipt;
      if (!receipt) {
        return;
      }

      // save receipt to db
      await ApiService.updateUserFields({iapReceipt: receipt});
      this.currentUser.iapReceipt = receipt;

      // Tell the store that you have delivered what has been paid for.
      // Failure to do this will result in the purchase being refunded on Android and
      // the purchase event will reappear on every relaunch of the app until you succeed
      // in doing the below. It will also be impossible for the user to purchase consumables
      // again until you do this.
      if (Platform.OS === 'ios') {
        await RNIap.finishTransactionIOS(purchase.transactionId);
      } else if (Platform.OS === 'android') {
        // If not consumable
        await RNIap.acknowledgePurchaseAndroid(purchase.purchaseToken);
      }

      // From react-native-iap@4.1.0 you can simplify above `method`. Try to wrap the statement with `try` and `catch` to also grab the `error` message.
      await RNIap.finishTransaction(purchase, false);

      // success
      Toast.show('Upgraded to Starter successfully');

      this.currentUser.subscription = User.SUBSCRIPTION_STARTER;
      this.props.navigation.goBack();
    } catch (e) {
      console.log(e);

      Toast.show(e.message);
    }

    this.loadingHUD.hideAll();
  }

  onPurchaseError(error) {
    this.loadingHUD.hideAll();

    if (error.code === IAPErrorCode.E_USER_CANCELLED) {
      return;
    }

    Toast.show(error.message);
  }

  async onButUpgrade() {
    if (this.state.subscriptions.length <= 0) {
      return;
    }

    this.loadingHUD.show();

    try {
      await RNIap.requestSubscription(config.iapStarter);
    } catch (err) {
      console.warn(err.code, err.message);
    }
  }

  onButRestore() {
  }
}

const mapStateToProps = (state) => state;

const mapDispatchToProps = {
  setUserInfo,
};

export default connect(mapStateToProps, mapDispatchToProps)(Subscription);
