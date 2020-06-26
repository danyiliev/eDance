import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {setUserInfo} from '../actions/user';
import Landing from './landing/Landing';
import {colors as colorTheme} from '../styles/theme.style';
import {createStackNavigator} from '@react-navigation/stack';
import {connect} from 'react-redux';
import {Splash} from './splash/Splash';
import {Utils} from '../helpers/utils';
import Login from './login/Login';
import SignupBase from './signup/SignupBase';
import SplashScreen from "react-native-splash-screen";
import SignupAdvanced from './signup/SignupAdvanced';
import ForgetEmail from './forget/ForgetEmail';
import ForgetCode from './forget/ForgetCode';
import ForgetReset from './forget/ForgetReset';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Radio from './tabs/radio/Radio';
import TabMain, {renderMenuButton} from './tabs/tabs';
import {styles as stylesTab} from './tabs/styles';
import ImageScale from 'react-native-scalable-image';
import {Button} from 'react-native-elements';
import Intro from './intro/Intro';
import MenuModal from '../components/MenuModal/MenuModal';
import {View} from 'react-native';
import {stylesApp} from '../styles/app.style';
import Home from './home/Home';
import Reviews from './reviews/Reviews';

const Stack = createStackNavigator();

class MainNavigator extends React.Component {
  state = {
    initializing: true,
    showMenu: false,
  };

  async componentDidMount(): void {
    await Utils.sleep(2000);

    this.setState({
      initializing: false,
    });

    SplashScreen.hide();
  }

  render() {
    return (
      <NavigationContainer>
        {
          this.state.initializing ?
            <Splash/>
            :
            1 === 1 ?
              <View style={stylesApp.viewContainer}>
                <Stack.Navigator
                  initialRouteName={Reviews.NAV_NAME}
                  screenOptions={{
                    headerTintColor: colorTheme.primary,
                    headerLeft: () => renderMenuButton(this.onClickMenu.bind(this)),
                  }}>
                  <Stack.Screen
                    name={TabMain.NAV_NAME}
                    component={TabMain}
                  />
                  <Stack.Screen
                    name={Intro.NAV_NAME}
                    component={Intro}
                  />
                  <Stack.Screen
                    name={Home.NAV_NAME}
                    component={Home}
                  />
                  <Stack.Screen
                    name={Reviews.NAV_NAME}
                    component={Reviews}
                  />
                </Stack.Navigator>

                <MenuModal
                  visible={this.state.showMenu}
                  onDismiss={() => this.showMenuModal(false)}
                />
              </View>
              :
              // not signed in
              <Stack.Navigator
                initialRouteName={Landing.NAV_NAME}
                screenOptions={{
                  headerBackTitleVisible: false,
                  headerTintColor: colorTheme.primary,
                }}>
                <Stack.Screen
                  name={Landing.NAV_NAME}
                  component={Landing}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name={Login.NAV_NAME}
                  component={Login}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name={SignupBase.NAV_NAME}
                  component={SignupBase}
                />
                <Stack.Screen
                  name={SignupAdvanced.NAV_NAME}
                  component={SignupAdvanced}
                />
                <Stack.Screen
                  name={ForgetEmail.NAV_NAME}
                  component={ForgetEmail}
                />
                <Stack.Screen
                  name={ForgetCode.NAV_NAME}
                  component={ForgetCode}
                />
                <Stack.Screen
                  name={ForgetReset.NAV_NAME}
                  component={ForgetReset}
                />
              </Stack.Navigator>
        }
      </NavigationContainer>
    );
  }

  onClickMenu() {
    this.showMenuModal(true);
  }

  showMenuModal(show) {
    this.setState({
      showMenu: show,
    });
  }
}

const mapStateToProps = state => state;

const mapDispatchToProps = {
  setUserInfo,
};

export default connect(mapStateToProps, mapDispatchToProps)(MainNavigator);
