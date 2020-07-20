import React from 'react';
import DismissKeyboard from '../../../components/DismissKeyboard/DismissKeyboard';
import {styles} from './styles';
import {styles as stylesSignup} from '../../signup/styles';
import {
  Dimensions,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Platform,
} from 'react-native';
import {stylesApp, styleUtil} from '../../../styles/app.style';
import {Button, ButtonGroup, Icon, Input} from 'react-native-elements';
import {styles as stylesLogin} from '../../login/styles';
import {colors as colorTheme} from '../../../styles/theme.style';
import ImageScale from 'react-native-scalable-image';
import CheckboxRound from '../../../components/CheckboxRound/CheckboxRound';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import SelectPicker from '../../../components/SelectPicker/SelectPicker';
import {Picker} from '@react-native-community/picker';
import {STATES} from '../../../constants/constant-data';

const {width: SCREEN_WDITH} = Dimensions.get('window');

export default class SettingProfile extends React.Component {
  static NAV_NAME = 'setting-profile';

  state = {
    // ui
    showStatePicker: false,
    stateSelected: '', // for iOS only

    // data
    genderIndex: 0,
    firstName: '',
    lastName: '',
    typeIndex: 0,
    singleIndex: 0,
    levelIndex: 0,

    email: '',
    phone: '',
    state: '',
    address: '',
  };

  genders = ['Male', 'Female'];
  types = ['Student', 'Professional', 'Cyber Championship Aujudicator'];
  singles = ['Single', 'Couple'];
  levels = [
    'Beginner',
    'Silver',
    'Gold',
    'Bronze',
    'Silver 1',
    'Gold 1',
    'Bronze 1',
    'Silver 2',
    'Gold 2',
    'Bronze 2',
    'Silver 3',
    'Gold 3',
  ];

  constructor(props) {
    super(props);

    props.navigation.setOptions({
      title: 'Settings',
    });
  }

  render() {
    return (
      <KeyboardAwareScrollView style={stylesApp.viewContainer}>
        <View style={styles.viewContent}>
          {/* profile */}
          <View style={stylesSignup.viewForm}>
            {/* title */}
            <Text style={[stylesSignup.txtItemTitle, stylesApp.mt6]}>
              Profile Name
            </Text>

            <ButtonGroup
              containerStyle={stylesSignup.ctnSegmentGender}
              buttons={this.genders}
              textStyle={stylesSignup.txtSegment}
              innerBorderStyle={stylesSignup.borderSegment}
              selectedButtonStyle={stylesSignup.butSegmentSelected}
              selectedTextStyle={stylesSignup.SegmentSelected}
              selectedIndex={this.state.genderIndex}
              onPress={(index) => this.setState({genderIndex: index})}
            />

            {/* first name */}
            <Input
              containerStyle={[stylesLogin.ctnInput, stylesApp.mt24]}
              returnKeyType="next"
              placeholder="First Name"
              placeholderTextColor={colorTheme.primary}
              inputStyle={styles.input}
              inputContainerStyle={stylesLogin.inputCtn}
              value={this.state.firstName}
              onChangeText={(firstName) => {
                this.setState({firstName});
              }}
              onSubmitEditing={() => {
                this.inputLastName.focus();
              }}
              blurOnSubmit={false}
              renderErrorMessage={false}
            />

            {/* last name */}
            <Input
              ref={(input) => {
                this.inputLastName = input;
              }}
              containerStyle={[stylesLogin.ctnInput, stylesApp.mt12]}
              returnKeyType="done"
              placeholder="Last Name"
              placeholderTextColor={colorTheme.primary}
              inputStyle={styles.input}
              inputContainerStyle={stylesLogin.inputCtn}
              value={this.state.lastName}
              onChangeText={(lastName) => {
                this.setState({lastName});
              }}
              renderErrorMessage={false}
            />

            {this.renderTypes()}

            <ButtonGroup
              containerStyle={[
                stylesSignup.ctnSegmentGender,
                styles.segmentSingle,
              ]}
              buttons={this.singles}
              textStyle={stylesSignup.txtSegment}
              innerBorderStyle={stylesSignup.borderSegment}
              selectedButtonStyle={stylesSignup.butSegmentSelected}
              selectedTextStyle={stylesSignup.SegmentSelected}
              selectedIndex={this.state.singleIndex}
              onPress={(index) => this.setState({singleIndex: index})}
            />
          </View>

          {/* contact */}
          <View style={[stylesSignup.viewForm, stylesApp.mt14]}>
            {/* title */}
            <Text style={[stylesSignup.txtItemTitle, stylesApp.mt6]}>
              Contacts
            </Text>

            {/* email address */}
            <View style={[styles.viewInput, stylesApp.mt20]}>
              <Input
                containerStyle={styles.ctnInput}
                autoCapitalize={'none'}
                keyboardType="email-address"
                returnKeyType="done"
                placeholder="Email Address"
                placeholderTextColor={colorTheme.primary}
                inputStyle={styles.input}
                inputContainerStyle={stylesApp.input}
                onChangeText={(email) => {
                  this.setState({email});
                }}
                value={this.state.email}
                renderErrorMessage={false}
              />
              {/* right icon */}
              <ImageScale
                width={14}
                source={require('../../../../assets/imgs/ic_input_email.png')}
              />
            </View>

            {/* phone */}
            <View style={[styles.viewInput, stylesApp.mt12]}>
              <Input
                containerStyle={styles.ctnInput}
                autoCapitalize={'none'}
                keyboardType="number-pad"
                returnKeyType="done"
                placeholder="Phone Number"
                placeholderTextColor={colorTheme.primary}
                inputStyle={styles.input}
                inputContainerStyle={stylesApp.input}
                onChangeText={(phone) => {
                  this.setState({phone});
                }}
                value={this.state.phone}
                renderErrorMessage={false}
              />
              {/* right icon */}
              <ImageScale
                width={14}
                source={require('../../../../assets/imgs/ic_input_phone.png')}
              />
            </View>

            {/* state select */}
            <View style={[styles.viewInput, stylesApp.mt12]}>
              <TouchableOpacity
                style={stylesApp.flex1}
                onPress={() => this.setState({showStatePicker: true})}>
                {/* text */}
                <Text style={styles.input}>
                  {this.state.state ? this.state.state : 'State'}
                </Text>
              </TouchableOpacity>

              {/* icon */}
              <ImageScale
                width={14}
                source={require('../../../../assets/imgs/ic_input_state.png')}
              />
            </View>

            {/* phone */}
            <View style={[styles.viewInput, stylesApp.mt12]}>
              <Input
                containerStyle={styles.ctnInput}
                placeholder="Address"
                multiline
                placeholderTextColor={colorTheme.primary}
                inputStyle={styles.input}
                inputContainerStyle={stylesApp.input}
                onChangeText={(address) => {
                  this.setState({address});
                }}
                value={this.state.address}
                renderErrorMessage={false}
              />
              {/* right icon */}
              <ImageScale
                width={9}
                source={require('../../../../assets/imgs/ic_input_address.png')}
              />
            </View>
          </View>

          {/* contact */}
          <View style={[stylesSignup.viewForm, stylesApp.mt14]}>
            {/* title */}
            <Text style={[stylesSignup.txtItemTitle, stylesApp.mt6]}>
              Dance Level Program
            </Text>

            {this.renderLevels()}
          </View>

          {/* next */}
          <View style={styles.viewButNext}>
            <Button
              title="CONTINUE"
              buttonStyle={stylesApp.butPrimary}
              titleStyle={stylesApp.titleButPrimary}
              onPress={() => this.onButNext()}
              icon={
                <Icon
                  type="ionicon"
                  name="md-arrow-forward"
                  containerStyle={stylesSignup.ctnButIcon}
                  size={22}
                  color={colorTheme.light}
                />
              }
              iconRight={true}
            />
          </View>
        </View>

        {this.renderSelectStatePicker()}
      </KeyboardAwareScrollView>
    );
  }

  renderTypes() {
    return (
      <View style={stylesApp.mt24}>
        {this.types.map((s, i) => {
          return (
            <View key={i.toString()}>
              <CheckboxRound
                label={s}
                checked={this.state.typeIndex === i}
                onPress={() => this.onSelectType(i)}
              />
              {/* divider */}
              {i < this.types.length ? (
                <View style={styles.viewDivider} />
              ) : null}
            </View>
          );
        })}
      </View>
    );
  }

  renderSelectStatePicker() {
    return (
      <SelectPicker
        isVisible={this.state.showStatePicker}
        contentStyle={stylesSignup.picker}
        onDismiss={(done) => this.dismissState(done)}>
        <Picker
          selectedValue={
            Platform.OS === 'ios' ? this.state.stateSelected : this.state.state
          }
          onValueChange={(itemValue, itemIndex) => {
            if (Platform.OS === 'ios') {
              this.setState({
                stateSelected: itemValue,
              });
            } else {
              this.setState({
                state: itemValue,
              });
            }
          }}>
          {STATES.map((s, i) => {
            return (
              <Picker.Item key={i.toString()} label={s.Name} value={s.value} />
            );
          })}
        </Picker>
      </SelectPicker>
    );
  }

  /**
   * state select picker
   */
  dismissState(done) {
    this.setState({
      showStatePicker: false,
    });

    let {stateSelected} = this.state;
    if (!stateSelected) {
      // default is the first one
      stateSelected = STATES[0].value;
    }

    // update date value based on done/canceled
    if (done) {
      this.setState({
        state: stateSelected,
      });
    } else {
      this.setState({
        stateSelected: this.state.state,
      });
    }
  }

  renderLevels() {
    const itemWidth = (SCREEN_WDITH - 14 * 4) / 3;

    return (
      <View style={styles.viewLevels}>
        {this.levels.map((s, i) => {
          return (
            <CheckboxRound
              containerStyle={{
                width: itemWidth,
                paddingLeft: i % 3 !== 0 ? 14 : 0,
                paddingRight: i % 3 !== 2 ? 14 : 0,
              }}
              label={s}
              checked={this.state.levelIndex === i}
              onPress={() => this.onSelectLevel(i)}
            />
          );
        })}
      </View>
    );
  }

  onSelectType(index) {
    this.setState({
      typeIndex: index,
    });
  }
  onSelectLevel(index) {
    this.setState({
      levelIndex: index,
    });
  }

  onButNext() {}
}
