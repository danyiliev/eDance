import React from 'react';
import ContentWithBackground from '../../components/ContentWithBackground/ContentWithBackground';
import ImageScale from 'react-native-scalable-image';
import {styles as stylesLanding} from '../landing/styles';
import {styles} from './styles';
import {Text, View} from 'react-native';
import {Button, Input} from 'react-native-elements';
import {colors as colorTheme} from '../../styles/theme.style';
import DismissKeyboard from '../../components/DismissKeyboard/DismissKeyboard';
import {stylesApp} from '../../styles/app.style';

export default class Login extends React.Component {
  static NAV_NAME = 'login';

  state = {
    username: '',
    password: '',
  };

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
            onChangeText={(username) => {this.setState({username})}}
            onSubmitEditing={() => { this.inputPassword.focus(); }}
            renderErrorMessage={false}
          />

          {/* password */}
          <Input
            containerStyle={[styles.ctnInput, styles.inputCtnPassword]}
            ref={(input) => { this.inputPassword = input; }}
            autoCapitalize={'none'}
            secureTextEntry={true}
            returnKeyType="go"
            placeholder="Password"
            placeholderTextColor={colorTheme.primary}
            inputStyle={styles.input}
            inputContainerStyle={styles.inputCtn}
            value={this.state.password}
            onChangeText={(password) => {this.setState({password})}}
            renderErrorMessage={false}
          />

          {/* login */}
          <View style={[stylesApp.withShadow, styles.viewButLogin]}>
            <Button
              title="LOGIN"
              buttonStyle={stylesApp.butPrimary}
              titleStyle={stylesApp.titleButPrimary}
              onPress={() => this.onButSignin()}
            />
          </View>

          <View style={styles.viewOr}>
            <View style={styles.viewOrBar}/>
            <Text style={styles.txtOr}>or</Text>
            <View style={styles.viewOrBar}/>
          </View>

          {/* login */}
          <View style={stylesApp.withShadow}>
            <Button
              title="REGISTER"
              buttonStyle={stylesApp.butLight}
              titleStyle={stylesApp.titleButLight}
              onPress={() => this.onButSignup()}
            />
          </View>

        </View>
      </ContentWithBackground>
      </DismissKeyboard>
    );
  }

  onButSignin() {
  }

  onButSignup() {
  }
}
