import AsyncStorage from '@react-native-community/async-storage';
import {CURRENT_USER} from '../constants/storage-key';
import {Alert} from 'react-native';
import {ApiService, AuthService} from '../services';
import {User} from '../models/user.model';

export class UserHelper {
  static instance: UserHelper;

  static getInstance() {
    if (!this.instance) {
      this.instance = new UserHelper();
    }

    return this.instance;
  }

  static getUserImage(u) {
    if (u?.photo) {
      return {uri: u?.getPhotoUrl()};
    }

    return require('../../assets/imgs/user_default.png');
  }

  onLogout(completed) {
    Alert.alert(
      'Are you sure you want to log out?',
      '',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'Yes', onPress: () => this.doLogout(completed)},
      ],
      {cancelable: true},
    );
  }

  doLogout(completed) {
    AuthService.signOut();

    if (completed) {
      completed();
    }
  }

  static saveUserToLocalStorage(user, props) {
    // save user to reduce
    props.setUserInfo(user);

    // save user to local storage
    AsyncStorage.setItem(CURRENT_USER, user.toJsonString());
  }

  static async fetchUserData(user) {
    if (!user.id) {
      return Promise.resolve(false);
    }

    try {
      const u = await ApiService.getMe();

      // fill data
      user.lessonsPurchased = u.lessonsPurchased;
      user.lessonsLiked = u.lessonsLiked;
      user.carts = u.carts;
    } catch (e) {}

    return Promise.resolve(true);
  }
}
