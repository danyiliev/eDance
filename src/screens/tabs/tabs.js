import React from 'react';
import Radio from './radio/Radio';
import {
  createBottomTabNavigator,
  BottomTabBar,
} from '@react-navigation/bottom-tabs';
import {Image, View} from 'react-native';
import ImageScale from 'react-native-scalable-image';
import {styles as stylesTab, styles} from './styles';
import {colors as colorTheme} from '../../styles/theme.style';
import Tv from './tv/Tv';
import Pro from './pro/Pro';
import Student from './student/Student';
import Store from './store/Store';
import Likes from './likes/Likes';
import {Button, Icon} from 'react-native-elements';
import MenuModal from '../../components/MenuModal/MenuModal';
import {stylesApp} from '../../styles/app.style';
import SplashScreen from 'react-native-splash-screen';

const Tab = createBottomTabNavigator();

export function renderMenuButton(onPress) {
  return (
    <Button
      type="clear"
      buttonStyle={stylesTab.butHeaderLeft}
      icon={
        <ImageScale
          width={18}
          source={require('../../../assets/imgs/ic_but_menu.png')}
        />
      }
      onPress={onPress}
    />
  );
}

export default class TabMain extends React.Component {
  static NAV_NAME = 'tabs';

  constructor(props) {
    super(props);

    props.navigation.setOptions({
      title: this.getHeaderTitle(),
    });
  }

  componentDidMount(): void {
    SplashScreen.hide();
  }

  componentDidUpdate(
    prevProps: Readonly<P>,
    prevState: Readonly<S>,
    snapshot: SS,
  ): void {
    // update title
    this.props.navigation.setOptions({
      title: this.getHeaderTitle(),
    });
  }

  getHeaderTitle() {
    const route = this.props.route;
    // Access the tab navigator's state using `route.state`
    const routeName = route.state
      ? // Get the currently active route name in the tab navigator
        route.state.routes[route.state.index].name
      : // If state doesn't exist, we need to default to `screen` param if available, or the initial screen
        // In our case, it's "Feed" as that's the first screen inside the navigator
        route.params?.screen || Radio.NAV_NAME;

    switch (routeName) {
      case Radio.NAV_NAME:
        return 'Dance Radio';
      case Tv.NAV_NAME:
        return 'Dance TV';
      case Pro.NAV_NAME:
        return 'Dance Pro';
      case Student.NAV_NAME:
        return 'Dance Student';
      case Likes.NAV_NAME:
        return 'Likes';
    }
  }

  render() {
    return (
      <View style={stylesApp.viewContainer}>
        <Tab.Navigator
          initialRouteName={Radio.NAV_NAME}
          tabBarOptions={{
            activeTintColor: colorTheme.primary,
          }}
          tabBar={(props) => <BottomTabBar style={styles.tabbar} {...props} />}>
          <Tab.Screen
            name={Radio.NAV_NAME}
            component={Radio}
            options={{
              tabBarLabel: 'Radio',
              tabBarIcon: ({focused, color, size}) => (
                <ImageScale
                  width={21}
                  style={{
                    opacity: focused ? 1 : 0.3,
                  }}
                  source={require('../../../assets/imgs/tab_radio.png')}
                />
              ),
            }}
          />
          <Tab.Screen
            name={Tv.NAV_NAME}
            component={Tv}
            options={{
              tabBarLabel: 'TV',
              tabBarIcon: ({focused, color, size}) => (
                <ImageScale
                  width={24}
                  style={{
                    opacity: focused ? 1 : 0.3,
                  }}
                  source={require('../../../assets/imgs/tab_tv.png')}
                />
              ),
            }}
          />
          <Tab.Screen
            name={Pro.NAV_NAME}
            component={Pro}
            options={{
              tabBarLabel: 'Pro',
              tabBarIcon: ({focused, color, size}) => (
                <ImageScale
                  width={16}
                  style={{
                    opacity: focused ? 1 : 0.3,
                  }}
                  source={require('../../../assets/imgs/tab_pro.png')}
                />
              ),
            }}
          />
          <Tab.Screen
            name={Student.NAV_NAME}
            component={Student}
            options={{
              tabBarLabel: 'Student',
              tabBarIcon: ({focused, color, size}) => (
                <ImageScale
                  width={22}
                  style={{
                    opacity: focused ? 1 : 0.3,
                  }}
                  source={require('../../../assets/imgs/tab_student.png')}
                />
              ),
            }}
          />
          <Tab.Screen
            name={Store.NAV_NAME}
            component={Store}
            options={{
              tabBarLabel: 'Store',
              tabBarIcon: ({focused, color, size}) => (
                <ImageScale
                  width={22}
                  style={{
                    opacity: focused ? 1 : 0.3,
                  }}
                  source={require('../../../assets/imgs/tab_store.png')}
                />
              ),
            }}
          />
          <Tab.Screen
            name={Likes.NAV_NAME}
            component={Likes}
            options={{
              tabBarLabel: 'Likes',
              tabBarIcon: ({focused, color, size}) => (
                <ImageScale
                  width={22}
                  style={{
                    opacity: focused ? 1 : 0.3,
                  }}
                  source={require('../../../assets/imgs/tab_like.png')}
                />
              ),
            }}
          />
        </Tab.Navigator>
      </View>
    );
  }
}
