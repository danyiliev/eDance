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
import ForgetReset from './ForgetReset';

export default class ForgetCode extends React.Component {
  static NAV_NAME = 'forget-code';

  state = {
    // data
    code: '',
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
                Type verification code from your email
              </Text>
            </View>

            {/* code */}
            <Input
              containerStyle={styles.ctnInput}
              autoCapitalize={'none'}
              keyboardType="number-pad"
              returnKeyType="next"
              placeholder="Verification code"
              placeholderTextColor={colorTheme.primary}
              inputStyle={stylesLogin.input}
              inputContainerStyle={stylesLogin.inputCtn}
              value={this.state.code}
              onChangeText={(code) => {
                this.setState({code});
              }}
              renderErrorMessage={false}
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
    // go to forget page
    this.props.navigation.push(ForgetReset.NAV_NAME);
  }
}
