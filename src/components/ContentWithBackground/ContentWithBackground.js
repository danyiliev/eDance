import React from 'react';
import {View, Dimensions} from 'react-native';
import {styles} from './styles';
import ImageScale from 'react-native-scalable-image';
const {width: WindowWidth} = Dimensions.get('window');

export default class ContentWithBackground extends React.Component {
  render() {
    return (
      <View style={[styles.viewContainer, this.props.style]}>
        <View style={styles.viewBackground}>
          {/* background */}
          <ImageScale
            width={WindowWidth}
            style={styles.imgBg}
            source={require('../../../assets/imgs/bg_login.png')}
          />
        </View>

        {this.props.children}
      </View>
    );
  }
}
