import React from 'react';
import DismissKeyboard from '../../components/DismissKeyboard/DismissKeyboard';
import ContentWithBackground from '../../components/ContentWithBackground/ContentWithBackground';
import {View, TouchableOpacity, Text, Platform, Alert} from 'react-native';
import {styles} from './styles';
import {Button, ButtonGroup, Input} from 'react-native-elements';
import {styles as stylesLogin} from '../login/styles';
import {colors as colorTheme} from '../../styles/theme.style';
import {stylesApp, styleUtil} from '../../styles/app.style';
import ImageScale from 'react-native-scalable-image';
import SelectPicker from '../../components/SelectPicker/SelectPicker';
import {Picker} from '@react-native-community/picker';
import {STATES} from '../../constants/constant-data';
import {setUserInfo} from '../../actions/user';
import {connect} from 'react-redux';
import {User} from '../../models/user.model';
import {BaseAuth} from '../base-auth';
import {BaseSignup} from './base-signup';
import {AuthService} from '../../services';
import {UserHelper} from '../../helpers/user-helper';

class SignupAdvanced extends BaseSignup {
  static NAV_NAME = 'signup-advanced';

  state = {
    // ui
    showStatePicker: false,
    stateSelected: '', // for iOS only

    // data
    genderIndex: 0,

    state: '',
    city: '',
    zipCode: '',
  };

  userNew: User = null;

  constructor(props) {
    super(props);

    props.navigation.setOptions({
      title: 'Registration',
    });

    // get parameter
    if (props.route.params) {
      this.userNew = props.route.params.user;
      this.photoFile = props.route.params.photoFile;
    }
  }

  render() {
    return (
      <DismissKeyboard
        ref={(view) => {
          this.keyboardView = view;
        }}>
        <ContentWithBackground>
          <View style={styles.viewContainer}>
            <View style={styles.viewTop}>
              {/* gender */}
              <View style={styles.viewForm}>
                <Text style={styles.txtItemTitle}>Gender</Text>

                <ButtonGroup
                  containerStyle={styles.ctnSegmentGender}
                  buttons={User.GENDERS}
                  textStyle={styles.txtSegment}
                  innerBorderStyle={styles.borderSegment}
                  selectedButtonStyle={styles.butSegmentSelected}
                  selectedTextStyle={styles.SegmentSelected}
                  selectedIndex={this.state.genderIndex}
                  onPress={(index) => this.setState({genderIndex: index})}
                />
              </View>
            </View>

            {/* form info */}
            <View style={styles.viewForm}>
              {/* state select */}
              <View style={[styles.viewInputSelect, stylesLogin.inputCtn]}>
                <TouchableOpacity
                  onPress={() => this.setState({showStatePicker: true})}>
                  <View style={styles.viewInputSelectContainer}>
                    {/* text */}
                    <Text style={stylesLogin.input}>
                      {this.state.state ? this.state.state : 'State'}
                    </Text>

                    {/* icon */}
                    <ImageScale
                      width={14}
                      source={require('../../../assets/imgs/ic_input_state.png')}
                    />
                  </View>
                </TouchableOpacity>
              </View>

              {/* city */}
              <Input
                containerStyle={[stylesLogin.ctnInput, stylesApp.mt4]}
                returnKeyType="next"
                placeholder="City"
                placeholderTextColor={colorTheme.primary}
                inputStyle={stylesLogin.input}
                inputContainerStyle={stylesLogin.inputCtn}
                blurOnSubmit={false}
                value={this.state.email}
                onChangeText={(city) => {
                  this.setState({city});
                }}
                onSubmitEditing={() => {
                  this.inputZipCode.focus();
                }}
                renderErrorMessage={false}
                rightIcon={
                  <ImageScale
                    width={14}
                    source={require('../../../assets/imgs/ic_input_city.png')}
                  />
                }
              />

              {/* zip code */}
              <Input
                ref={(input) => {
                  this.inputZipCode = input;
                }}
                containerStyle={stylesLogin.ctnInput}
                keyboardType={'number-pad'}
                returnKeyType="go"
                placeholder="ZIP Code"
                placeholderTextColor={colorTheme.primary}
                inputStyle={stylesLogin.input}
                inputContainerStyle={stylesLogin.inputCtn}
                blurOnSubmit={false}
                value={this.state.firstName}
                onChangeText={(zipCode) => {
                  this.setState({zipCode});
                }}
                renderErrorMessage={false}
                rightIcon={
                  <ImageScale
                    width={14}
                    source={require('../../../assets/imgs/ic_input_zipcode.png')}
                  />
                }
              />
            </View>

            {/* next */}
            <View style={[styleUtil.withShadow(), styles.viewButNext]}>
              <Button
                title="REGISTER"
                buttonStyle={stylesApp.butPrimary}
                titleStyle={stylesApp.titleButPrimary}
                onPress={() => this.onButSignup()}
              />
            </View>

            {UserHelper.getInstance().renderSelectStatePicker(this)}
          </View>
        </ContentWithBackground>
      </DismissKeyboard>
    );
  }

  async onButSignup() {
    // show loading
    this.loadingHUD.show('Signing up ...');

    try {
      const user = await AuthService.signUp(
        this.userNew.firstName,
        this.userNew.lastName,
        this.userNew.email,
        this.userNew.password,
        this.userNew.type,
        this.state.genderIndex,
        this.state.state,
        this.state.city,
        this.state.zipCode,
        this.photoFile
          ? {
              name: 'photo.jpg',
              type: this.photoFile.type,
              uri:
                Platform.OS === 'android'
                  ? this.photoFile.uri
                  : this.photoFile.uri.replace('file://', ''),
            }
          : null,
      );

      await this.setUser(user);
    } catch (e) {
      Alert.alert('Login Failed', e.message);
    }

    // hide loading
    this.loadingHUD.hideAll();
  }
}

const mapStateToProps = (state) => state;

const mapDispatchToProps = {
  setUserInfo,
};

export default connect(mapStateToProps, mapDispatchToProps)(SignupAdvanced);
