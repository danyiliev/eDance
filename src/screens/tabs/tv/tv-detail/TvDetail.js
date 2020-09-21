import React from 'react';
import VideoPlayer from 'react-native-video-controls';

export default class TvDetail extends React.Component {
  static NAV_NAME = 'tv-detail';

  state = {
    currentIndex: 0,
  };

  videos = [];

  constructor(props) {
    super(props);

    // get data
    if (props.route.params) {
      this.videos = props.route.params.videos;
      this.state.currentIndex = props.route.params.index;
    }

    this.setTitle();
  }

  render() {
    return (
      <VideoPlayer
        source={{uri: this.videos[this.state.currentIndex]?.getVideoUrl()}}
        navigator={this.props.navigator}
        disableBack={true}
        onEnd={() => this.onEndPlay()}
      />
    );
  }

  setTitle() {
    this.props.navigation.setOptions({
      title: this.videos[this.state.currentIndex].name,
    });
  }

  onEndPlay() {
    // play next video
    let {currentIndex} = this.state;
    currentIndex = (currentIndex + 1) % this.videos.length;

    this.setState({currentIndex}, () => {
      // update title
      this.setTitle();
    });
  }
}
