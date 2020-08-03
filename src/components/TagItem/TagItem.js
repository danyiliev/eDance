import React from 'react';
import PropTypes from 'prop-types';
import {Text, View} from 'react-native';
import {styles} from './styles';

export default class TagItem extends React.Component {
  static propTypes = {
    text: PropTypes.string,
    containerStyle: PropTypes.object,
  };

  render() {
    return (
      <View style={[styles.viewContainer, this.props.containerStyle]}>
        <Text style={styles.txtMain}>{this.props.text}</Text>
      </View>
    );
  }
}
