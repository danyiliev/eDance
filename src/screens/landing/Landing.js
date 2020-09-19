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
import SettingProfile from '../settings/setting-profile/SettingProfile';
import SignupBase from '../signup/SignupBase';
import Terms from '../terms/Terms';
import AddChampionship from '../championships/add-championship/AddChampionship';

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

          <View style={{...styleUtil.withShadow(), ...styles.viewButStudent}}>
            <Button
              title="CREATE DANCESPORT CHAMPIONSHIPS"
              buttonStyle={stylesApp.butLightOutline}
              titleStyle={stylesApp.titleButLight}
              onPress={() => this.onButEvent()}
            />
          </View>

          <Button
            type="clear"
            title="Log In"
            containerStyle={styles.ctnButLogin}
            // buttonStyle={styles.butClear}
            titleStyle={styles.titleButLogin}
            onPress={() => this.onButLogin()}
          />
        </View>

        {/* footer */}
        <View style={{...stylesApp.flexRow, ...styles.viewFooter}}>
          <Button
            title="about us"
            type="clear"
            titleStyle={stylesApp.titleButClear}
          />

          <Button
            title="terms of services"
            type="clear"
            titleStyle={stylesApp.titleButClear}
            onPress={() => this.onButTerms()}
          />
        </View>
      </ContentWithBackground>
    );
  }

  onButNext(type) {
    if (type === User.TYPE_TEACHER) {
      // go to base setting page
      this.props.navigation.push(SettingProfile.NAV_NAME_SIGNUP);
      return;
    }

    // go to signup page
    this.props.navigation.push(SignupBase.NAV_NAME, {userType: type});
  }

  onButLogin() {
    // go to login page
    this.props.navigation.push(Login.NAV_NAME);
  }

  onButTerms() {
    // go to terms page
    this.props.navigation.push(Terms.NAV_NAME);
  }

  onButEvent() {
    // go to create event page
    this.props.navigation.push(AddChampionship.NAV_NAME_SIGNUP);
  }
}
