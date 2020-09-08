import React from 'react';
import SplashScreen from 'react-native-splash-screen';
import {styles} from './styles';
import ContentWithBackground from '../../components/ContentWithBackground/ContentWithBackground';
import ImageScale from 'react-native-scalable-image';
import {View} from 'react-native';
import {Button} from 'react-native-elements';
import {stylesApp, styleUtil} from '../../styles/app.style';
import Login from '../login/Login';
import {User} from '../../models/user.model';

export default class Landing extends React.Component {
  static NAV_NAME = 'landing';

  componentDidMount(): void {
    SplashScreen.hide();
  }

  render() {
    return (
      <ContentWithBackground style={styles.viewContainer}>
        {/* logo */}
        <ImageScale
          width={237}
          style={styles.imgLogo}
          source={require('../../../assets/imgs/logo.png')}
        />

        {/* buttons */}
        <View style={styles.viewButtons}>
          {/* teacher */}
          <View style={styleUtil.withShadow()}>
            <Button
              title="BECOME A DANCE TEACHER"
              buttonStyle={stylesApp.butPrimary}
              titleStyle={stylesApp.titleButPrimary}
              onPress={() => this.onButNext(User.TYPE_TEACHER)}
            />
          </View>

          {/* student */}
          <View style={{...styleUtil.withShadow(), ...styles.viewButStudent}}>
            <Button
              title="BECOME A DANCE STUDENT"
              buttonStyle={stylesApp.butLight}
              titleStyle={stylesApp.titleButLight}
              onPress={() => this.onButNext(User.TYPE_STUDENT)}
            />
          </View>
        </View>

        {/* footer */}
        <View style={{...stylesApp.flexRow, ...styles.viewFooter}}>
          <Button
            title="about us"
            type="clear"
            titleStyle={stylesApp.titleButClear}
          />

          <Button
            title="customer support"
            type="clear"
            titleStyle={stylesApp.titleButClear}
          />
        </View>
      </ContentWithBackground>
    );
  }

  onButNext(type) {
    // go to login page
    this.props.navigation.push(Login.NAV_NAME, {userType: type});
  }
}
