import React from 'react';
import {FlatList, Text, TouchableOpacity, View} from 'react-native';
import {stylesApp} from '../../styles/app.style';
import {styles} from './styles';
import {Utils} from '../../helpers/utils';
import FastImage from 'react-native-fast-image';
import {Icon} from 'react-native-elements';
import {colors as colorTheme} from '../../styles/theme.style';
import Chat from '../chat/Chat';
import {setUserInfo} from '../../actions/user';
import {connect} from 'react-redux';
import {ApiService} from '../../services';
import {Video} from '../../models/video.model';
import {LessonHelper} from '../../helpers/lesson-helper';
import {UserHelper} from '../../helpers/user-helper';
import LessonDetail from './lesson-detail/LessonDetail';

class Lessons extends React.Component {
  static NAV_NAME = 'lessons';

  pageCount = 20;

  state = {
    // ui
    showLoading: false,

    // data
    lessons: [],
  };

  currentUser = null;

  constructor(props) {
    super(props);

    props.navigation.setOptions({
      title: 'My Lessons',
    });

    this.currentUser = props.UserReducer.user;
  }

  componentDidMount(): void {
    if (this.currentUser.lessons) {
      this.setState({
        lessons: this.currentUser.lessons,
      });
    } else {
      this.loadData();
    }
  }

  render() {
    return (
      <View style={stylesApp.viewContainer}>
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
        <Text style={stylesApp.textEmptyItem}>No lessons available yet</Text>
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

              {/* status */}
              {item.isClosed() ? (
                <View style={styles.viewItemStatus}>
                  <Text style={styles.txtBadge}>Closed</Text>
                </View>
              ) : null}
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
      let lessons = await ApiService.getLessons(this.currentUser.id, indexFrom, this.pageCount);

      if (indexFrom > 0) {
        // attach
        lessons = [...this.state.lessons, ...lessons];
      }

      this.setState({lessons});
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
