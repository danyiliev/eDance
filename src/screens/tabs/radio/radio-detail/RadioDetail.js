import React from 'react';
import RNVideo from 'react-native-video';
import {Dimensions, Text, TouchableOpacity, View} from 'react-native';
import {stylesApp} from '../../../../styles/app.style';
import {styles} from './styles';
import FastImage from 'react-native-fast-image';
import {VideoHelper} from '../../../../helpers/video-helper';
import SeekBar from '../../../../components/SeekBar/SeekBar';
import {colors as colorTheme} from '../../../../styles/theme.style';
import {Icon} from 'react-native-elements';
import {LoadingHUD} from 'react-native-hud-hybrid';
import {setRadios, setTvs} from '../../../../actions/radio';
import {connect} from 'react-redux';
import {ApiService} from '../../../../services';
import {config} from '../../../../helpers/config';
import {Video} from '../../../../models/video.model';

class RadioDetail extends React.Component {
  static NAV_NAME = 'radio-detail';

  state = {
    paused: true,
    totalLength: 1,
    currentPosition: 0,

    currentIndex: 0,
  };

  constructor(props) {
    super(props);

    props.navigation.setOptions({
      title: 'Radio',
    });

    // get data
    if (props.route.params) {
      this.state.currentIndex = props.route.params.index;
    }

    this.loadingHUD = new LoadingHUD();
  }

  componentDidMount(): void {
    // show loading
    this.loadingHUD.show();
  }

  render() {
    const video = this.getCurrentVideo();

    return (
      <View style={stylesApp.viewContainer}>
        {/* header */}
        <View style={styles.viewHeader}>
          <View style={styles.viewThumbnail}>
            <FastImage style={styles.imgThumbnail} source={VideoHelper.getHeaderImage(video)} />
          </View>
        </View>

        {/* name */}
        <Text style={styles.txtName}>{video?.name}</Text>

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

        <RNVideo
          source={{uri: video?.getVideoUrl()}} // Can be a URL or a local file.
          ref="audioElement"
          playInBackground={true}
          playWhenInactive={true}
          paused={this.state.paused} // Pauses playback entirely.
          resizeMode="cover" // Fill the whole screen at aspect ratio.
          onLoad={this.setDuration.bind(this)} // Callback when video loads
          onLoadStart={this.onStartLoad.bind(this)}
          onProgress={this.setTime.bind(this)} // Callback every ~250ms with currentTime
          onError={(data) => this.onError(data)} // Callback when video cannot be loaded
          onEnd={() => this.onEndPlay()}
          style={styles.video}
        />
      </View>
    );
  }

  getCurrentVideo() {
    const {radios} = this.props.RadioReducer;
    if (this.state.currentIndex >= radios.length) {
      return null;
    }

    return radios[this.state.currentIndex];
  }

  onStartLoad(data) {
    this.loadingHUD.show();

    // init
    this.setState({
      paused: true,
      totalLength: 1,
      currentPosition: 0,
    });
  }

  setDuration(data) {
    this.loadingHUD.hideAll();
    console.log('setDuration: ', data);

    // play
    this.setState({
      paused: false,
      totalLength: Math.floor(data.duration),
    });
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

    this.loadingHUD.hideAll();
  }

  onPressPlay() {
    this.setState({paused: false});
  }

  onPressPause() {
    this.setState({paused: true});
  }

  async onEndPlay() {
    const {radios} = this.props.RadioReducer;

    let currentIndex = this.state.currentIndex + 1;

    // load next page if one page is over
    if (currentIndex >= radios.length) {
      this.loadingHUD.show();

      // load data again
      try {
        let channels = await ApiService.getVideos(radios.length, config.radioPageCount, Video.TYPE_RADIO);
        // attach
        channels = [...radios, ...channels];

        this.props.setRadios(channels);
      } catch (e) {
        console.log(e);
      }

      this.loadingHUD.hideAll();
    }

    // play next video
    currentIndex = currentIndex % this.props.RadioReducer.radios.length;

    this.setState({currentIndex: currentIndex});
  }
}

const mapStateToProps = (state) => state;
const mapDispatchToProps = {
  setRadios,
};

export default connect(mapStateToProps, mapDispatchToProps)(RadioDetail);
