import React from 'react';
import {styles} from './styles';
import {Text, View} from 'react-native';
import {Button, Rating} from 'react-native-elements';
import {stylesApp, styleUtil} from '../../styles/app.style';
import FastImage from 'react-native-fast-image';
import {colors as colorTheme} from '../../styles/theme.style';

export default class TeacherCard extends React.Component {
  render() {
    return (
      <View style={[styleUtil.withShadow(14, 0.6), styles.viewContainer]}>
        {/* photo */}
        <FastImage
          style={styles.imgUser}
          source={require('../../../assets/imgs/user_default.png')}
          resizeMode={FastImage.resizeMode.cover}
        />

        {/* name */}
        <Text style={styles.txtName}>
          John Dancer
        </Text>

        {/* star rating */}
        <Rating
          imageSize={24}
          readonly
          startingValue={4}
          style={styles.rating}
          tintColor={colorTheme.primary}
        />

        {/* buttons */}
        <View style={styles.viewButtons}>
          {/* reviews */}
          <Button
            title="REVIEWS"
            containerStyle={[stylesApp.flex1, stylesApp.mr10]}
            buttonStyle={styles.butLightOutline}
            titleStyle={styles.titleButton}
          />

          {/* schedule */}
          <Button
            title="SCHEDULE"
            containerStyle={[stylesApp.flex1, stylesApp.ml10]}
            buttonStyle={styles.butLightOutline}
            titleStyle={styles.titleButton}
          />
        </View>

      </View>
    )
  }
}
