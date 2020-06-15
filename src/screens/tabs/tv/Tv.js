import React from 'react';
import DismissKeyboard from '../../../components/DismissKeyboard/DismissKeyboard';
import {styles as stylesMain} from '../radio/styles';
import {View} from 'react-native';

export default class Tv extends React.Component {
  static NAV_NAME = 'tv';

  render() {
    return (
      <DismissKeyboard>
        <View style={stylesMain.viewContainer}>
        </View>
      </DismissKeyboard>
    );
  }
}
