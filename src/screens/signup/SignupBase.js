import React from 'react';
import DismissKeyboard from '../../components/DismissKeyboard/DismissKeyboard';
import ContentWithBackground from '../../components/ContentWithBackground/ContentWithBackground';
import {styles as stylesSignup, styles} from './styles';
import {styles as stylesLogin} from '../login/styles';
import {
  Alert,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {Button, Icon, Input} from 'react-native-elements';
import {colors as colorTheme} from '../../styles/theme.style';
import {stylesApp, styleUtil} from '../../styles/app.style';
import ImageScale from 'react-native-scalable-image';
import ImagePicker from 'react-native-image-picker';
import SignupAdvanced from './SignupAdvanced';
import {connect} from 'react-redux';
import {User} from '../../models/user.model';
import {BaseSignup} from './base-signup';
import {Utils} from '../../helpers/utils';
import {ApiService} from '../../services';

class SignupBase extends BaseSignup {
  static NAV_NAME = 'signup-base';

  state = {
    // data
    photoImg: '',
    photoFileName: '',

    firstName: '',
    lastName: '',
    email: '',
    password: '',
  };

  constructor(props) {
    super(props);

    props.navigation.setOptions({
      title: 'Registration',
    });
  }

  render() {
    return (
      <DismissKeyboard
        ref={(view) => {
          this.keyboardView = view;
        }}>
        <ContentWithBackground>
          <View style={styles.viewContainer}>
            {/* photo */}
            <TouchableWithoutFeedback onPress={() => this.onClickPhoto()}>
              <View style={styles.viewPhoto}>
                <View style={[styles.viewPhotoMain, styleUtil.withShadow()]}>
                  {this.state.photoImg ? (
                    <Image
                      style={styles.imgPhoto}
                      source={this.state.photoImg}
                    />
                  ) : (
                    <Image
                      style={styles.imgPhotoCore}
                      source={require('../../../assets/imgs/user_default.png')}
                    />
                  )}
                </View>

                {/* upload mark */}
                <View style={styles.viewPhotoUpload}>
                  <ImageScale
                    width={16}
                    source={require('../../../assets/imgs/ic_upload_white.png')}
                  />
                </View>
              </View>
            </TouchableWithoutFeedback>

            {/* form info */}
            <View style={styles.viewForm}>
              {/* first name */}
              <Input
                containerStyle={stylesLogin.ctnInput}
                returnKeyType="next"
                placeholder="First Name"
                placeholderTextColor={colorTheme.primary}
                inputStyle={stylesLogin.input}
                inputContainerStyle={stylesLogin.inputCtn}
                blurOnSubmit={false}
                value={this.state.firstName}
                onChangeText={(firstName) => {
                  this.setState({firstName});
                }}
                onSubmitEditing={() => {
                  this.inputLastName.focus();
                }}
                renderErrorMessage={false}
              />

              {/* last name */}
              <Input
                ref={(input) => {
                  this.inputLastName = input;
                }}
                containerStyle={[stylesLogin.ctnInput, stylesApp.mt4]}
                returnKeyType="next"
                placeholder="Last Name"
                placeholderTextColor={colorTheme.primary}
                inputStyle={stylesLogin.input}
                inputContainerStyle={stylesLogin.inputCtn}
                blurOnSubmit={false}
                value={this.state.lastName}
                onChangeText={(lastName) => {
                  this.setState({lastName});
                }}
                onSubmitEditing={() => {
                  this.inputEmail.focus();
                }}
                renderErrorMessage={false}
              />

              {/* email address */}
              <Input
                ref={(input) => {
                  this.inputEmail = input;
                }}
                containerStyle={[stylesLogin.ctnInput, stylesApp.mt4]}
                autoCapitalize={'none'}
                keyboardType="email-address"
                returnKeyType="next"
                placeholder="Email Address"
                placeholderTextColor={colorTheme.primary}
                inputStyle={stylesLogin.input}
                inputContainerStyle={stylesLogin.inputCtn}
                blurOnSubmit={false}
                value={this.state.email}
                onChangeText={(email) => {
                  this.setState({email});
                }}
                onSubmitEditing={() => {
                  this.inputPassword.focus();
                }}
                renderErrorMessage={false}
                rightIcon={
                  <ImageScale
                    width={14}
                    source={require('../../../assets/imgs/ic_input_email.png')}
                  />
                }
              />

              {/* password */}
              <Input
                ref={(input) => {
                  this.inputPassword = input;
                }}
                containerStyle={[stylesLogin.ctnInput, stylesApp.mt4]}
                autoCapitalize={'none'}
                secureTextEntry={true}
                returnKeyType="next"
                placeholder="Password"
                placeholderTextColor={colorTheme.primary}
                inputStyle={stylesLogin.input}
                inputContainerStyle={stylesLogin.inputCtn}
                value={this.state.password}
                onChangeText={(password) => {
                  this.setState({password});
                }}
                renderErrorMessage={false}
                onFocus={() => this.onPasswordFocus()}
                onSubmitEditing={() => {
                  this.onButNext();
                }}
              />
            </View>

            {/* next */}
            <View style={[styleUtil.withShadow(), styles.viewButNext]}>
              <Button
                title="NEXT"
                buttonStyle={stylesApp.butPrimary}
                titleStyle={stylesApp.titleButPrimary}
                onPress={() => this.onButNext()}
                disabled={
                  !(
                    this.state.firstName &&
                    this.state.lastName &&
                    this.state.email &&
                    this.state.password
                  )
                }
                disabledStyle={[stylesApp.butPrimary, stylesApp.semiTrans]}
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
        </ContentWithBackground>
      </DismissKeyboard>
    );
  }

  onPasswordFocus() {
    this.keyboardView.moveMainView(30);
  }

  async onButNext() {
    if (!this.photoFile) {
      Alert.alert('Profile Photo is Empty', 'Upload profile photo to proceed signup');
      return;
    }

    if (!(this.state.firstName && this.state.lastName && this.state.email && this.state.password)) {
      return;
    }

    // check email validity
    if (!Utils.isEmailValid(this.state.email)) {
      Alert.alert('Invalid Email', 'Please input the correct email address', [
        {
          text: 'OK',
          onPress: () => this.inputEmail.focus(),
        },
      ]);

      return;
    }

    // show loading
    this.loadingHUD.show();

    try {
      // check email existence
      const isExisting = await ApiService.checkEmailExisting(this.state.email);
      console.log(`isExisting: ${this.state.email}`);
      console.log(isExisting);

      if (isExisting) {
        Alert.alert('Signup Failed', 'This email address is already used');
      } else {
        let userNew = this.props.UserReducer.user;
        if (!userNew) {
          userNew = new User();
        }
        userNew.type = this.userType;
        userNew.email = this.state.email;
        userNew.firstName = this.state.firstName;
        userNew.lastName = this.state.lastName;
        userNew.password = this.state.password;

        // go to signup advanced page
        this.props.navigation.push(SignupAdvanced.NAV_NAME, {
          user: userNew,
          photoFile: this.photoFile,
        });
      }
    } catch (e) {
      console.log(e);

      Alert.alert('Signup Failed', e.message);
    }

    // hide loading
    this.loadingHUD.hideAll();
  }
}

const mapStateToProps = (state) => state;

export default connect(mapStateToProps, null)(SignupBase);
