import React from 'react';
import {connect} from 'react-redux';
import {User} from '../../../models/user.model';
import {View} from 'react-native';
import {styles} from './styles';
import { NodePlayerView } from 'react-native-nodemediaclient';
import RateModal from '../../../components/RateModal/RateModal';

class Playback extends React.Component {
  static NAV_NAME = 'playback';

  state = {
    showRate: false,
  };

  currentUser: User;

  constructor(props) {
    super(props);

    props.navigation.setOptions({
      title: 'Lesson',
    });
  }

  render() {
    // let liveUrl = `rtmp://${config.wowza.hostAddress}:1935/${this.video.getApplicationName()}/${this.video.streamName}`;
    let liveUrl = `rtmp://192.168.0.90`;

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

        <RateModal
          visible={this.state.showRate}
        />
      </View>
    );
  }

  onPlayStatus(code, msg) {
    console.log('onPlayStatus');
    console.log(code.nativeEvent);
  }
}

const mapStateToProps = (state) => state;

export default connect(mapStateToProps, null)(Playback);
