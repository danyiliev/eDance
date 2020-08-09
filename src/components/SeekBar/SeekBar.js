import React, {Component} from 'react';

import {
  View,
  Text,
  StyleSheet,
  Image,
  Slider,
  TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';
import {stylesApp} from '../../styles/app.style';
import {styles} from './styles';

function pad(n, width, z = 0) {
  n = n + '';
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}

const minutesAndSeconds = (position) => ([
  pad(Math.floor(position / 60), 2),
  pad(position % 60, 2),
]);

export default class SeekBar extends React.Component {
  static propTypes = {
    trackLength: PropTypes.number,
    currentPosition: PropTypes.number,
    onSeek: PropTypes.func,
    onSlidingStart: PropTypes.func,
  };

  render() {
    const elapsed = minutesAndSeconds(this.props.currentPosition);
    const remaining = minutesAndSeconds(
      this.props.trackLength - this.props.currentPosition,
    );

    return (
      <View style={styles.viewContainer}>
        <View style={stylesApp.flexRow}>
          <Text style={[styles.text]}>{elapsed[0] + ':' + elapsed[1]}</Text>
          <View style={{flex: 1}} />
          <Text style={[styles.text, {width: 40}]}>
            {this.props.trackLength > 1 &&
              '-' + remaining[0] + ':' + remaining[1]}
          </Text>
        </View>
        <Slider
          maximumValue={Math.max(
            this.props.trackLength,
            1,
            this.props.currentPosition + 1,
          )}
          onSlidingStart={this.props.onSlidingStart}
          onSlidingComplete={this.props.onSeek}
          value={this.props.currentPosition}
          thumbStyle={styles.thumb}
          trackStyle={styles.track}
        />
      </View>
    );
  }
}
