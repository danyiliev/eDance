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
import Toast from 'react-native-simple-toast';

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
    businessName: '',
    businessDesc: '',
    detailsSubmitted: false,
  };

  currentUser = null;

  constructor(props) {
    super(props);

    props.navigation.setOptions({
      title: 'Stripe Account',
    });

    this.currentUser = props.UserReducer.user;

    this.state.accountId = this.currentUser?.stripeAccountId;

    this.loadingHUD = new LoadingHUD();
  }

  async componentDidMount(): void {
    this.loadingHUD.show();

    try {
      // check account Id
      if (this.state.accountId) {
        const resp = await ApiService.stripeGetAccountDetail(this.state.accountId);
        await this.setAccount(resp);
      } else {
        const resp = await ApiService.stripeCreateAccount(this.currentUser?.email);
        await this.setAccount(resp);

        await this.saveAccountId();

        await this.showCompleteForm();
      }
    } catch (e) {
      console.log(e);

      Toast.show(e.message);
    }

    this.loadingHUD.hideAll();
  }

  componentWillUnmount(): void {
    // hide loading
    this.loadingHUD.hideAll();
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

          <Text style={styles.txtTitle}>Business Profile</Text>
          {/* business name */}
          <View style={stylesApp.flexRowCenter}>
            <Text style={styles.txtLabel}>Name</Text>
            <Text style={styles.txtValue}>{this.state.businessName}</Text>
          </View>

          <View style={stylesApp.flexRowCenter}>
            <Text style={styles.txtLabel}>Description</Text>
            <Text style={styles.txtValue}>{this.state.businessDesc}</Text>
          </View>
        </View>

        <View style={styles.viewActions}>
          <Button
            title="Complete Profile"
            type="clear"
            containerStyle={[styles.ctnButAction, stylesApp.mr10]}
            buttonStyle={stylesApp.butLightOutline}
            titleStyle={stylesApp.titleButLight}
            onPress={() => this.onButComplete()}
          />
          <Button
            title="Done"
            containerStyle={[styles.ctnButAction, stylesApp.ml10]}
            buttonStyle={stylesApp.butPrimary}
            titleStyle={stylesApp.titleButPrimary}
            disabled={!this.state.accountId}
            disabledStyle={[stylesApp.butPrimary, stylesApp.semiTrans]}
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

  async saveAccountId() {
    try {
      await ApiService.updateUserFields({stripeAccountId: this.state.accountId});
      this.currentUser.stripeAccountId = this.state.accountId;

      UserHelper.saveUserToLocalStorage(this.currentUser, this.props);
    } catch (e) {
      console.log(e);
    }
  }

  async onButDone() {
    // go back to prev page
    this.props.navigation.pop();
  }

  setAccount(data) {
    return this.setState({
      accountId: data.id,
      email: data.email,
      country: data.country,
      businessName: data.business_profile?.name,
      businessDesc: data.business_profile?.product_description,
      detailsSubmitted: data.details_submitted,
    });
  }

  async showCompleteForm() {
    // check if details submitted
    if (!this.state.detailsSubmitted) {
      // get account url
      const resp = await ApiService.stripeCreateAccountLink(this.state.accountId);

      // show web page
      this.setState({
        showWebView: true,
        url: resp.url,
      });
    }
  }

  async onButComplete() {
    this.loadingHUD.show();

    try {
      await this.showCompleteForm();
    } catch (e) {
      console.log(e);

      Toast.show(e.message);
    }

    this.loadingHUD.hideAll();
  }
}

const mapStateToProps = (state) => state;
const mapDispatchToProps = {
  setUserInfo,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddStripeAccount);

