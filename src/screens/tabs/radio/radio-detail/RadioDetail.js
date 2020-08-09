import React from 'react';
import Video from 'react-native-video';
import {Dimensions, Text, TouchableOpacity, View} from 'react-native';
import {stylesApp} from '../../../../styles/app.style';
import {styles} from './styles';
import FastImage from 'react-native-fast-image';
import {VideoHelper} from '../../../../helpers/video-helper';
import SeekBar from '../../../../components/SeekBar/SeekBar';
import {colors as colorTheme} from '../../../../styles/theme.style';
import {Icon} from 'react-native-elements';

export default class RadioDetail extends React.Component {
  static NAV_NAME = 'radio-detail';

  state = {
    paused: true,
    totalLength: 1,
    currentPosition: 0,
  };

  // data
  video = null;

  constructor(props) {
    super(props);

    props.navigation.setOptions({
      title: 'Radio',
    });

    // get data
    this.video = props.route.params.data;
  }

  render() {
    return (
      <View style={stylesApp.viewContainer}>
        {/* header */}
        <View style={styles.viewHeader}>
          <View style={styles.viewThumbnail}>
            <FastImage
              style={styles.imgThumbnail}
              source={VideoHelper.getHeaderImage(this.video)}
            />
          </View>
        </View>

        {/* name */}
        <Text style={styles.txtName}>{this.video?.name}</Text>

        {/* seekbar */}
        <SeekBar
          onSeek={this.seek.bind(this)}
          trackLength={this.state.totalLength}
          onSlidingStart={() => this.setState({paused: true})}
          currentPosition={this.state.currentPosition}
        />

        {/* controls */}
        <View style={styles.viewControls}>
          <TouchableOpacity disabled onPress={() => this.onBack()}>
            <Icon
              type="ionicon"
              name="md-skip-backward"
              size={24}
              color={colorTheme.grey}
            />
          </TouchableOpacity>

          {!this.state.paused ? (
            <TouchableOpacity onPress={() => this.onPressPause()}>
              <View style={styles.viewButPlay}>
                <Icon
                  type="ionicon"
                  name="md-pause"
                  size={32}
                  color={colorTheme.primary}
                />
              </View>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={() => this.onPressPlay()}>
              <View style={styles.viewButPlay}>
                <Icon
                  type="ionicon"
                  name="md-play"
                  size={32}
                  color={colorTheme.primary}
                />
              </View>
            </TouchableOpacity>
          )}

          <TouchableOpacity disabled={true}>
            <Icon
              type="ionicon"
              name="md-skip-forward"
              size={24}
              color={colorTheme.grey}
            />
          </TouchableOpacity>
        </View>

        <Video
          source={{uri: this.video?.getVideoUrl()}} // Can be a URL or a local file.
          ref="audioElement"
          playInBackground={true}
          playWhenInactive={true}
          paused={this.state.paused} // Pauses playback entirely.
          resizeMode="cover" // Fill the whole screen at aspect ratio.
          repeat={true} // Repeat forever.
          onLoad={this.setDuration.bind(this)} // Callback when video loads
          onProgress={this.setTime.bind(this)} // Callback every ~250ms with currentTime
          onError={(data) => this.onError(data)} // Callback when video cannot be loaded
          style={styles.video}
        />
      </View>
    );
  }

  setDuration(data) {
    console.log('setDuration: ', data);

    this.setState({totalLength: Math.floor(data.duration)});
  }

  setTime(data) {
    this.setState({currentPosition: Math.floor(data.currentTime)});
  }

  seek(time) {
    time = Math.round(time);

    this.refs.audioElement && this.refs.audioElement.seek(time);
    this.setState({
      currentPosition: time,
      paused: false,
    });
  }

  onError(data) {
    console.log('Error loading video: ', data);
  }

  onPressPlay() {
    this.setState({paused: false});
  }

  onPressPause() {
    this.setState({paused: true});
  }
}
