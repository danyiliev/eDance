import React from 'react';
import Radio from './radio/Radio';
import {createBottomTabNavigator, BottomTabBar} from '@react-navigation/bottom-tabs';
import {Image, View, NativeModules, Platform} from 'react-native';
import ImageScale from 'react-native-scalable-image';
import {styles as stylesTab, styles} from './styles';
import {colors as colorTheme} from '../../styles/theme.style';
import Tv from './tv/Tv';
import Pro from './pro/Pro';
import Student from './student/Student';
import Store from './store/Store';
import Likes from './likes/Likes';
import {Button, Icon} from 'react-native-elements';
import MenuModal from '../../components/MenuModal/MenuModal';
import {stylesApp} from '../../styles/app.style';
import SplashScreen from 'react-native-splash-screen';
import Profile from '../profile/Profile';
import ActionSheet from 'react-native-actionsheet';
import Orders from '../orders/Orders';
import Products from '../products/Products';
import {config} from '../../helpers/config';
import {connect} from 'react-redux';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';
import Subscription from '../subscription/Subscription';
import RNIap from 'react-native-iap';
import {User} from '../../models/user.model';

const Tab = createBottomTabNavigator();
const StripeManager = NativeModules.StripeManager;

export function renderMenuButton(onPress) {
  return (
    <Button
      type="clear"
      buttonStyle={stylesTab.butHeaderLeft}
      icon={
        <ImageScale
          width={18}
          source={require('../../../assets/imgs/ic_but_menu.png')}
        />
      }
      onPress={onPress}
    />
  );
}

class TabMain extends React.Component {
  static NAV_NAME = 'tabs';

  currentUser = null;

  constructor(props) {
    super(props);

    this.currentUser = props.UserReducer.user;

    props.navigation.setOptions({
      title: this.getHeaderTitle(),
      headerRight: () => this.renderRightButton(),
    });
  }

  async componentDidMount(): void {
    SplashScreen.hide();

    if (this.currentUser?.stripeCustomerId) {
      try {
        await StripeManager.initCustomer(this.currentUser?.stripeCustomerId);
      } catch (e) {
        console.log(e);
      }
    }

    // TODO: init push notification for Sendbird

    //
    // check subscription validation
    //
    try {
      if (Platform.OS === 'ios') {
        if (this.currentUser?.iapReceipt) {
          const receiptBody = {
            'receipt-data': this.currentUser?.iapReceipt,
            password: config.iapSharedSecret,
          };

          const result = await RNIap.validateReceiptIos(receiptBody, true);

          // receipt:
          //   adam_id: 0
          //   app_item_id: 0
          //   application_version: "2"
          //   bundle_id: "com.hj.edance"
          //   download_id: 0
          //   in_app: Array(1)
          //   0: {quantity: "1", product_id: "com.dancesport.monthly.starter", transaction_id: "1000000751847094", original_transaction_id: "1000000751847094", purchase_date: "2020-12-08 19:20:43 Etc/GMT", …}
          //   length: 1
          //   __proto__: Array(0)
          //   original_application_version: "1.0"
          //   original_purchase_date: "2013-08-01 07:00:00 Etc/GMT"
          //   original_purchase_date_ms: "1375340400000"
          //   original_purchase_date_pst: "2013-08-01 00:00:00 America/Los_Angeles"
          //   receipt_creation_date: "2020-12-08 19:20:44 Etc/GMT"
          //   receipt_creation_date_ms: "1607455244000"
          //   receipt_creation_date_pst: "2020-12-08 11:20:44 America/Los_Angeles"
          //   receipt_type: "ProductionSandbox"
          //   request_date: "2020-12-08 19:51:58 Etc/GMT"
          //   request_date_ms: "1607457118461"
          //   request_date_pst: "2020-12-08 11:51:58 America/Los_Angeles"
          //   version_external_identifier: 0
          console.log(result);

          if (result?.receipt?.in_app && result?.receipt?.in_app.length > 0) {
            const productId = result?.receipt?.in_app[0].product_id;

            if (productId === config.iapStarter) {
              this.currentUser.subscription = User.SUBSCRIPTION_STARTER;
            }
          }
        }
      } else {
        // todo: need to be improved
        if (this.currentUser?.iapReceipt) {
          this.currentUser.subscription = User.SUBSCRIPTION_STARTER;
        }
      }
    } catch (e) {
      console.log(e);
    }
  }

  componentDidUpdate(
    prevProps: Readonly<P>,
    prevState: Readonly<S>,
    snapshot: SS,
  ): void {
    // update title
    this.props.navigation.setOptions({
      title: this.getHeaderTitle(),
    });
  }

  getRouteName() {
    const route = this.props.route;
    const routeName = getFocusedRouteNameFromRoute(route) ?? Pro.NAV_NAME;

    return routeName;
  }

  getHeaderTitle() {
    const routeName = this.getRouteName();

    switch (routeName) {
      case Radio.NAV_NAME:
        return 'Dance Radio';
      case Tv.NAV_NAME:
        return 'Dance TV';
      case Pro.NAV_NAME:
        return 'Dance Pro';
      case Student.NAV_NAME:
        return 'Dance Student';
      case Store.NAV_NAME:
        return 'Store';
      case Likes.NAV_NAME:
        return 'Likes';
    }
  }

  render() {
    return (
      <View style={stylesApp.viewContainer}>
        <Tab.Navigator
          initialRouteName={Pro.NAV_NAME}
          tabBarOptions={{
            activeTintColor: colorTheme.primary,
          }}
          tabBar={(props) => {
            return <BottomTabBar style={styles.tabbar} {...props} />;
          }}>
          <Tab.Screen
            name={Radio.NAV_NAME}
            component={Radio}
            options={{
              tabBarLabel: 'Radio',
              tabBarIcon: ({focused, color, size}) => (
                <ImageScale
                  width={21}
                  style={{
                    opacity: focused ? 1 : 0.3,
                  }}
                  source={require('../../../assets/imgs/tab_radio.png')}
                />
              ),
            }}
            listeners={({navigation}) => ({
              tabPress: (e) => {
                this.onTabPress(Radio.NAV_NAME, navigation, e);
              },
            })}
          />
          <Tab.Screen
            name={Tv.NAV_NAME}
            component={Tv}
            options={{
              tabBarLabel: 'TV',
              tabBarIcon: ({focused, color, size}) => (
                <ImageScale
                  width={24}
                  style={{
                    opacity: focused ? 1 : 0.3,
                  }}
                  source={require('../../../assets/imgs/tab_tv.png')}
                />
              ),
            }}
            listeners={({navigation}) => ({
              tabPress: (e) => {
                this.onTabPress(Tv.NAV_NAME, navigation, e);
              },
            })}
          />
          <Tab.Screen
            name={Pro.NAV_NAME}
            component={Pro}
            options={{
              tabBarLabel: 'Pro',
              tabBarIcon: ({focused, color, size}) => (
                <ImageScale
                  width={16}
                  style={{
                    opacity: focused ? 1 : 0.3,
                  }}
                  source={require('../../../assets/imgs/tab_pro.png')}
                />
              ),
            }}
          />
          <Tab.Screen
            name={Student.NAV_NAME}
            component={Student}
            options={{
              tabBarLabel: 'Student',
              tabBarIcon: ({focused, color, size}) => (
                <ImageScale
                  width={22}
                  style={{
                    opacity: focused ? 1 : 0.3,
                  }}
                  source={require('../../../assets/imgs/tab_student.png')}
                />
              ),
            }}
          />
          <Tab.Screen
            name={Store.NAV_NAME}
            component={Store}
            options={{
              tabBarLabel: 'Store',
              tabBarIcon: ({focused, color, size}) => (
                <ImageScale
                  width={22}
                  style={{
                    opacity: focused ? 1 : 0.3,
                  }}
                  source={require('../../../assets/imgs/tab_store.png')}
                />
              ),
            }}
          />
          <Tab.Screen
            name={Likes.NAV_NAME}
            component={Likes}
            options={{
              tabBarLabel: 'Likes',
              tabBarIcon: ({focused, color, size}) => (
                <ImageScale
                  width={22}
                  style={{
                    opacity: focused ? 1 : 0.3,
                  }}
                  source={require('../../../assets/imgs/tab_like.png')}
                />
              ),
            }}
          />
        </Tab.Navigator>

        <ActionSheet
          ref={(o) => (this.ActionSheet = o)}
          options={['My Orders', 'My Products', 'Cancel']}
          cancelButtonIndex={2}
          onPress={(index) => {
            this.onMoreItem(index);
          }}
        />
      </View>
    );
  }

  renderRightButton() {
    const routeName = this.getRouteName();

    if (routeName === Store.NAV_NAME) {
      return (
        <Button
          type="clear"
          buttonStyle={stylesTab.butHeaderLeft}
          icon={<Icon type="ionicon" name="ios-more" size={20} />}
          onPress={() => this.onStoreMore()}
        />
      );
    } else {
      return (
        <Button
          type="clear"
          buttonStyle={stylesTab.butHeaderLeft}
          icon={<Icon type="font-awesome" name="user-o" size={16} />}
          onPress={() => {
            this.props.navigation.navigate(Profile.NAV_NAME);
          }}
        />
      );
    }
  }

  onTabPress(name, navigation, e) {
    if (!this.currentUser?.subscription) {
      // Prevent default action
      e.preventDefault();

      // open subscription page
      navigation.navigate(Subscription.NAV_NAME_MAIN);
    }
  }

  onStoreMore() {
    this.ActionSheet.show();
  }

  onMoreItem(index) {
    if (index === 0) {
      // go to my orders
      this.props.navigation.push(Orders.NAV_NAME);
    } else if (index === 1) {
      // go to my products
      this.props.navigation.push(Products.NAV_NAME);
    }
  }
}

const mapStateToProps = (state) => state;
export default connect(mapStateToProps, null)(TabMain);
