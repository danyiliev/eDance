import React from 'react';
import {stylesApp, styleUtil} from '../../styles/app.style';
import {FlatList, Image, Text, View} from 'react-native';
import {styles} from './styles';
import {styles as stylesCard} from '../../components/TeacherCard/styles';
import {styles as stylesLikes} from '../tabs/likes/styles';
import {Utils} from '../../helpers/utils';
import FastImage from 'react-native-fast-image';
import {Button} from 'react-native-elements';
import StarRating from 'react-native-star-rating';
import {colors as colorTheme} from '../../styles/theme.style';
import ScheduleSelect from '../schedule/ScheduleSelect';
import {ApiService} from '../../services';
import {UserHelper} from '../../helpers/user-helper';
import BookingDate from '../booking/booking-date/BookingDate';

export default class Reviews extends React.Component {
  static NAV_NAME = 'reviews';

  state = {
    // ui
    showLoading: true,

    // data
    reviews: [],
  };

  user = null;
  lesson = null;

  constructor(props) {
    super(props);

    // get parameter
    if (props.route.params) {
      this.user = props.route.params.user;
      this.lesson = props.route.params.lesson;
    }

    props.navigation.setOptions({
      title: this.user?.getFullName(),
    });
  }

  componentDidMount(): void {
    this.loadData();
  }

  render() {
    return (
      <View style={stylesApp.viewContainer}>
        {this.renderHeader()}

        <FlatList
          keyExtractor={(item, index) => index.toString()}
          data={this.state.reviews}
          renderItem={({item, index}) => this.renderItem(item, index)}
          contentContainerStyle={styles.containerList}
          onRefresh={() => this.onRefresh()}
          refreshing={this.state.showLoading}
          ListEmptyComponent={() => this.renderEmptyItem()}
        />
      </View>
    );
  }

  renderHeader() {
    return (
      <View style={styles.viewHeader}>
        {/* photo */}
        <FastImage
          style={styles.imgUser}
          source={UserHelper.getUserImage(this.user)}
          resizeMode={FastImage.resizeMode.cover}
        />

        {/* schedule */}
        <Button
          title="SCHEDULE"
          containerStyle={styles.ctnButSchedule}
          buttonStyle={stylesCard.butLightOutline}
          titleStyle={stylesCard.titleButton}
          onPress={() => this.onSchedule()}
        />
      </View>
    );
  }

  renderItem(item, index) {
    return (
      <View style={styles.viewItem}>
        <View style={stylesLikes.viewItemImage}>
          {/* image */}
          <Image style={styles.imgItem} source={require('../../../assets/imgs/lesson_default.png')} />

          {/* length */}
          {false ?? (
            <View style={stylesLikes.viewTxtLength}>
              <Text style={stylesLikes.txtLength}>01:32</Text>
            </View>
          )}
        </View>

        {/* content */}
        <View style={stylesLikes.viewItemContent}>
          <View style={styles.viewItemRating}>
            <StarRating
              maxStars={5}
              fullStarColor={colorTheme.primary}
              emptyStarColor={'#ACB1C0'}
              emptyStar={'star'}
              starStyle={styles.star}
              starSize={16}
              rating={item.rating}
            />

            {/* date */}
            <Text style={styles.txtDate}>{item.createdAtStr('YYYY-MM-DD')}</Text>
          </View>

          {/* title */}
          <Text style={styles.txtTitle}>{item.user?.getFullName()}</Text>

          {/* body */}
          <Text style={styles.txtBody}>{item.review}</Text>
        </View>
      </View>
    );
  }

  renderEmptyItem() {
    // do not show anything when loading progress
    if (this.state.showLoading) {
      return null;
    }

    return (
      <View style={stylesApp.viewLoading}>
        <Text style={stylesApp.txtEmptyItem}>No reviews received yet</Text>
      </View>
    );
  }

  onRefresh() {
    this.loadData();
  }

  async loadData() {
    try {
      const reviews = await ApiService.getUserReviews(this.user?.id);
      this.setState({reviews});
    } catch (e) {
      console.log(e);
    }

    // hide loading
    this.setState({
      showLoading: false,
    });
  }

  onSchedule() {
    if (this.lesson) {
      this.lesson?.setTeacher(this.user);

      // go to select date
      this.props.navigation.push(BookingDate.NAV_NAME, {
        lesson: this.lesson,
      });
    } else {
      // go to reviews page
      this.props.navigation.push(ScheduleSelect.NAV_NAME, {
        user: this.user,
      });
    }
  }
}
