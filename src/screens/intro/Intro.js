import React from 'react';
import {Text, View} from 'react-native';
import {styles} from './styles';
import ImageScale from 'react-native-scalable-image';
import ContentWithBackground from '../../components/ContentWithBackground/ContentWithBackground';
import {stylesApp, styleUtil} from '../../styles/app.style';
import {Button, Icon} from 'react-native-elements';
import {styles as stylesSignup} from '../signup/styles';
import {colors as colorTheme} from '../../styles/theme.style';

export default class Intro extends React.Component {
  static NAV_NAME = 'intro';

  constructor(props) {
    super(props);

    props.navigation.setOptions({
      title: 'Home',
      headerLeft: null,
    });
  }

  render() {
    return (
      <View style={styles.viewContainer}>
        <View style={styles.viewContent}>
          <Text style={styles.txtTitle}>Welcome to</Text>

          {/* logo */}
          <ImageScale
            width={237}
            style={styles.imgLogo}
            source={require('../../../assets/imgs/logo.png')}
          />

          <Text style={styles.txtBody}>
            Please go ahead and schedule a video dance between with your
            favorite dance teacher{'\n\n'}
            An intro lesson will give you a review on your teacher or
            professional coach{'\n\n'}
            No matter if you are a beginner or a professional, try out our
            service, enjoy!
          </Text>
        </View>

        {/* next */}
        <View style={[styleUtil.withShadow(), styles.viewButNext]}>
          <Button
            title="GO AHEAD"
            buttonStyle={stylesApp.butPrimary}
            titleStyle={stylesApp.titleButPrimary}
            onPress={() => this.onButNext()}
            iconRight={true}
          />
        </View>
      </View>
    );
  }
}
