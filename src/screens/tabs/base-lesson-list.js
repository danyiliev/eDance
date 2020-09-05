import React from 'react';
import {ApiService} from '../../services';
import Toast from 'react-native-simple-toast';
import LessonPlayback from '../lessons/lesson-playback/LessonPlayback';
import Profile from '../profile/Profile';

export default class BaseLessonList extends React.Component {
  currentUser = null;
  pageCount = 20;

  constructor(props) {
    super(props);

    this.currentUser = props.UserReducer.user;
  }

  componentDidMount(): void {
    this._sub = this.props.navigation.addListener(
      'focus',
      this._componentFocused
    );
  }

  componentWillUnmount(): void {
    this._sub();
  }

  _componentFocused = () => {
    this.updateList();
  };

  async onLike(lesson) {
    // add to liked list
    try {
      const isLike = !this.currentUser?.isLessonLiked(lesson.id);
      await ApiService.likeLesson(lesson.id, isLike);

      if (isLike) {
        this.currentUser?.likeLesson(lesson);
      } else {
        this.currentUser?.unlikeLesson(lesson);
      }

      this.updateList();
    } catch (e) {
      console.log(e);

      Toast.show(e.message);
    }
  }

  onItem(lesson) {
    // check if lesson is purchased
    if (!this.currentUser?.isLessonPurchased(lesson.id)) {
      return;
    }

    // go to lesson detail page
    this.props.navigation.push(LessonPlayback.NAV_NAME, {
      lesson: lesson,
    });
  }

  async updateList() {
    const {lessons} = this.state;

    this.setState({lessons: []});
    this.setState({lessons});
  }

  onEndReached() {
    // smaller than one page, no need to load again
    if (this.state.lessons.length < this.pageCount) {
      return;
    }

    this.loadData(true);
  }

  onTeacher(lesson) {
    // go to teacher profile page
    this.props.navigation.push(Profile.NAV_NAME, {
      user: lesson.teacher,
    });
  }
}
