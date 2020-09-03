import React from 'react';
import VideoPlayer from 'react-native-video-controls';
import {config} from '../../../helpers/config';
import {connect} from 'react-redux';

class LessonPlayback extends React.Component {
  static NAV_NAME = 'lesson-playback';

  lesson = null;

  constructor(props) {
    super(props);

    // get data
    if (props.route.params) {
      this.lesson = props.route.params.lesson;
    }

    props.navigation.setOptions({
      title: 'Lesson Playback',
    });
  }

  render() {
    const videoUrl = `${config.lessonPrefix}/${this.lesson.id}.mp4`;

    return (
      <VideoPlayer
        source={{uri: videoUrl}}
        navigator={this.props.navigator}
        disableBack={true}
      />
    );
  }
}

const mapStateToProps = (state) => state;

export default connect(mapStateToProps, null)(LessonPlayback);
