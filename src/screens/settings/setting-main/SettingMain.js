import React from 'react';
import {stylesApp} from '../../../styles/app.style';
import {Text, TouchableOpacity, View} from 'react-native';
import {styles as stylesSetting} from '../setting-profile/styles';
import {styles} from './styles';
import {Icon} from 'react-native-elements';
import {colors as colorTheme} from '../../../styles/theme.style';
import {connect} from 'react-redux';
import {User} from '../../../models/user.model';
import SettingProfile from '../setting-profile/SettingProfile';
import AddStripeAccount from '../add-stripe-account/AddStripeAccount';
import stripe from 'tipsi-stripe';

class SettingMain extends React.Component {
  static NAV_NAME = 'setting-main';

  currentUser = null;

  constructor(props) {
    super(props);

    props.navigation.setOptions({
      title: 'Settings',
    });

    this.currentUser = props.UserReducer.user;
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

        {false ?? (
          <TouchableOpacity style={stylesApp.mb12} onPress={() => this.onPaymentMethod()}>
            <View style={stylesSetting.viewListItem}>
              <Text style={stylesSetting.txtItem}>Payment Methods</Text>

              {/* chevron */}
              <Icon type="ionicon" name="ios-arrow-forward" size={18} color={colorTheme.primary} />
            </View>
          </TouchableOpacity>
        )}
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
  }
}

const mapStateToProps = (state) => state;

export default connect(mapStateToProps, null)(SettingMain);
