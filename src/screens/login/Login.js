import React from 'react';
import ContentWithBackground from '../../components/ContentWithBackground/ContentWithBackground';
import ImageScale from 'react-native-scalable-image';
import {styles as stylesLanding} from '../landing/styles';
import {styles} from './styles';
import {Text, View, Alert} from 'react-native';
import {Button, Input} from 'react-native-elements';
import {colors as colorTheme} from '../../styles/theme.style';
import DismissKeyboard from '../../components/DismissKeyboard/DismissKeyboard';
import {stylesApp, styleUtil} from '../../styles/app.style';
import SignupBase from '../signup/SignupBase';
import ForgetEmail from '../forget/ForgetEmail';
import {setUserInfo} from '../../actions/user';
import {connect} from 'react-redux';
import {User} from '../../models/user.model';
import {LoadingHUD} from 'react-native-hud-hybrid';
import {AuthService} from '../../services';
import {BaseAuth} from '../base-auth';

class Login extends BaseAuth {
  static NAV_NAME = 'login';

  state = {
    username: '',
    password: '',
  };

  constructor(props) {
    super(props);

    this.loadingHUD = new LoadingHUD();
  }

  render() {
    return (
      <DismissKeyboard>
        <ContentWithBackground>
          {/* logo */}
          <ImageScale
            width={237}
            style={styles.imgLogo}
            source={require('../../../assets/imgs/logo.png')}
          />

          <View style={styles.viewContent}>
            {/* username */}
            <Input
              containerStyle={styles.ctnInput}
              autoCapitalize={'none'}
              keyboardType="email-address"
              returnKeyType="next"
              placeholder="Username"
              placeholderTextColor={colorTheme.primary}
              inputStyle={styles.input}
              inputContainerStyle={styles.inputCtn}
              autoCorrect={false}
              blurOnSubmit={false}
              value={this.state.username}
              onChangeText={(username) => {
                this.setState({username});
              }}
              onSubmitEditing={() => {
                this.inputPassword.focus();
              }}
              renderErrorMessage={false}
            />

            {/* password */}
            <Input
              containerStyle={[styles.ctnInput, styles.inputCtnPassword]}
              ref={(input) => {
                this.inputPassword = input;
              }}
              autoCapitalize={'none'}
              secureTextEntry={true}
              returnKeyType="go"
              placeholder="Password"
              placeholderTextColor={colorTheme.primary}
              inputStyle={styles.input}
              inputContainerStyle={styles.inputCtn}
              value={this.state.password}
              onChangeText={(password) => {
                this.setState({password});
              }}
              renderErrorMessage={false}
              onSubmitEditing={() => {
                this.onButSignin();
              }}
            />

            {/* login */}
            <View style={[styleUtil.withShadow(), styles.viewButLogin]}>
              <Button
                title="LOGIN"
                buttonStyle={stylesApp.butPrimary}
                titleStyle={stylesApp.titleButPrimary}
                onPress={() => this.onButSignin()}
              />
            </View>

            <View style={styles.viewOr}>
              <View style={styles.viewOrBar} />
              <Text style={styles.txtOr}>or</Text>
              <View style={styles.viewOrBar} />
            </View>

            {/* sign up */}
            <View style={styleUtil.withShadow()}>
              <Button
                title="REGISTER"
                buttonStyle={stylesApp.butLight}
                titleStyle={stylesApp.titleButLight}
                onPress={() => this.onButSignup()}
              />
            </View>
          </View>

          {/* footer */}
          <View style={{...stylesApp.flexRow, ...styles.viewFooter}}>
            <View />
            <Button
              title="forget password?"
              type="clear"
              titleStyle={stylesApp.titleButClear}
              onPress={() => this.onButForget()}
            />
          </View>
        </ContentWithBackground>
      </DismissKeyboard>
    );
  }

  async onButSignin() {
    // check validity
    if (!this.state.username) {
      Alert.alert('Invalid Username', 'Username cannot be empty');
      return;
    }

    if (!this.state.password) {
      Alert.alert('Invalid Password', 'Password cannot be empty');
      return;
    }

    // show loading
    this.loadingHUD.show('Signing in ...');

    try {
      let user = await AuthService.signIn(
        this.state.username,
        this.state.password,
      );

      await this.setUser(user);
    } catch (e) {
      console.log(e);

      Alert.alert('Login Failed', e.message);
    }

    // hide loading
    this.loadingHUD.hideAll();
  }

  onButSignup() {
    // go to signup page
    this.props.navigation.push(SignupBase.NAV_NAME);
  }

  onButForget() {
    // go to forget page
    this.props.navigation.push(ForgetEmail.NAV_NAME);
  }
}

const mapStateToProps = (state) => state;

const mapDispatchToProps = {
  setUserInfo,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
