import AsyncStorage from '@react-native-community/async-storage';
import {CURRENT_USER} from '../constants/storage-key';
import {Alert, Platform} from 'react-native';
import {ApiService, AuthService} from '../services';
import {User} from '../models/user.model';
import SelectPicker from '../components/SelectPicker/SelectPicker';
import {styles} from '../screens/signup/styles';
import {Picker} from '@react-native-community/picker';
import {STATES} from '../constants/constant-data';
import React from 'react';

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
      user.deliveryAddresses = u.deliveryAddresses;
    } catch (e) {}

    return Promise.resolve(true);
  }

  renderSelectStatePicker(page) {
    return (
      <SelectPicker
        isVisible={page.state.showStatePicker}
        contentStyle={styles.picker}
        onDismiss={(done) => this.dismissState(page, done)}>
        <Picker
          selectedValue={Platform.OS === 'ios' ? page.state.stateSelected : page.state.state}
          onValueChange={(itemValue, itemIndex) => {
            if (Platform.OS === 'ios') {
              page.setState({
                stateSelected: itemValue,
              });
            } else {
              page.setState({
                state: itemValue,
              });
            }
          }}>
          {STATES.map((s, i) => {
            return (
              <Picker.Item key={i.toString()} label={s.Name} value={s.value} />
            );
          })}
        </Picker>
      </SelectPicker>
    );
  }

  /**
   * state select picker
   */
  dismissState(page, done) {
    page.setState({
      showStatePicker: false,
    });

    let {stateSelected} = page.state;
    if (!stateSelected) {
      // default is the first one
      stateSelected = STATES[0].value;
    }

    // update date value based on done/canceled
    if (done) {
      page.setState({
        state: stateSelected,
      });
    } else {
      page.setState({
        stateSelected: page.state.state,
      });
    }
  }
}
