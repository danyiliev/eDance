import React from 'react';
import DismissKeyboard from '../../../components/DismissKeyboard/DismissKeyboard';
import {styles} from './styles';
import {View} from 'react-native';

export default class Radio extends React.Component {
  static NAV_NAME = 'radio';

  render() {
    return (
      <DismissKeyboard>
        <View style={styles.viewContainer}>
        </View>
      </DismissKeyboard>
    );
  }
}
