import React from 'react';
import {Alert, FlatList, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {styles} from './styles';
import {Button, Icon, Input} from 'react-native-elements';
import {colors as colorTheme} from '../../../styles/theme.style';
import {stylesApp, styleUtil} from '../../../styles/app.style';
import {styles as stylesSetting} from '../../settings/setting-profile/styles';
import Reviews from '../../reviews/Reviews';
import AddSession from '../add-session/AddSession';
import {UiHelper} from '../../../helpers/ui-helper';
import moment from 'moment';
import {Event, EventSession, Price} from '../../../models/event.model';
import {DanceHelper} from '../../../helpers/dance-helper';
import AddPrize from '../add-prize/AddPrize';
import Toast from 'react-native-simple-toast';
import {connect} from 'react-redux';
import {styles as stylesSignup} from '../../signup/styles';
import PriceWithCurrency from '../../../components/PriceWithCurrency/PriceWithCurrency';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import ScheduleSelect from '../../schedule/ScheduleSelect';
import TentativeSchedule from '../tentative-schedule/TentativeSchedule';

class AddChampionship extends React.Component {
  static NAV_NAME = 'add-championship';
  static NAV_NAME_SIGNUP = 'add-championship-signup';

  state = {
    // ui
    title: '',
    companyAddress: '',
    phone: '',
    email: '',

    prices: [],
  };

  constructor(props) {
    super(props);

    props.navigation.setOptions({
      title: 'Create New Championship',
    });

    this.state.prices.push(new Price());
  }

  render() {
    return (
      <KeyboardAwareScrollView style={stylesApp.viewContainer} bounces={false}>
        <View style={styles.viewContainer}>
          {/* title */}
          <View style={stylesSetting.viewForm}>
            <Text style={stylesSignup.txtItemTitle}>Title</Text>

            <View style={[stylesSetting.viewInput, stylesApp.mt12]}>
              <Input
                containerStyle={stylesSetting.ctnInput}
                autoCapitalize={'none'}
                returnKeyType="next"
                placeholder="Input Title"
                placeholderTextColor={colorTheme.primary}
                inputStyle={stylesSetting.input}
                inputContainerStyle={stylesApp.input}
                onChangeText={(title) => {
                  this.setState({title});
                }}
                value={this.state.title}
                renderErrorMessage={false}
                blurOnSubmit={false}
                onSubmitEditing={() => {
                  this.inputAddress.focus();
                }}
              />
            </View>
          </View>

          {/* contact info */}
          <View style={[stylesSetting.viewForm, stylesApp.mt14]}>
            <Text style={stylesSignup.txtItemTitle}>Contact Info</Text>

            {/* companyAddress */}
            <View style={[stylesSetting.viewInput, stylesApp.mt12]}>
              <Input
                ref={(input) => {
                  this.inputAddress = input;
                }}
                containerStyle={stylesSetting.ctnInput}
                autoCapitalize={'none'}
                returnKeyType="next"
                placeholder="Company Address"
                placeholderTextColor={colorTheme.primary}
                inputStyle={stylesSetting.input}
                inputContainerStyle={stylesApp.input}
                onChangeText={(companyAddress) => {
                  this.setState({companyAddress});
                }}
                value={this.state.companyAddress}
                renderErrorMessage={false}
                blurOnSubmit={false}
                onSubmitEditing={() => {
                  this.inputPhone.focus();
                }}
              />
            </View>

            {/* phone */}
            <View style={[stylesSetting.viewInput, stylesApp.mt8]}>
              <Input
                ref={(input) => {
                  this.inputPhone = input;
                }}
                containerStyle={stylesSetting.ctnInput}
                autoCapitalize={'none'}
                keyboardType="phone-pad"
                returnKeyType="next"
                placeholder="Phone Number"
                placeholderTextColor={colorTheme.primary}
                inputStyle={stylesSetting.input}
                inputContainerStyle={stylesApp.input}
                onChangeText={(phone) => {
                  this.setState({phone});
                }}
                value={this.state.phone}
                renderErrorMessage={false}
              />
            </View>

            {/* email */}
            <View style={[stylesSetting.viewInput, stylesApp.mt8]}>
              <Input
                containerStyle={stylesSetting.ctnInput}
                autoCapitalize={'none'}
                keyboardType="email-address"
                returnKeyType="done"
                placeholder="Email"
                placeholderTextColor={colorTheme.primary}
                inputStyle={stylesSetting.input}
                inputContainerStyle={stylesApp.input}
                onChangeText={(email) => {
                  this.setState({email});
                }}
                value={this.state.email}
                renderErrorMessage={false}
              />
            </View>
          </View>

          {/* contact info */}
          <View style={[stylesSetting.viewForm, stylesApp.mt14]}>
            <Text style={stylesSignup.txtItemTitle}>Price</Text>

            <View style={stylesApp.mt6}>
              {this.state.prices.map((price, i) => {
                return (
                  <View style={styles.viewPriceItem} key={i.toString()}>
                    <View style={[stylesSetting.viewInput, stylesApp.flex1]}>
                      <PriceWithCurrency
                        inputStyle={stylesSetting.input}
                        placeholder="Input Price"
                        onChangeText={(value) => this.onChangePrice(value, i)}
                        onChangeCurrency={(value) => this.onChangeCurrency(value, i)}
                      />
                    </View>

                    {i === 0 ? (
                      <Button
                        type="clear"
                        icon={<Icon type="ionicon" name="md-add-circle" size={24} />}
                        onPress={() => this.onAddPrice()}
                      />
                    ) : (
                      <Button
                        type="clear"
                        icon={<Icon type="ionicon" name="md-remove-circle" size={24} />}
                        onPress={() => this.onRemovePrice(i)}
                      />
                    )}
                  </View>
                );
              })}
            </View>
          </View>

          {/* next */}
          <View style={[styleUtil.withShadow(), stylesSetting.viewButSave]}>
            <Button
              title="Next"
              buttonStyle={stylesApp.butPrimary}
              titleStyle={stylesApp.titleButPrimary}
              onPress={() => this.onButNext()}
            />
          </View>
        </View>
      </KeyboardAwareScrollView>
    );
  }

  onChangePrice(value, i) {
    this.state.prices[i].price = value;
  }

  onChangeCurrency(value, i) {
    this.state.prices[i].currency = value;
  }

  onAddPrice() {
    const {prices} = this.state;
    prices.push(new Price());

    this.setState({prices});
  }

  onRemovePrice(index) {
    const {prices} = this.state;
    prices.splice(index, 1);

    this.setState({prices});
  }

  onButNext() {
    // go to tentative schedule page
    this.props.navigation.push(TentativeSchedule.NAV_NAME);
  }
}

const mapStateToProps = (state) => state;

export default connect(mapStateToProps, null)(AddChampionship);
