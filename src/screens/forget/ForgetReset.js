import React from 'react';
import DismissKeyboard from '../../components/DismissKeyboard/DismissKeyboard';
import ContentWithBackground from '../../components/ContentWithBackground/ContentWithBackground';
import {Text, View} from 'react-native';
import {styles} from './styles';
import ImageScale from 'react-native-scalable-image';
import {styles as stylesSignup} from '../signup/styles';
import {Button, Icon, Input} from 'react-native-elements';
import {colors as colorTheme} from '../../styles/theme.style';
import {styles as stylesLogin} from '../login/styles';
import {stylesApp, styleUtil} from '../../styles/app.style';

export default class ForgetReset extends React.Component {
  static NAV_NAME = 'forget-reset';

  state = {
    // data
    password: '',
    passwordConfirm: '',
  };

  constructor(props) {
    super(props);

    props.navigation.setOptions({
      title: 'Forgot password',
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
            <View style={styles.viewTop}>
              {/* logo */}
              <ImageScale
                width={237}
                style={styles.imgLogo}
                source={require('../../../assets/imgs/logo.png')}
              />

              {/* title */}
              <Text style={stylesSignup.txtItemTitle}>
                Input your new password
              </Text>
            </View>

            <View style={styles.ctnInput}>
              {/* new password */}
              <Input
                autoCapitalize={'none'}
                secureTextEntry={true}
                returnKeyType="next"
                placeholder="New password"
                placeholderTextColor={colorTheme.primary}
                inputStyle={stylesLogin.input}
                inputContainerStyle={stylesLogin.inputCtn}
                value={this.state.password}
                onChangeText={(password) => {
                  this.setState({password});
                }}
                renderErrorMessage={false}
              />

              {/* confirm password */}
              <Input
                containerStyle={stylesApp.mt4}
                autoCapitalize={'none'}
                secureTextEntry={true}
                returnKeyType="next"
                placeholder="Confirm password"
                placeholderTextColor={colorTheme.primary}
                inputStyle={stylesLogin.input}
                inputContainerStyle={stylesLogin.inputCtn}
                value={this.state.passwordConfirm}
                onChangeText={(passwordConfirm) => {
                  this.setState({passwordConfirm});
                }}
                renderErrorMessage={false}
              />
            </View>

            {/* next */}
            <View style={[styleUtil.withShadow(), styles.viewButNext]}>
              <Button
                title="Done"
                buttonStyle={stylesApp.butPrimary}
                titleStyle={stylesApp.titleButPrimary}
                onPress={() => this.onButDone()}
              />
            </View>
          </View>
        </ContentWithBackground>
      </DismissKeyboard>
    );
  }

  onButDone() {}
}
