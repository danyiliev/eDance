import React from 'react';
import PropTypes from 'prop-types';
import {View} from 'react-native';
import {styles} from './styles';
import {Icon} from 'react-native-elements';
import FastImage from 'react-native-fast-image';
import {colors as colorTheme} from '../../styles/theme.style';

export default class PostImage extends React.Component {
  static propTypes = {
    containerStyle: PropTypes.object,
    imageStyle: PropTypes.object,
    imgUrl: PropTypes.string,
    iconSize: PropTypes.number,
  };

  render() {
    let iconSize = this.props.iconSize || 120;
    if (this.props.containerStyle?.width) {
      iconSize = this.props.containerStyle?.width / 3;
    }

    return (
      <View style={[styles.viewImage, this.props.containerStyle]}>
        {/* background */}
        <Icon
          color={'#cecece'}
          type="font-awesome"
          name="picture-o"
          size={iconSize}
        />

        <FastImage
          style={[styles.imgPost, this.props.imageStyle]}
          source={{uri: this.props.imgUrl}}
          resizeMode={FastImage.resizeMode.cover}
        />
      </View>
    );
  }
}
