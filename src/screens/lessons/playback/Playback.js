import React from 'react';
import {connect} from 'react-redux';
import {User} from '../../../models/user.model';
import {Alert, View} from 'react-native';
import {styles} from './styles';
import {NodePlayerView} from 'react-native-nodemediaclient';
import RateModal from '../../../components/RateModal/RateModal';
import BaseLesson from '../base-lesson';
import {config} from '../../../helpers/config';
import Toast from 'react-native-simple-toast';
import {ApiService} from '../../../services';
import {Lesson} from '../../../models/lesson.model';

class Playback extends BaseLesson {
  static NAV_NAME = 'playback';

  static STATUS_CONNECTING = 1000;
  static STATUS_SUCCESS = 1001;
  static STATUS_FAIL = 1002;
  static STATUS_RESTART = 1003;
  static STATUS_CLOSED = 1004;
  static STATUS_BROKEN = 1005;

  state = {
    showRate: false,

    joinedUsers: [],
  };

  inPlaying = false;

  constructor(props) {
    super(props);

    props.navigation.setOptions({
      title: 'Lesson',
    });

    this.state.joinedUsers.push(this.currentUser);
  }

  componentWillUnmount() {
    if (this.inPlaying) {
      this.quitLesson();
    }
  }

  componentDidMount(): void {
    if (this.lesson?.status === Lesson.STATUS_DONE) {
      // check if already reviewed
      ApiService.getMyReviewToUser(this.lesson?.teacherId).then((review) => {
        if (!review) {
          // no review given, show rate modal
          this.setState({
            showRate: true,
          });
        }
      });
    }
  }

  render() {
    let liveUrl = `rtmp://${config.wowza.hostAddress}:1935/${config.wowza.applicationName}/${this.lesson?.id}`;

    return (
      <View style={styles.viewContainer}>
        <NodePlayerView
          style={styles.videoContainer}
          ref={(vp) => {
            this.vp = vp;
          }}
          inputUrl={liveUrl}
          scaleMode={'ScaleAspectFit'}
          bufferTime={300}
          maxBufferTime={1000}
          autoplay={true}
          onStatus={(code, msg) => this.onPlayStatus(code, msg)}
        />

        <View style={styles.viewIndicator}>{this.renderUsers()}</View>

        <RateModal
          visible={this.state.showRate}
          teacher={this.lesson?.teacher}
          onSave={(rating, review) => this.onSaveReview(rating, review)}
        />
      </View>
    );
  }

  async refreshTimer() {
    await super.refreshTimer();

    this.checkLessonStatus();
  }

  checkLessonStatus() {
    if (this.lesson?.status === Lesson.STATUS_DONE) {
      // show rate modal
      this.setState({
        showRate: true,
      });

      this.quitLesson();
    }
  }

  onPlayStatus(code, msg) {
    console.log('onPlayStatus', code);

    if (code === Playback.STATUS_SUCCESS) {
      Toast.show('Connected live broadcast');

      // start refreshing
      this.startRefreshTimer();

      ApiService.joinLesson(this.lesson?.id).catch((e) => console.log(e));
      this.inPlaying = true;
    } else {
      if (code < 1100) {
        this.inPlaying = false;
        // error, stop refreshing
        this.stopRefreshTimer();
      }

      if (this.lesson?.status === Lesson.STATUS_DONE) {
        // done, return directly
        return;
      }

      if (code === Playback.STATUS_CONNECTING) {
        Toast.show('Connecting live broadcast...');
      } else if (code === Playback.STATUS_FAIL) {
        Toast.show('Connection Failed');
      } else if (code === Playback.STATUS_CLOSED) {
        Toast.show('Stopped live broadcast');
      } else if (code === Playback.STATUS_BROKEN) {
        Toast.show('Connection broken');
      } else if (code === Playback.STATUS_RESTART) {
        Toast.show('Restart Connecting ...');
      }
    }
  }

  quitLesson() {
    ApiService.quitLesson(this.lesson?.id).catch((e) => console.log(e));
  }

  async onSaveReview(rating, review) {
    this.loadingHUD.show();

    try {
      await ApiService.addUserReview(this.lesson?.teacherId, this.lesson?.id, rating, review);

      this.setState({
        showRate: false,
      });

      Toast.show('Saved the review successfully');
    } catch (e) {
      console.log(e);

      Alert.alert('Failed to Save Review', e.message);
    }

    this.loadingHUD.hideAll();
  }
}

const mapStateToProps = (state) => state;

export default connect(mapStateToProps, null)(Playback);
