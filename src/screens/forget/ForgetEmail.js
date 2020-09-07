import React from 'react';
import DismissKeyboard from '../../components/DismissKeyboard/DismissKeyboard';
import ContentWithBackground from '../../components/ContentWithBackground/ContentWithBackground';
import {Alert, Text, View} from 'react-native';
import {styles} from './styles';
import {styles as stylesSignup} from '../signup/styles';
import {Button, Icon, Input} from 'react-native-elements';
import {styles as stylesLogin} from '../login/styles';
import {stylesApp, styleUtil} from '../../styles/app.style';
import {colors as colorTheme} from '../../styles/theme.style';
import ImageScale from 'react-native-scalable-image';
import ForgetCode from './ForgetCode';
import {Utils} from '../../helpers/utils';

export default class ForgetEmail extends React.Component {
  static NAV_NAME = 'forget-email';

  state = {
    // data
    email: '',
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
              <Text style={stylesSignup.txtItemTitle}>Type your email</Text>
            </View>

            {/* email */}
            <Input
              ref={(input) => {
                this.inputEmail = input;
              }}
              containerStyle={styles.ctnInput}
              autoCapitalize={'none'}
              keyboardType="email-address"
              returnKeyType="next"
              placeholder="Email Address"
              placeholderTextColor={colorTheme.primary}
              inputStyle={stylesLogin.input}
              inputContainerStyle={stylesLogin.inputCtn}
              value={this.state.email}
              onChangeText={(email) => {
                this.setState({email});
              }}
              renderErrorMessage={false}
              rightIcon={
                <ImageScale
                  width={14}
                  source={require('../../../assets/imgs/ic_input_email.png')}
                />
              }
            />

            {/* next */}
            <View style={[styleUtil.withShadow(), styles.viewButNext]}>
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

  onButNext() {
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

    // go to forget page
    this.props.navigation.push(ForgetCode.NAV_NAME);
  }
}
