import React from 'react';
import DismissKeyboard from '../../components/DismissKeyboard/DismissKeyboard';
import ContentWithBackground from '../../components/ContentWithBackground/ContentWithBackground';
import {styles as stylesSignup, styles} from './styles';
import {styles as stylesLogin} from '../login/styles';
import {Image, TouchableOpacity, TouchableWithoutFeedback, View} from 'react-native';
import {Button, Icon, Input} from 'react-native-elements';
import {colors as colorTheme} from '../../styles/theme.style';
import {stylesApp, styleUtil} from '../../styles/app.style';
import ImageScale from 'react-native-scalable-image';
import ImagePicker from "react-native-image-picker";
import SignupAdvanced from './SignupAdvanced';

export default class SignupBase extends React.Component {
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
      title: 'Registration'
    });
  }

  render() {
    return (
      <DismissKeyboard
        ref={(view) => { this.keyboardView = view; }}>
        <ContentWithBackground>
          <View style={styles.viewContainer}>
            {/* photo */}
            <TouchableWithoutFeedback
              onPress={() => this.onClickPhoto()}>
              <View style={styles.viewPhoto}>
                <View style={[styles.viewPhotoMain, styleUtil.withShadow()]}>
                  {
                    this.state.photoImg ?
                      <Image
                        style={styles.imgPhoto}
                        source={this.state.photoImg}
                      />
                      :
                      <Image
                        style={styles.imgPhotoCore}
                        source={require('../../../assets/imgs/user_default.png')}
                      />
                  }
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
                onChangeText={(firstName) => {this.setState({firstName})}}
                onSubmitEditing={() => { this.inputLastName.focus(); }}
                renderErrorMessage={false}
              />

              {/* last name */}
              <Input
                ref={(input) => { this.inputLastName = input; }}
                containerStyle={[stylesLogin.ctnInput, stylesApp.mt4]}
                returnKeyType="next"
                placeholder="Last Name"
                placeholderTextColor={colorTheme.primary}
                inputStyle={stylesLogin.input}
                inputContainerStyle={stylesLogin.inputCtn}
                blurOnSubmit={false}
                value={this.state.lastName}
                onChangeText={(lastName) => {this.setState({lastName})}}
                onSubmitEditing={() => { this.inputEmail.focus(); }}
                renderErrorMessage={false}
              />

              {/* email address */}
              <Input
                ref={(input) => { this.inputEmail = input; }}
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
                onChangeText={(email) => {this.setState({email})}}
                onSubmitEditing={() => { this.inputPassword.focus(); }}
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
                ref={(input) => { this.inputPassword = input; }}
                containerStyle={[stylesLogin.ctnInput, stylesApp.mt4]}
                autoCapitalize={'none'}
                secureTextEntry={true}
                returnKeyType="next"
                placeholder="Password"
                placeholderTextColor={colorTheme.primary}
                inputStyle={stylesLogin.input}
                inputContainerStyle={stylesLogin.inputCtn}
                value={this.state.password}
                onChangeText={(password) => {this.setState({password})}}
                renderErrorMessage={false}
                onFocus={() => this.onPasswordFocus()}
              />
            </View>

            {/* next */}
            <View style={styles.viewButNext}>
              <Button
                title="NEXT"
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
        </ContentWithBackground>
      </DismissKeyboard>
    );
  }

  onClickPhoto() {
    const options = {
      title: 'Select Image',
      mediaType: 'photo',
      noData: true,
      maxWidth: 640,
      maxHeight: 640,
      quality: 0.5,
    };

    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel){
        console.log('User cancelled image picker')
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error)
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton)
      } else {
        const source = {uri: response.uri};

        this.setState({
          photoImg: source,
          photoFileName: response.fileName
        });
      }
    });
  }

  onPasswordFocus() {
    this.keyboardView.moveMainView(30);
  }

  onButNext() {
    // go to signup advanced page
    this.props.navigation.push(SignupAdvanced.NAV_NAME);
  }
}
