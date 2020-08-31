import React from 'react';
import {ApiService} from '../../services';
import {Utils} from '../../helpers/utils';
import {LoadingHUD} from 'react-native-hud-hybrid';
import {Text, View} from 'react-native';
import {styles} from './broadcast/styles';
import {stylesApp} from '../../styles/app.style';
import FastImage from 'react-native-fast-image';
import {UserHelper} from '../../helpers/user-helper';

export default class BaseLesson extends React.Component {
  currentUser = null;
  lesson = null;

  timerRefresh = null;

  constructor(props) {
    super(props);

    this.currentUser = props.UserReducer.user;
    this.loadingHUD = new LoadingHUD();

    // get parameter
    if (props.route.params) {
      this.lesson = props.route.params.lesson;
    }
  }

  renderUsers() {
    if (this.state.joinedUsers.length <= 0) {
      return null;
    }

    return (
      <View style={[styles.viewUsers, stylesApp.mt12]}>
        {this.state.joinedUsers.map((u, i) => {
          return (
            <View style={styles.viewUser} key={i.toString()}>
              <FastImage style={styles.viewUserPhoto} source={UserHelper.getUserImage(u)} />
              <Text style={styles.txtUseName}>{u.getFullName()}</Text>
            </View>
          );
        })}
      </View>
    );
  }

  async refreshTimer() {
    try {
      this.lesson = await ApiService.getLessonById(this.lesson?.id);

      // update UI
      this.setState({
        joinedUsers: this.lesson?.joinedUsers,
      });
    } catch (e) {
      console.log(e);
    }
  }

  startRefreshTimer() {
    const that = this;

    this.timerRefresh = setTimeout(async function f() {
      await that.refreshTimer();

      that.timerRefresh = setTimeout(f, 1000);
    }, 0);
  }

  stopRefreshTimer() {
    if (this.timerRefresh) {
      clearTimeout(this.timerRefresh);
    }
  }
}
