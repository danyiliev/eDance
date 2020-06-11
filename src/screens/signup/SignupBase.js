import React from 'react';
import DismissKeyboard from '../../components/DismissKeyboard/DismissKeyboard';
import ContentWithBackground from '../../components/ContentWithBackground/ContentWithBackground';
import {styles} from './styles';
import {styles as stylesLogin} from '../login/styles';
import {Image, TouchableOpacity, TouchableWithoutFeedback, View} from 'react-native';
import {Button, Input} from 'react-native-elements';
import {colors as colorTheme} from '../../styles/theme.style';
import {stylesApp} from '../../styles/app.styles';
import ImageScale from 'react-native-scalable-image';

export default class SignupBase extends React.Component {
  static NAV_NAME = 'signup-base';

  state = {
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
                <View style={[styles.viewPhotoMain, stylesApp.withShadow]}>
                  <Image
                    style={styles.imgPhotoCore}
                    source={require('../../../assets/imgs/user_default.png')}
                  />
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
            <View style={[stylesApp.withShadow, styles.viewButNext]}>
              <Button
                title="NEXT"
                buttonStyle={stylesApp.butPrimary}
                titleStyle={stylesApp.titleButPrimary}
                onPress={() => this.onButSignin()}
              />
            </View>
          </View>
        </ContentWithBackground>
      </DismissKeyboard>
    );
  }

  onClickPhoto() {
  }

  onPasswordFocus() {
    this.keyboardView.moveMainView(30);
  }
}
