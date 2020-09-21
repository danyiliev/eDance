import React from 'react';
import {connect} from 'react-redux';
import {Alert, Image, Text, View} from 'react-native';
import {stylesApp, styleUtil} from '../../../styles/app.style';
import {styles} from './styles';
import {Button} from 'react-native-elements';
import {ApiService} from '../../../services';
import {UserHelper} from '../../../helpers/user-helper';
import {setUserInfo} from '../../../actions/user';
import {LoadingHUD} from 'react-native-hud-hybrid';
import WebView from 'react-native-webview';
import {config} from '../../../helpers/config';

class AddStripeAccount extends React.Component {
  static NAV_NAME = 'add-stripe-account';

  state = {
    // ui
    showWebView: false,
    url: '',

    // data
    accountId: '',
    email: '',
    country: '',
  };

  currentUser = null;

  constructor(props) {
    super(props);

    props.navigation.setOptions({
      title: 'Settings',
    });

    this.currentUser = props.UserReducer.user;

    // init
    this.state.url = `https://connect.stripe.com/oauth/authorize?response_type=code&client_id=${config.stripeClientId}&scope=read_write`;
    // this.state.url = `https://connect.stripe.com/express/oauth/authorize?client_id=${config.stripeCustomerId}`;

    this.state.accountId = this.currentUser?.stripeAccountId;
    this.state.showWebView = !this.currentUser?.stripeAccountId;

    this.loadingHUD = new LoadingHUD();
  }

  render() {
    return (
      <View style={stylesApp.viewContainer}>
        {this.state.showWebView ?
          this.renderWebView() :
          this.renderResult()}
      </View>
    );
  }

  renderResult() {
    return (
      <View style={styles.viewContent}>
        <Image style={styles.imgStripe} source={require('../../../../assets/imgs/stripe_logo.png')} />

        {/* data */}
        <View style={styles.viewData}>
          {/* account id */}
          <View style={stylesApp.flexRowCenter}>
            <Text style={styles.txtLabel}>Account ID</Text>
            <Text style={styles.txtValue}>{this.state.accountId}</Text>
          </View>

          {/* email */}
          <View style={stylesApp.flexRowCenter}>
            <Text style={styles.txtLabel}>Email</Text>
            <Text style={styles.txtValue}>{this.state.email}</Text>
          </View>

          {/* country */}
          <View style={stylesApp.flexRowCenter}>
            <Text style={styles.txtLabel}>Country</Text>
            <Text style={styles.txtValue}>{this.state.country}</Text>
          </View>
        </View>

        {/* done */}
        <View style={[styleUtil.withShadow(), styles.viewButDone]}>
          <Button
            title="Done"
            disabled={!this.state.accountId}
            disabledStyle={[stylesApp.butPrimary, stylesApp.semiTrans]}
            buttonStyle={stylesApp.butPrimary}
            titleStyle={stylesApp.titleButPrimary}
            onPress={() => this.onButDone()}
          />
        </View>
      </View>
    );
  }

  renderWebView() {
    return (
      <WebView
        source={{uri: this.state.url}}
        onNavigationStateChange={(navState) => {
          console.log(navState.url);

          if (!navState.url.startsWith(config.stripeRedirectUrl)) {
            return;
          }

          // parse params
          this.doGetAccount(navState.url);
        }}
        onLoadStart={(syntheticEvent) => {
          this.loadingHUD.show();
        }}
        onLoadEnd={(syntheticEvent) => {
          this.loadingHUD.hideAll();
        }}
      />
    );
  }

  async onButDone() {
    // show loading
    this.loadingHUD.show();

    try {
      // update db
      await ApiService.updateUserFields({stripeAccountId: this.state.accountId});
      this.currentUser.stripeAccountId = this.state.accountId;

      UserHelper.saveUserToLocalStorage(this.currentUser, this.props);

      // go back to prev page
      this.props.navigation.pop();
    } catch (e) {
      console.log(e);

      Alert.alert('Failed to Save Account Id', e.message);
    }

    // hide loading
    this.loadingHUD.hideAll();
  }
}

const mapStateToProps = (state) => state;
const mapDispatchToProps = {
  setUserInfo,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddStripeAccount);

