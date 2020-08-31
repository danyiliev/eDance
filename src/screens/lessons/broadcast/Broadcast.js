import React from 'react';
import {connect} from 'react-redux';
import {View, AppState, Alert, Image, Text} from 'react-native';
import {styles} from './styles';
import {NodeCameraView} from 'react-native-nodemediaclient';
import {LoadingHUD} from 'react-native-hud-hybrid';
import {Utils} from '../../../helpers/utils';
import {Button, Icon} from 'react-native-elements';
import {stylesApp} from '../../../styles/app.style';
import Toast from 'react-native-simple-toast';
import {UserHelper} from '../../../helpers/user-helper';
import FastImage from 'react-native-fast-image';
import {config} from '../../../helpers/config';
import {ApiService} from '../../../services';
import BaseLesson from '../base-lesson';

class Broadcast extends BaseLesson {
  static NAV_NAME = 'broadcast';

  static STATUS_CONNECTING = 2000;
  static STATUS_SUCCESS = 2001;
  static STATUS_FAIL = 2002;
  static STATUS_CLOSED = 2004;
  static STATUS_BROKEN = 2005;

  _isMounted = false;
  stream = null;

  state = {
    isRecording: false,
    isConnecting: false,

    // record time
    duration: 0,

    joinedUsers: [],
  };

  constructor(props) {
    super(props);

    props.navigation.setOptions({
      title: 'Broadcast Lesson',
    });
  }

  componentDidMount() {
    this._isMounted = true;

    AppState.addEventListener('change', this._handleAppStateChange);
  }

  componentWillUnmount() {
    this._isMounted = false;
    console.log('componentWillUnmount - Broadcast');

    AppState.removeEventListener('change', this._handleAppStateChange);

    // stop live
    this.stopBroadcast();
    this.cleanTimer();
  }

  _handleAppStateChange = (nextAppState) => {
    console.log(nextAppState);
  };

  render() {
    let outputUrl = `rtmp://${config.wowza.username}:${config.wowza.password}@${config.wowza.hostAddress}:1935/${config.wowza.applicationName}/${this.lesson?.id}`;

    return (
      <View style={styles.viewContainer}>
        <NodeCameraView
          style={styles.videoContainer}
          ref={(vb) => {
            this.vb = vb;
          }}
          outputUrl={outputUrl}
          camera={{
            cameraId: 0,
            cameraFrontMirror: true,
          }}
          audio={{
            bitrate: 32000,
            profile: 1,
            samplerate: 44100,
          }}
          video={{
            preset: 12,
            bitrate: 400000,
            profile: 1,
            fps: 15,
            videoFrontMirror: false,
          }}
          autopreview={true}
          onStatus={(code, msg) => this.onBroadcast(code, msg)}
        />

        {/* camera reverse */}
        <Button
          containerStyle={styles.butCtnReverse}
          buttonStyle={styles.butReverse}
          icon={
            <Image
              source={require('../../../../assets/imgs/ic_camera_reverse.png')}
              style={styles.imgButReverse}
            />
          }
          onPress={() => this.onCameraReverse()}
        />

        {/* live indicator */}
        {this.state.isRecording ? (
          <View style={styles.viewIndicator}>
            <View style={styles.viewIndicatorLive}>
              <Icon type="font-awesome" name="rss" size={14} iconStyle={{...styles.iconIndicator}} />
              <Text style={styles.textIndicator}>Live Now</Text>
            </View>

            {/* time */}
            <View style={styles.viewIndicatorTime}>
              <Text style={styles.textIndicator}>{this.durationFormatted()}</Text>
            </View>

            {this.renderUsers()}
          </View>
        ) : null}

        <Button
          title={this.state.isRecording ? 'Stop Livestream' : 'Start Livestream'}
          disabled={this.state.isConnecting}
          containerStyle={styles.ctnButStart}
          disabledStyle={[stylesApp.butPrimary, stylesApp.semiTrans]}
          buttonStyle={stylesApp.butPrimary}
          onPress={() => this.onButStart()}
        />
      </View>
    );
  }

  onButStart() {
    // start/stop broadcasting
    let {isRecording} = this.state;
    if (isRecording) {
      this.stopBroadcast();
    } else {
      Alert.alert(
        'Are you ready to start lesson?',
        'The live streaming will be recorded automatically right after startup',
        [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          {text: 'Yes', onPress: () => this.onStart()},
        ],
        {cancelable: true},
      );
    }
  }

  onStart() {
    this.vb.start();
    this.startRefreshTimer();
  }

  async onBroadcast(code, msg) {
    const that = this;
    console.log('onBroadcast', code);

    if (code === Broadcast.STATUS_CONNECTING) {
      // show loading
      this.loadingHUD.show('Connecting live broadcast...');

      this.setState({isConnecting: true});
    } else {
      let isRecording = false;

      if (code === Broadcast.STATUS_SUCCESS) {
        Toast.show('Started streaming broadcast');

        // set confirm param
        this.props.navigation.setParams({
          onBack: () => this.onBack(),
        });

        isRecording = true;

        this.timer = setInterval(() => {
          this.onRecordTimer();
        }, 1000);

        // start
        ApiService.startLesson(this.lesson?.id).catch((e) => console.log(e));
      } else {
        //  clear back process
        this.props.navigation.setParams({
          onBack: null,
        });

        if (code === Broadcast.STATUS_FAIL) {
          Toast.show('Failed streaming broadcast');
        } else if (code === Broadcast.STATUS_CLOSED) {
          Toast.show('Stopped live broadcast');

          // go back to prev page
          this.props.navigation.pop();

        } else if (code === Broadcast.STATUS_BROKEN) {
          Toast.show('Live broadcast broken');
        }

        this.cleanTimer();
      }

      // don't do this after page is destroyed
      this.setState({
        duration: 0,
        isRecording: isRecording,
        isConnecting: false,
      });

      // hide loading
      this.loadingHUD.hideAll();
    }
  }

  cleanTimer() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }

  stopBroadcast() {
    this.vb.stop();

    // stop refreshing
    this.stopRefreshTimer();

    // start
    ApiService.stopLesson(this.lesson?.id).catch((e) => console.log(e));
  }

  onRecordTimer() {
    let {duration} = this.state;

    if (this._isMounted) {
      this.setState({
        duration: ++duration,
      });
    }
  }

  durationFormatted() {
    const hour = Math.floor(this.state.duration / 3600);
    const min = Math.floor((this.state.duration % 3600) / 60);
    const sec = (this.state.duration % 3600) % 60;

    return `${Utils.leftPad(hour, 2)}:${Utils.leftPad(min, 2)}:${Utils.leftPad(sec, 2)}`;
  }

  onBack() {
    const that = this;

    Alert.alert(
      'Do you want to stop the current lesson?',
      'The broadcasting will be stopped when you confirm to go back',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: () => {
            // clear confirm param
            that.props.navigation.setParams({
              onBack: null,
            });

            // back to prev page
            that.props.navigation.goBack();
          },
        },
      ],
      {cancelable: true},
    );
  }

  onCameraReverse() {
    this.vb.switchCamera();
  }
}

const mapStateToProps = (state) => state;

export default connect(mapStateToProps, null)(Broadcast);
