import React from 'react';
import {FlatList, Text, View} from 'react-native';
import Swiper from 'react-native-deck-swiper';
import {styles} from './styles';
import {User} from '../../models/user.model';
import TeacherCard from '../../components/TeacherCard/TeacherCard';
import {stylesApp, styleUtil} from '../../styles/app.style';
import {Utils} from '../../helpers/utils';
import ImageScale from 'react-native-scalable-image';
import Reviews from '../reviews/Reviews';
import ScheduleSelect from '../schedule/ScheduleSelect';

export default class Home extends React.Component {
  static NAV_NAME = 'home';

  teachers = [];

  constructor(props) {
    super(props);

    props.navigation.setOptions({
      title: 'Home',
    });

    // init teachers
    for (let i = 0; i < 10; i++) {
      this.teachers.push(new User());
    }
  }

  render() {
    return (
      <View style={styles.viewContainer}>
        <FlatList
          keyExtractor={(item, index) => index.toString()}
          data={Utils.makeEmptyArray(1 + 10)}
          renderItem={({item, index}) => this.renderItem(item, index)}
          ListHeaderComponent={() => this.renderHeader()}
        />
      </View>
    );
  }

  renderHeader() {
    return (
      <View style={styles.viewHeader}>
        <Swiper
          animateCardOpacity
          verticalSwipe={false}
          containerStyle={styles.ctnSwiper}
          cards={this.teachers}
          renderCard={(user) => (
            <TeacherCard
              user={user}
              onReview={() => this.onUserReviews()}
              onSchedule={() => this.onUserSchedule()}
            />
          )}
          cardIndex={0}
          stackSize={2}
          showSecondCard
          animateOverlayLabelsOpacity
          stackSeparation={0}
          // style
          backgroundColor={'transparent'}
          cardHorizontalMargin={16}
          cardVerticalMargin={16}
          cardStyle={styles.cardSwiper}
        />
      </View>
    );
  }

  renderItem(item, index) {
    return (
      <View style={[styleUtil.withShadow(14, 0.6), styles.viewBadgeItem]}>
        {/* icon */}
        <ImageScale
          width={36}
          source={require('../../../assets/imgs/ic_badge.png')}
        />

        <View style={styles.viewItemContent}>
          <Text style={styles.txtBadge}>US Pro-Dancer Championships</Text>

          <View style={styles.viewItemBottom}>
            {/* date */}
            <Text style={styles.txtBadgeDate}>10 Oct 2020</Text>

            {/* category */}
            <View style={styles.viewBadgeCategory}>
              <Text style={styles.txtBadgeCategory}>Challenge</Text>
            </View>
          </View>
        </View>
      </View>
    );
  }

  onUserReviews() {
    // go to reviews page
    this.props.navigation.push(Reviews.NAV_NAME);
  }

  onUserSchedule() {
    // go to reviews page
    this.props.navigation.push(ScheduleSelect.NAV_NAME);
  }
}
