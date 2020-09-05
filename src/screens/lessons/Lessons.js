import React from 'react';
import {FlatList, Text, TouchableOpacity, View} from 'react-native';
import {stylesApp} from '../../styles/app.style';
import {styles} from './styles';
import {Utils} from '../../helpers/utils';
import FastImage from 'react-native-fast-image';
import {ButtonGroup, Icon} from 'react-native-elements';
import {colors as colorTheme} from '../../styles/theme.style';
import Chat from '../chat/Chat';
import {setUserInfo} from '../../actions/user';
import {connect} from 'react-redux';
import {ApiService} from '../../services';
import {User} from '../../models/user.model';
import {Lesson} from '../../models/lesson.model';
import {LessonHelper} from '../../helpers/lesson-helper';
import {UserHelper} from '../../helpers/user-helper';
import LessonDetail from './lesson-detail/LessonDetail';
import {styles as stylesSignup} from '../signup/styles';

class Lessons extends React.Component {
  static NAV_NAME = 'lessons';

  pageCount = 20;

  state = {
    // ui
    showLoading: false,
    menuIndex: 0,

    // data
    lessons: [],
  };

  menus = ['Lessons to Teach', 'Lessons to Attend'];

  currentUser = null;

  constructor(props) {
    super(props);

    props.navigation.setOptions({
      title: 'My Lessons',
    });

    this.currentUser = props.UserReducer.user;
  }

  componentDidMount(): void {
    this.onChangeTab(0);
  }

  render() {
    return (
      <View style={stylesApp.viewContainer}>
        {this.currentUser?.type === User.TYPE_TEACHER ? (
          <ButtonGroup
            containerStyle={styles.ctnSegment}
            buttons={this.menus}
            textStyle={stylesSignup.txtSegment}
            innerBorderStyle={stylesSignup.borderSegment}
            selectedButtonStyle={stylesSignup.butSegmentSelected}
            selectedTextStyle={stylesSignup.SegmentSelected}
            selectedIndex={this.state.menuIndex}
            onPress={(index) => this.onChangeTab(index)}
          />
        ) : null}

        <FlatList
          contentContainerStyle={styles.listCtnContainer}
          keyExtractor={(item, index) => index.toString()}
          data={this.state.lessons}
          ListEmptyComponent={() => this.renderEmptyItem()}
          renderItem={({item, index}) => this.renderItem(item, index)}
          onRefresh={() => this.onRefresh()}
          refreshing={this.state.showLoading}
          onEndReached={() => this.onEndReached()}
          onEndReachedThreshold={3}
        />
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
        <Text style={stylesApp.txtEmptyItem}>No lessons available yet</Text>
      </View>
    );
  }

  renderItem(item, index) {
    const targetUser = LessonHelper.getTargetUser(item, this.currentUser);

    return (
      <TouchableOpacity activeOpacity={0.7} onPress={() => this.onItem(index)}>
        <View style={styles.viewItem}>
          {/* photo */}
          <FastImage
            style={styles.imgUser}
            source={UserHelper.getUserImage(targetUser)}
            resizeMode={FastImage.resizeMode.cover}
          />

          <View style={styles.viewItemBody}>
            <View style={styles.viewName}>
              {/* name */}
              <Text style={styles.txtName}>{targetUser.getFullName()}</Text>

              {this.renderLessonStatus(item)}
            </View>

            {/* text */}
            <Text style={styles.txtMessage}>{item.simpleDescription()}</Text>

            <View style={styles.viewDate}>
              <Text style={styles.txtDate}>
                <Text style={styles.txtLabel}>Date:</Text> {item.date}
              </Text>
              <Text style={[styles.txtDate, stylesApp.mt4]}>
                <Text style={styles.txtLabel}>Time:</Text> {item.timeToString()}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  renderLessonStatus(lesson) {
    if (lesson.isClosed()) {
      return (
        <View style={styles.viewItemStatus}>
          <Text style={styles.txtBadge}>Closed</Text>
        </View>
      );
    } else if (lesson.status === Lesson.STATUS_LIVE) {
      return (
        <View style={styles.viewItemStatus}>
          <Text style={[styles.txtBadge, styles.txtBadgeGreen]}>Live</Text>
        </View>
      );
    }

    return null;
  }

  async onChangeTab(index) {
    try {
      await this.setState({menuIndex: index});

      if (index === 0 && this.currentUser.type === User.TYPE_TEACHER) {
        await this.setState({
          lessons: this.currentUser.lessonsTeach ?? [],
        });
      } else {
        await this.setState({
          lessons: this.currentUser.lessonsAttend ?? [],
        });
      }

      this.loadData();
    } catch (e) {
      console.log(e);
    }
  }

  onItem(index) {
    // go to lesson detail page
    this.props.navigation.push(LessonDetail.NAV_NAME, {
      lesson: this.state.lessons[index],
    });
  }

  async loadData(continued = false) {
    let indexFrom = 0;

    if (!continued) {
      // show loading mark
      this.setState({
        showLoading: true,
      });
    } else {
      indexFrom = this.state.lessons.length;
    }

    try {
      let lessons = await ApiService.getLessons(
        this.currentUser.id,
        this.state.menuIndex === 0 && this.currentUser.type === User.TYPE_TEACHER,
        indexFrom,
        this.pageCount,
      );

      if (indexFrom > 0) {
        // attach
        lessons = [...this.state.lessons, ...lessons];
      }

      this.setState({lessons});

      if (this.state.menuIndex === 0 && this.currentUser.type === User.TYPE_TEACHER) {
        this.currentUser.lessonsTeach = lessons;
      } else {
        this.currentUser.lessonsAttend = lessons;
      }
    } catch (e) {
      console.log(e);
    }

    this.setState({
      showLoading: false,
    });
  }

  onEndReached() {
    // smaller than one page, no need to load again
    if (this.state.lessons.length < this.pageCount) {
      return;
    }

    this.loadData(true);
  }

  onRefresh() {
    this.loadData();
  }
}

const mapStateToProps = (state) => state;

export default connect(mapStateToProps, null)(Lessons);
