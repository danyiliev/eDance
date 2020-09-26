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
import Profile from '../profile/Profile';
import ActionSheet from 'react-native-actionsheet';
import Orders from '../orders/Orders';
import Products from '../products/Products';
import stripe from 'tipsi-stripe';
import {config} from '../../helpers/config';

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
      headerRight: () => this.renderRightButton(),
    });
  }

  componentDidMount(): void {
    SplashScreen.hide();

    // init stripe
    stripe.setOptions({
      publishableKey: config.stripeKey,
    });
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

  getRouteName() {
    const route = this.props.route;
    // Access the tab navigator's state using `route.state`
    const routeName = route.state
      ? // Get the currently active route name in the tab navigator
        route.state.routes[route.state.index].name
      : // If state doesn't exist, we need to default to `screen` param if available, or the initial screen
        // In our case, it's "Feed" as that's the first screen inside the navigator
        route.params?.screen || Pro.NAV_NAME;

    return routeName;
  }

  getHeaderTitle() {
    const routeName = this.getRouteName();

    switch (routeName) {
      case Radio.NAV_NAME:
        return 'Dance Radio';
      case Tv.NAV_NAME:
        return 'Dance TV';
      case Pro.NAV_NAME:
        return 'Dance Pro';
      case Student.NAV_NAME:
        return 'Dance Student';
      case Store.NAV_NAME:
        return 'Store';
      case Likes.NAV_NAME:
        return 'Likes';
    }
  }

  render() {
    return (
      <View style={stylesApp.viewContainer}>
        <Tab.Navigator
          initialRouteName={Pro.NAV_NAME}
          tabBarOptions={{
            activeTintColor: colorTheme.primary,
          }}
          tabBar={(props) => {
            return <BottomTabBar style={styles.tabbar} {...props} />;
          }}>
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

        <ActionSheet
          ref={(o) => (this.ActionSheet = o)}
          options={['My Orders', 'My Products', 'Cancel']}
          cancelButtonIndex={2}
          onPress={(index) => {
            this.onMoreItem(index);
          }}
        />
      </View>
    );
  }

  renderRightButton() {
    const routeName = this.getRouteName();

    if (routeName === Store.NAV_NAME) {
      return (
        <Button
          type="clear"
          buttonStyle={stylesTab.butHeaderLeft}
          icon={<Icon type="ionicon" name="ios-more" size={20} />}
          onPress={() => this.onStoreMore()}
        />
      );
    } else {
      return (
        <Button
          type="clear"
          buttonStyle={stylesTab.butHeaderLeft}
          icon={<Icon type="font-awesome" name="user-o" size={16} />}
          onPress={() => {
            this.props.navigation.navigate(Profile.NAV_NAME);
          }}
        />
      );
    }
  }

  onStoreMore() {
    this.ActionSheet.show();
  }

  onMoreItem(index) {
    if (index === 0) {
      // go to my orders
      this.props.navigation.push(Orders.NAV_NAME);
    } else if (index === 1) {
      // go to my products
      this.props.navigation.push(Products.NAV_NAME);
    }
  }
}
