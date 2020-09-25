import React from 'react';
import VideoPlayer from 'react-native-video-controls';
import {setTvs} from '../../../../actions/radio';
import {connect} from 'react-redux';
import {LoadingHUD} from 'react-native-hud-hybrid';
import {ApiService} from '../../../../services';
import {Video} from '../../../../models/video.model';
import {config} from '../../../../helpers/config';

class TvDetail extends React.Component {
  static NAV_NAME = 'tv-detail';

  state = {
    currentIndex: 0,
  };

  constructor(props) {
    super(props);

    // get data
    if (props.route.params) {
      this.state.currentIndex = props.route.params.index;
    }

    this.setTitle();

    this.loadingHUD = new LoadingHUD();
  }

  render() {
    return (
      <VideoPlayer
        source={{uri: this.getCurrentVideo()?.getVideoUrl()}}
        navigator={this.props.navigator}
        disableBack={true}
        onEnd={() => this.onEndPlay()}
      />
    );
  }

  getCurrentVideo() {
    const {tvs} = this.props.RadioReducer;
    if (this.state.currentIndex >= tvs.length) {
      return null;
    }

    return tvs[this.state.currentIndex];
  }

  setTitle() {
    this.props.navigation.setOptions({
      title: this.getCurrentVideo()?.name,
    });
  }

  async onEndPlay() {
    const {tvs} = this.props.RadioReducer;

    let currentIndex = this.state.currentIndex + 1;

    // load next page if one page is over
    if (currentIndex >= tvs.length) {
      this.loadingHUD.show();

      // load data again
      try {
        let channels = await ApiService.getVideos(tvs.length, config.radioPageCount, Video.TYPE_TV);
        // attach
        channels = [...tvs, ...channels];

        this.props.setTvs(channels);
      } catch (e) {
        console.log(e);
      }

      this.loadingHUD.hideAll();
    }

    // play next video
    currentIndex = currentIndex % this.props.RadioReducer.tvs.length;

    this.setState({currentIndex}, () => {
      // update title
      this.setTitle();
    });
  }
}

const mapStateToProps = (state) => state;
const mapDispatchToProps = {
  setTvs,
};

export default connect(mapStateToProps, mapDispatchToProps)(TvDetail);
