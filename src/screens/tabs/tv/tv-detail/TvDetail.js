import React from 'react';
import VideoPlayer from 'react-native-video-controls';

export default class TvDetail extends React.Component {
  static NAV_NAME = 'tv-detail';

  constructor(props) {
    super(props);

    // get data
    this.video = props.route.params.data;

    props.navigation.setOptions({
      title: this.video?.name,
    });
  }

  render() {
    return (
      <VideoPlayer
        source={{uri: this.video?.getVideoUrl()}}
        navigator={this.props.navigator}
        disableBack={true}
      />
    );
  }
}
