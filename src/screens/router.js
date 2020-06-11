import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {setUserInfo} from '../actions/user';
import Landing from './landing/Landing';
import {colors as colorTheme} from '../styles/theme.style';
import {createStackNavigator} from '@react-navigation/stack';
import {connect} from 'react-redux';
import {Splash} from './splash/Splash';
import {Utils} from '../helpers/utils';

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
  }

  render() {
    return (
      <NavigationContainer>
        {
          this.state.initializing ?
            <Splash/>
            :
            <Stack.Navigator
              initialRouteName={Landing.NAV_NAME}
              screenOptions={{
                headerBackTitleVisible: false,
                headerTintColor: colorTheme.background,
              }}>
              <Stack.Screen
                name={Landing.NAV_NAME}
                component={Landing}
                options={{ headerShown: false }}
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
