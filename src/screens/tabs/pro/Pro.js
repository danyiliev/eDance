import React from 'react';
import {styles as stylesMain} from '../radio/styles';
import {ActivityIndicator, FlatList, Text, View} from 'react-native';
import {User} from '../../../models/user.model';
import {styles as stylesHome} from '../../home/styles';
import {Utils} from '../../../helpers/utils';
import {stylesApp, styleUtil} from '../../../styles/app.style';
import ImageScale from 'react-native-scalable-image';
import Swiper from 'react-native-deck-swiper';
import TeacherCard from '../../../components/TeacherCard/TeacherCard';
import {ApiService} from '../../../services';
import Reviews from '../../reviews/Reviews';
import ScheduleSelect from '../../schedule/ScheduleSelect';
import Profile from '../../profile/Profile';
import BookingDate from '../../booking/booking-date/BookingDate';

export default class Pro extends React.Component {
  static NAV_NAME = 'pro';

  state = {
    users: [],

    loadingUser: true,
    loadingData: true,
  };

  pageCount = 15;
  userIndexSelected = -1;

  lesson = null;

  constructor(props) {
    super(props);

    // get parameter
    if (props.route.params) {
      this.lesson = props.route.params.lesson;
    }

    props.navigation.setOptions({
      title: this.lesson ? 'Select Teacher' : 'Home',
    });
  }

  async componentDidMount(): void {
    await this.loadUsers();
  }

  render() {
    return (
      <View style={stylesMain.viewContainer}>
        <FlatList
          keyExtractor={(item, index) => index.toString()}
          data={Utils.makeEmptyArray(0)}
          renderItem={({item, index}) => this.renderItem(item, index)}
          ListHeaderComponent={() => this.renderHeader()}
          ListFooterComponent={() => this.renderFooter()}
        />
      </View>
    );
  }

  renderHeader() {
    if (this.state.loadingUser) {
      return (
        <View style={stylesHome.viewHeader}>
          <View style={stylesApp.viewLoading}>
            <ActivityIndicator animating={true} />
          </View>
        </View>
      );
    }

    if (this.state.users.length <= 0) {
      return (
        <View style={stylesHome.viewHeader}>
          <View style={stylesApp.viewLoading}>
            <Text style={stylesApp.txtEmptyItem}>No users available yet</Text>
          </View>
        </View>
      );
    }

    return (
      <View style={stylesHome.viewHeader}>
        {this.state.loadingUser ? (
          <View style={stylesApp.viewLoading}>
            <ActivityIndicator animating={true} />
          </View>
        ) : (
          <Swiper
            animateCardOpacity
            horizontalSwipe={!this.state.loadingData}
            verticalSwipe={false}
            containerStyle={stylesHome.ctnSwiper}
            cards={this.state.users}
            renderCard={(user) => (
              <TeacherCard
                user={user}
                onUser={() => this.onUser(user)}
                onReview={() => this.onUserReviews(user)}
                onSchedule={() => this.onUserSchedule(user)}
              />
            )}
            cardIndex={this.userIndexSelected}
            stackSize={2}
            showSecondCard
            animateOverlayLabelsOpacity
            stackSeparation={0}
            infinite={true}
            // style
            backgroundColor={'transparent'}
            cardHorizontalMargin={16}
            cardVerticalMargin={16}
            cardStyle={stylesHome.cardSwiper}
            // evemts
            onSwiped={(cardIndex) => this.onSwiped(cardIndex)}
          />
        )}
      </View>
    );
  }

  renderFooter() {
    // loading user, data will be loaded after that
    if (this.state.loadingUser) {
      return null;
    }

    // no user selected
    if (this.userIndexSelected < 0) {
      return null;
    }

    return (
      <View style={stylesApp.viewLoading}>
        {this.state.loadingData ? (
          <ActivityIndicator animating={true} />
        ) : (
          <Text style={stylesApp.txtEmptyItem}>No badges yet</Text>
        )}
      </View>
    );
  }

  renderItem(item, index) {
    return (
      <View style={[styleUtil.withShadow(14, 0.6), stylesHome.viewBadgeItem]}>
        {/* icon */}
        <ImageScale
          width={36}
          source={require('../../../../assets/imgs/ic_badge.png')}
        />

        <View style={stylesHome.viewItemContent}>
          <Text style={stylesHome.txtBadge}>US Pro-Dancer Championships</Text>

          <View style={stylesHome.viewItemBottom}>
            {/* date */}
            <Text style={stylesHome.txtBadgeDate}>10 Oct 2020</Text>

            {/* category */}
            <View style={stylesHome.viewBadgeCategory}>
              <Text style={stylesHome.txtBadgeCategory}>Challenge</Text>
            </View>
          </View>
        </View>
      </View>
    );
  }

  async loadUsers() {
    const indexFrom = this.state.users.length;
    console.log(indexFrom);

    let needLoadData = !this.state.users.length > 0;

    const userTypes = this.lesson
      ? [User.TYPE_TEACHER]
      : [User.TYPE_TEACHER, User.TYPE_STUDENT, User.TYPE_ADJUDICATOR];

    try {
      // fetch all users
      let users = await ApiService.getUsers(
        indexFrom,
        this.pageCount,
        userTypes,
      );

      if (users.length > 0) {
        await this.setState({
          users: [...this.state.users, ...users],
        });

        // load data if the first fetch
        if (needLoadData) {
          this.userIndexSelected = 0;
          this.loadData();
        }
      } else {
        console.log('No more users');
      }
    } catch (e) {
      console.log(e);
    }

    // hide loading
    this.setState({
      loadingUser: false,
    });
  }

  /**
   * load user social data
   */
  async loadData() {
    this.setState({
      loadingData: true,
    });

    await Utils.sleep(1000);

    this.setState({
      loadingData: false,
    });
  }

  onSwiped(index) {
    this.userIndexSelected = (index + 1) % this.state.users.length;
    this.loadData();

    if (
      this.state.users.length >= this.pageCount &&
      this.userIndexSelected === this.state.users.length - 5
    ) {
      // continue loading the next user data
      this.loadUsers();
    }
  }

  onUserReviews(user) {
    // go to reviews page
    this.props.navigation.push(Reviews.NAV_NAME, {
      user: user,
      lesson: this.lesson,
    });
  }

  onUserSchedule(user) {
    if (this.lesson) {
      this.lesson.setTeacher(user);

      // go to select date
      this.props.navigation.push(BookingDate.NAV_NAME, {
        lesson: this.lesson,
      });
    } else {
      // go to reviews page
      this.props.navigation.push(ScheduleSelect.NAV_NAME, {
        user: user,
      });
    }
  }

  onUser(user) {
    // go to profile page
    this.props.navigation.push(Profile.NAV_NAME, {
      user: user,
    });
  }
}
