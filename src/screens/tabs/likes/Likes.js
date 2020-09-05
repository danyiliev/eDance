import React from 'react';
import {styles as stylesMain} from '../radio/styles';
import {styles as stylesLike, styles} from './styles';
import {FlatList, Image, Text, View} from 'react-native';
import {Utils} from '../../../helpers/utils';
import {stylesApp} from '../../../styles/app.style';
import ImageScale from 'react-native-scalable-image';
import {connect} from 'react-redux';
import LessonItem from '../../../components/LessonItem/LessonItem';
import {ApiService} from '../../../services';
import BaseLessonList from '../base-lesson-list';

class Likes extends BaseLessonList {
  static NAV_NAME = 'likes';

  state = {
    // ui
    showLoading: false,
    lessons: [],
  };

  constructor(props) {
    super(props);

    if (this.currentUser?.lessonsLikedObj) {
      this.state.lessons = this.currentUser?.lessonsLikedObj;
    }
  }

  componentDidMount(): void {
    super.componentDidMount();

    if (!this.currentUser?.lessonsLikedObj) {
      this.loadData();
    }
  }

  render() {
    return (
      <View style={stylesMain.viewContainer}>
        <FlatList
          contentContainerStyle={styles.listCtnContainer}
          keyExtractor={(item, index) => index.toString()}
          onRefresh={() => this.onRefresh()}
          refreshing={this.state.showLoading}
          data={this.state.lessons}
          renderItem={({item, index}) => this.renderItem(item, index)}
          ListEmptyComponent={() => this.renderEmptyItem()}
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
        <Text style={stylesApp.txtEmptyItem}>No liked lessons yet</Text>
      </View>
    );
  }

  onRefresh() {
    this.updateList();
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
      const lessonIds = this.currentUser?.lessonsLiked.slice(indexFrom, indexFrom + this.pageCount);

      let lessons = await ApiService.getLessonsByIds(lessonIds);
      if (indexFrom > 0) {
        // attach
        lessons = [...this.state.lessons, ...lessons];
      }

      this.currentUser.lessonsLikedObj = lessons;
      this.updateList();
    } catch (e) {
      console.log(e);
    }

    // hide loading
    this.setState({
      showLoading: false,
    });
  }

  updateList() {
    if (!this.currentUser?.lessonsLikedObj) {
      return;
    }

    this.setState({
      lessons: this.currentUser?.lessonsLikedObj,
    });

    super.updateList();
  }
}

const mapStateToProps = (state) => state;

export default connect(mapStateToProps, null)(Likes);
