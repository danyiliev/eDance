import React from 'react';
import {stylesApp} from '../../../styles/app.style';
import {NativeModules, Text, TouchableOpacity, View, NativeEventEmitter} from 'react-native';
import {styles as stylesSetting} from '../setting-profile/styles';
import {styles} from './styles';
import {Icon} from 'react-native-elements';
import {colors as colorTheme} from '../../../styles/theme.style';
import {connect} from 'react-redux';
import {User} from '../../../models/user.model';
import SettingProfile from '../setting-profile/SettingProfile';
import AddStripeAccount from '../add-stripe-account/AddStripeAccount';
import {ApiService} from '../../../services';
import {UserHelper} from '../../../helpers/user-helper';

const StripeManager = NativeModules.StripeManager;
const StripeEventHandler = new NativeEventEmitter(NativeModules.StripeEventHandler);

class SettingMain extends React.Component {
  static NAV_NAME = 'setting-main';

  currentUser = null;

  state = {
    paymentMethod: '',
  };

  constructor(props) {
    super(props);

    props.navigation.setOptions({
      title: 'Settings',
    });

    this.currentUser = props.UserReducer.user;

    // init
    this.state.paymentMethod = this.currentUser?.stripePaymentMethodLabel;
  }

  componentDidMount(): void {
    //
    // listen for stripe events
    //
    this.didChangePaymentMethod = StripeEventHandler.addListener('didChangePaymentMethod', (res) => {
      console.log('didChangePaymentMethod', res);

      this.onUpdatePaymentMethod(res);
    });
  }

  componentWillUnmount(): void {
    this.didChangePaymentMethod.remove();
  }

  render() {
    return (
      <View style={styles.viewContainer}>
        {/* lesson options */}
        {this.currentUser?.type === User.TYPE_TEACHER ? (
          <TouchableOpacity style={stylesApp.mb12} onPress={() => this.onLessonOption()}>
            <View style={stylesSetting.viewListItem}>
              <Text style={stylesSetting.txtItem}>Lesson Options</Text>

              {/* chevron */}
              <Icon type="ionicon" name="ios-arrow-forward" size={18} color={colorTheme.primary} />
            </View>
          </TouchableOpacity>
        ) : null}

        {/* payment setting */}
        <Text style={stylesSetting.txtLabel}>Payment Settings</Text>
        <TouchableOpacity onPress={() => this.onStripeAccount()}>
          <View style={stylesSetting.viewListItem}>
            <View style={styles.viewListItemContent}>
              <Text style={stylesSetting.txtItem}>Stripe Account</Text>
              <Text style={styles.txtItemDesc}>
                {this.currentUser?.stripeAccountId ? this.currentUser?.stripeAccountId : 'Uninitialized'}
              </Text>
            </View>

            {/* chevron */}
            <Icon type="ionicon" name="ios-arrow-forward" size={18} color={colorTheme.primary} />
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={stylesApp.mb12} onPress={() => this.onPaymentMethod()}>
          <View style={stylesSetting.viewListItem}>
            <View style={styles.viewListItemContent}>
              <Text style={stylesSetting.txtItem}>Payment Methods</Text>
              <Text style={styles.txtItemDesc}>
                {this.currentUser?.paymentMethod
                  ? `${this.currentUser?.paymentMethod.brand} **** ${this.currentUser?.paymentMethod.last4}`
                  : 'Uninitialized'}
              </Text>
            </View>

            {/* chevron */}
            <Icon type="ionicon" name="ios-arrow-forward" size={18} color={colorTheme.primary} />
          </View>
        </TouchableOpacity>
      </View>
    );
  }

  onStripeAccount() {
    // go to stripe account page
    this.props.navigation.push(AddStripeAccount.NAV_NAME);
  }

  onLessonOption() {
    // go to lesson options page
    this.props.navigation.push(SettingProfile.NAV_NAME);
  }

  async onPaymentMethod() {
    try {
      await StripeManager.presentPaymentMethod();
    } catch (e) {
      console.log(e);
    }
  }

  onUpdatePaymentMethod(data) {
    ApiService.updateUserFields({paymentMethod: data});
    this.currentUser.paymentMethod = data;

    UserHelper.saveUserToLocalStorage(this.currentUser);

    this.setState({
      paymentMethod: data,
    });
  }
}

const mapStateToProps = (state) => state;

export default connect(mapStateToProps, null)(SettingMain);
