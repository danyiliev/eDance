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
import SplashScreen from 'react-native-splash-screen';
import SignupAdvanced from './signup/SignupAdvanced';
import ForgetEmail from './forget/ForgetEmail';
import ForgetCode from './forget/ForgetCode';
import ForgetReset from './forget/ForgetReset';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Radio from './tabs/radio/Radio';
import TabMain, {renderMenuButton, renderRightButton} from './tabs/tabs';
import {styles as stylesTab} from './tabs/styles';
import ImageScale from 'react-native-scalable-image';
import {Button} from 'react-native-elements';
import Intro from './intro/Intro';
import MenuModal from '../components/MenuModal/MenuModal';
import {View} from 'react-native';
import {stylesApp} from '../styles/app.style';
import Home from './home/Home';
import Reviews from './reviews/Reviews';
import ScheduleSelect from './schedule/ScheduleSelect';
import ScheduleCheckout from './schedule/schedule-checkout/ScheduleCheckout';
import BookingMenu from './booking/booking-menu/BookingMenu';
import BookingDate from './booking/booking-date/BookingDate';
import Messaging from './messaging/Messaging';
import Chat from './chat/Chat';
import SettingProfile from './settings/setting-profile/SettingProfile';
import Championships from './championships/Championships';
import AsyncStorage from '@react-native-community/async-storage';
import {CURRENT_USER} from '../constants/storage-key';
import {User} from '../models/user.model';
import {ApiService} from '../services';
import Profile from './profile/Profile';
import EditProfile from './profile/edit-profile/EditProfile';
import AddPost from './add-post/AddPost';
import RadioDetail from './tabs/radio/radio-detail/RadioDetail';
import TvDetail from './tabs/tv/tv-detail/TvDetail';
import PostDetail from './post-detail/PostDetail';
import SelectList from './settings/select-list/SelectList';
import Pro from './tabs/pro/Pro';

const Stack = createStackNavigator();

class MainNavigator extends React.Component {
  navigationRef = React.createRef();

  state = {
    initializing: true,
    showMenu: false,
  };

  async componentDidMount(): void {
    try {
      // check user state
      const u = await AsyncStorage.getItem(CURRENT_USER);
      if (u) {
        let userObj = JSON.parse(u);
        let user = new User().deserialize(userObj);

        // save user to reduce
        this.props.setUserInfo(user);

        // set api token
        ApiService.setHeaderToken(user.apiToken);
      }

      // SplashScreen.hide();
    } catch (e) {
      console.log(e);
    }

    this.setState({
      initializing: false,
    });
  }

  render() {
    return (
      <NavigationContainer ref={this.navigationRef}>
        {this.state.initializing ? (
          <Splash />
        ) : this.props.UserReducer.user ? (
          <View style={stylesApp.viewContainer}>
            <Stack.Navigator
              initialRouteName={TabMain.NAV_NAME}
              screenOptions={{
                headerTintColor: colorTheme.primary,
              }}>
              <Stack.Screen
                name={TabMain.NAV_NAME}
                component={TabMain}
                options={{
                  headerLeft: () =>
                    renderMenuButton(this.onClickMenu.bind(this)),
                  headerRight: () =>
                    renderRightButton(this.navigationRef?.current),
                }}
              />
              <Stack.Screen name={Intro.NAV_NAME} component={Intro} />
              <Stack.Screen name={Home.NAV_NAME} component={Home} />
              <Stack.Screen name={Reviews.NAV_NAME} component={Reviews} />
              <Stack.Screen
                name={ScheduleSelect.NAV_NAME}
                component={ScheduleSelect}
              />
              <Stack.Screen
                name={ScheduleCheckout.NAV_NAME}
                component={ScheduleCheckout}
              />
              <Stack.Screen
                name={BookingMenu.NAV_NAME}
                component={BookingMenu}
              />
              <Stack.Screen
                name={BookingDate.NAV_NAME}
                component={BookingDate}
              />
              <Stack.Screen name={Messaging.NAV_NAME} component={Messaging} />
              <Stack.Screen name={Chat.NAV_NAME} component={Chat} />
              <Stack.Screen
                name={SettingProfile.NAV_NAME}
                component={SettingProfile}
              />
              <Stack.Screen
                name={Championships.NAV_NAME}
                component={Championships}
              />
              <Stack.Screen name={Profile.NAV_NAME} component={Profile} />
              <Stack.Screen
                name={EditProfile.NAV_NAME}
                component={EditProfile}
              />
              <Stack.Screen name={AddPost.NAV_NAME} component={AddPost} />
              <Stack.Screen
                name={RadioDetail.NAV_NAME}
                component={RadioDetail}
              />
              <Stack.Screen name={TvDetail.NAV_NAME} component={TvDetail} />
              <Stack.Screen name={PostDetail.NAV_NAME} component={PostDetail} />
              <Stack.Screen name={SelectList.NAV_NAME} component={SelectList} />
              <Stack.Screen name={Pro.NAV_NAME} component={Pro} />
            </Stack.Navigator>

            <MenuModal
              visible={this.state.showMenu}
              onMenuItem={(nav) => this.onMenuItem(nav)}
              onDismiss={() => this.showMenuModal(false)}
            />
          </View>
        ) : (
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
              options={{headerShown: false}}
            />
            <Stack.Screen
              name={Login.NAV_NAME}
              component={Login}
              options={{headerShown: false}}
            />
            <Stack.Screen name={SignupBase.NAV_NAME} component={SignupBase} />
            <Stack.Screen
              name={SignupAdvanced.NAV_NAME}
              component={SignupAdvanced}
            />
            <Stack.Screen name={ForgetEmail.NAV_NAME} component={ForgetEmail} />
            <Stack.Screen name={ForgetCode.NAV_NAME} component={ForgetCode} />
            <Stack.Screen name={ForgetReset.NAV_NAME} component={ForgetReset} />
          </Stack.Navigator>
        )}
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

  onMenuItem(nav) {
    this.showMenuModal(false);

    // go to page
    this.navigationRef?.current.navigate(nav);
  }
}

const mapStateToProps = (state) => state;

const mapDispatchToProps = {
  setUserInfo,
};

export default connect(mapStateToProps, mapDispatchToProps)(MainNavigator);
