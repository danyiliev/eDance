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

const Stack = createStackNavigator();

class MainNavigator extends React.Component {
  state = {
    initializing: true,
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
            <Stack.Navigator
              initialRouteName={SignupAdvanced.NAV_NAME}
              screenOptions={{
                headerBackTitleVisible: false,
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
            </Stack.Navigator>
        }
      </NavigationContainer>
    );
  }
}

const mapStateToProps = state => state;

const mapDispatchToProps = {
  setUserInfo,
};

export default connect(mapStateToProps, mapDispatchToProps)(MainNavigator);
