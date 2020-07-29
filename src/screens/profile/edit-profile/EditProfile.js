import React from 'react';
import {setUserInfo} from '../../../actions/user';
import {connect} from 'react-redux';
import {
  Image, Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
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

class EditProfile extends BaseSignup {
  static NAV_NAME = 'edit-profile';

  state = {
    // data
    photoImg: '',
    photoFileName: '',

    firstName: '',
    lastName: '',
    email: '',

    // data
    genderIndex: 0,

    state: '',
    city: '',
    zipCode: '',
  };

  constructor(props) {
    super(props);

    props.navigation.setOptions({
      title: 'Edit Profile',
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
                      style={stylesSignup.imgPhoto}
                      source={this.state.photoImg}
                    />
                  ) : (
                    <Image
                      style={styles.imgPhotoCore}
                      source={require('../../../../assets/imgs/user_default.png')}
                    />
                  )}
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
                value={this.state.email}
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
                value={this.state.firstName}
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

            {/* next */}
            <View style={[styleUtil.withShadow(), styles.viewButSave]}>
              <Button
                title="SAVE"
                buttonStyle={stylesApp.butPrimary}
                titleStyle={stylesApp.titleButPrimary}
                onPress={() => this.onButSave()}
              />
            </View>

            {this.renderSelectStatePicker()}
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

  onButSave() {
  }
}

const mapStateToProps = (state) => state;

const mapDispatchToProps = {
  setUserInfo,
};

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);
