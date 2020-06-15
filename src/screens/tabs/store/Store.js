import React from 'react';
import {styles as stylesMain} from '../radio/styles';
import {View} from 'react-native';

export default class Store extends React.Component {
  static NAV_NAME = 'store';

  render() {
    return (
      <View style={stylesMain.viewContainer}>
      </View>
    );
  }
}
