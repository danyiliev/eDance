import React from 'react';
import {setUserInfo} from '../../../actions/user';
import {connect} from 'react-redux';
import {
  Image,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  Alert,
  Platform,
} from 'react-native';
import {stylesApp, styleUtil} from '../../../styles/app.style';
import {Button, ButtonGroup, Icon, Input} from 'react-native-elements';
import DismissKeyboard from '../../../components/DismissKeyboard/DismissKeyboard';
import ContentWithBackground from '../../../components/ContentWithBackground/ContentWithBackground';
import {styles} from './styles';
import {styles as stylesSignup} from '../../signup/styles';
import ImageScale from 'react-native-scalable-image';
import {styles as stylesLogin} from '../../login/styles';
import {colors as colorTheme} from '../../../styles/theme.style';
import {User} from '../../../models/user.model';
import {BaseSignup} from '../../signup/base-signup';
import {UserHelper} from '../../../helpers/user-helper';
import {ApiService} from '../../../services';

class EditProfile extends BaseSignup {
  static NAV_NAME = 'edit-profile';

  state = {
    // ui
    showStatePicker: false,
    stateSelected: '', // for iOS only

    // data
    photoImg: '',
    photoFileName: '',

    firstName: '',
    lastName: '',
    email: '',

    genderIndex: 0,

    state: '',
    city: '',
    zipCode: '',
  };

  currentUser = null;

  constructor(props) {
    super(props);

    props.navigation.setOptions({
      title: 'Edit Profile',
    });

    this.currentUser = props.UserReducer.user;

    this.state.firstName = this.currentUser.firstName;
    this.state.lastName = this.currentUser.lastName;
    this.state.email = this.currentUser.email;
    this.state.genderIndex = this.currentUser.gender;

    this.state.state = this.currentUser.state;
    this.state.stateSelected = this.currentUser.state;
    this.state.city = this.currentUser.city;
    this.state.zipCode = this.currentUser.zipCode;
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
                  <Image
                    style={stylesSignup.imgPhoto}
                    source={
                      this.state.photoImg
                        ? this.state.photoImg
                        : UserHelper.getUserImage(this.currentUser)
                    }
                  />
                </View>
              </View>
            </TouchableWithoutFeedback>

            {/* form info */}
            <View style={{...styles.viewForm, marginTop: 18}}>
              {/* first name */}
              <Input
                containerStyle={stylesLogin.ctnInput}
                returnKeyType="next"
                placeholder="First Name"
                placeholderTextColor={colorTheme.primary}
                inputStyle={styles.input}
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
                inputStyle={styles.input}
                inputContainerStyle={stylesLogin.inputCtn}
                value={this.state.lastName}
                onChangeText={(lastName) => {
                  this.setState({lastName});
                }}
                renderErrorMessage={false}
              />

              {/* email address */}
              <Input
                containerStyle={[stylesLogin.ctnInput, stylesApp.mt4]}
                autoCapitalize={'none'}
                keyboardType="email-address"
                returnKeyType="next"
                placeholder="Email Address"
                placeholderTextColor={colorTheme.primary}
                inputStyle={styles.input}
                inputContainerStyle={stylesLogin.inputCtn}
                blurOnSubmit={false}
                value={this.state.email}
                disabled={true}
                renderErrorMessage={false}
                rightIconContainerStyle={styles.ctnInputIcon}
                rightIcon={
                  <ImageScale
                    width={14}
                    source={require('../../../../assets/imgs/ic_input_email.png')}
                  />
                }
              />

              {/* gender */}
              <ButtonGroup
                containerStyle={styles.ctnSegmentGender}
                buttons={User.GENDERS}
                textStyle={stylesSignup.txtSegment}
                innerBorderStyle={stylesSignup.borderSegment}
                selectedButtonStyle={stylesSignup.butSegmentSelected}
                selectedTextStyle={stylesSignup.SegmentSelected}
                selectedIndex={this.state.genderIndex}
                onPress={(index) => this.setState({genderIndex: index})}
              />

              {/* state select */}
              <View style={[stylesSignup.viewInputSelect, stylesLogin.inputCtn]}>
                <TouchableOpacity
                  onPress={() => this.setState({showStatePicker: true})}>
                  <View style={stylesSignup.viewInputSelectContainer}>
                    {/* text */}
                    <Text style={stylesLogin.input}>
                      {this.state.state ? this.state.state : 'State'}
                    </Text>

                    {/* icon */}
                    <ImageScale
                      width={14}
                      source={require('../../../../assets/imgs/ic_input_state.png')}
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
                inputStyle={styles.input}
                inputContainerStyle={stylesLogin.inputCtn}
                blurOnSubmit={false}
                value={this.state.city}
                onChangeText={(city) => {
                  this.setState({city});
                }}
                onSubmitEditing={() => {
                  this.inputZipCode.focus();
                }}
                renderErrorMessage={false}
                rightIconContainerStyle={styles.ctnInputIcon}
                rightIcon={
                  <ImageScale
                    width={14}
                    source={require('../../../../assets/imgs/ic_input_city.png')}
                  />
                }
                onFocus={() => this.onFocusCity()}
              />

              {/* zip code */}
              <Input
                ref={(input) => {
                  this.inputZipCode = input;
                }}
                containerStyle={[stylesLogin.ctnInput, stylesApp.mt4]}
                keyboardType={'number-pad'}
                returnKeyType="go"
                placeholder="ZIP Code"
                placeholderTextColor={colorTheme.primary}
                inputStyle={styles.input}
                inputContainerStyle={stylesLogin.inputCtn}
                blurOnSubmit={false}
                value={this.state.zipCode}
                onChangeText={(zipCode) => {
                  this.setState({zipCode});
                }}
                onFocus={() => this.onFocusZip()}
                renderErrorMessage={false}
                rightIconContainerStyle={styles.ctnInputIcon}
                rightIcon={
                  <ImageScale
                    width={14}
                    source={require('../../../../assets/imgs/ic_input_zipcode.png')}
                  />
                }
              />
            </View>

            {/* save */}
            <View style={[styleUtil.withShadow(), styles.viewButSave]}>
              <Button
                title="SAVE"
                buttonStyle={stylesApp.butPrimary}
                titleStyle={stylesApp.titleButPrimary}
                onPress={() => this.onButSave()}
              />
            </View>

            {UserHelper.getInstance().renderSelectStatePicker(this)}
          </View>
        </ContentWithBackground>
      </DismissKeyboard>
    );
  }

  onFocusZip() {
    this.keyboardView.moveMainView(90);
  }
  onFocusCity() {
    this.keyboardView.moveMainView(80);
  }

  async onButSave() {
    // show loading
    this.loadingHUD.show('Updating user profile ...');

    try {
      const user = await ApiService.updateUser(
        this.state.firstName,
        this.state.lastName,
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

      // save user to local storage
      this.currentUser.firstName = this.state.firstName;
      this.currentUser.lastName = this.state.lastName;
      this.currentUser.genderIndex = this.state.genderIndex;
      this.currentUser.state = this.state.state;
      this.currentUser.city = this.state.city;
      this.currentUser.zipCode = this.state.zipCode;
      this.currentUser.photo = user.photo;

      UserHelper.saveUserToLocalStorage(this.currentUser, this.props);

      // go back to prev page
      this.props.navigation.pop();
    } catch (e) {
      console.log(e);

      Alert.alert('Failed to save user profile', e.message);
    }

    this.loadingHUD.hideAll();
  }
}

const mapStateToProps = (state) => state;

const mapDispatchToProps = {
  setUserInfo,
};

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);
