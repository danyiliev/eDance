import React from 'react';
import {styles as stylesMain} from '../radio/styles';
import {Alert, FlatList, Image, Text, View} from 'react-native';
import {Utils} from '../../../helpers/utils';
import {styles as stylesLike} from '../likes/styles';
import {stylesApp, styleUtil} from '../../../styles/app.style';
import ImageScale from 'react-native-scalable-image';
import {Button, Icon} from 'react-native-elements';
import {colors as colorTheme} from '../../../styles/theme.style';
import {styles} from './styles';
import {ApiService} from '../../../services';
import LessonItem from '../../../components/LessonItem/LessonItem';
import Profile from '../../profile/Profile';
import RNPaypal from 'react-native-paypal-lib';
import {config} from '../../../helpers/config';
import Toast from 'react-native-simple-toast';
import {connect} from 'react-redux';
import {LoadingHUD} from 'react-native-hud-hybrid';
import LessonPlayback from '../../lessons/lesson-playback/LessonPlayback';
import BaseLessonList from '../base-lesson-list';

class Student extends BaseLessonList {
  static NAV_NAME = 'student';

  state = {
    // ui
    showLoading: true,

    // data
    lessons: [],
  };

  constructor(props) {
    super(props);

    this.loadingHUD = new LoadingHUD();
  }

  componentDidMount(): void {
    super.componentDidMount();

    this.loadData();
  }

  render() {
    return (
      <View style={stylesMain.viewContainer}>
        <FlatList
          contentContainerStyle={stylesLike.listCtnContainer}
          keyExtractor={(item, index) => index.toString()}
          data={this.state.lessons}
          renderItem={({item, index}) => this.renderItem(item, index)}
          onRefresh={() => this.onRefresh()}
          refreshing={this.state.showLoading}
          ListEmptyComponent={() => this.renderEmptyItem()}
          onEndReached={() => this.onEndReached()}
          onEndReachedThreshold={3}
        />
      </View>
    );
  }

  renderItem(item, index) {
    return (
      <LessonItem
        lesson={item}
        index={index + 1}
        onTeacher={() => this.onTeacher(item)}
        onPurchase={() => this.onPurchase(item)}
        onLike={() => this.onLike(item)}
        onPress={() => this.onItem(item)}
      />
    );
  }

  renderEmptyItem() {
    // do not show anything when loading progress
    if (this.state.showLoading) {
      return null;
    }

    return (
      <View style={stylesApp.viewLoading}>
        <Text style={stylesApp.textEmptyItem}>No lessons available yet</Text>
      </View>
    );
  }

  onRefresh() {
    this.loadData();
  }

  async loadData(continued = false) {
    let indexFrom = 0;

    if (!continued) {
      // show loading mark
      this.setState({
        showLoading: true,
      });

      indexFrom = this.state.lessons.length;
    }

    try {
      let lessons = await ApiService.getLessonsAll(indexFrom, this.pageCount);

      if (indexFrom > 0) {
        // attach
        lessons = [...this.state.lessons, ...lessons];
      }

      this.setState({lessons});
    } catch (e) {
      console.log(e);
    }

    // hide loading
    this.setState({
      showLoading: false,
    });
  }

  async onPurchase(lesson) {
    // show loading
    this.loadingHUD.show();

    //
    // payment
    //
    // try {
    //   const resp = await RNPaypal.paymentRequest({
    //     clientId: config.clientId,
    //     environment: RNPaypal.ENVIRONMENT.SANDBOX,
    //     intent: RNPaypal.INTENT.SALE,
    //     price: Lesson.PRICE_RECORDED,
    //     currency: 'USD',
    //     description: `Recorded Dance Lesson of ${item.teacher.getFullName()}`,
    //     acceptCreditCards: true,
    //   });
    //
    //   console.log(resp);
    //
    //   Toast.show('Payment Successful');
    // } catch (e) {
    //   console.log(e.code);
    //
    //   if (e.code === 'USER_CANCELLED') {
    //   } else {
    //     Alert.alert('Payment Failed', e.message);
    //   }
    //
    //   // hide loading
    //   this.loadingHUD.hideAll();
    //   return;
    // }

    // add to purchased list
    try {
      await ApiService.purchaseLesson(lesson.id);

      this.currentUser?.lessonsPurchased.unshift(lesson.id);
      this.updateList();

      Toast.show('Purchased the lesson successfully');
    } catch (e) {
      console.log(e);

      Toast.show('Failed to purchase the lesson');
    }

    // hide loading
    this.loadingHUD.hideAll();
  }
}

const mapStateToProps = (state) => state;

export default connect(mapStateToProps, null)(Student);
