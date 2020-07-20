import React from 'react';
import {stylesApp, styleUtil} from '../../styles/app.style';
import {FlatList, Image, Text, View} from 'react-native';
import {styles} from './styles';
import {styles as stylesCard} from '../../components/TeacherCard/styles';
import {styles as stylesLikes} from '../tabs/likes/styles';
import {Utils} from '../../helpers/utils';
import FastImage from 'react-native-fast-image';
import {Button} from 'react-native-elements';
import StarRating from 'react-native-star-rating';
import {colors as colorTheme} from '../../styles/theme.style';
import ScheduleSelect from '../schedule/ScheduleSelect';

export default class Reviews extends React.Component {
  static NAV_NAME = 'reviews';

  constructor(props) {
    super(props);

    props.navigation.setOptions({
      title: 'John Dancer',
    });
  }

  render() {
    return (
      <View style={stylesApp.viewContainer}>
        <FlatList
          keyExtractor={(item, index) => index.toString()}
          data={Utils.makeEmptyArray(10)}
          renderItem={({item, index}) => this.renderItem(item, index)}
          ListHeaderComponent={() => this.renderHeader()}
          contentContainerStyle={styles.containerList}
        />
      </View>
    );
  }

  renderHeader() {
    return (
      <View style={styles.viewHeader}>
        {/* photo */}
        <FastImage
          style={styles.imgUser}
          source={require('../../../assets/imgs/user_default.png')}
          resizeMode={FastImage.resizeMode.cover}
        />

        {/* schedule */}
        <Button
          title="SCHEDULE"
          containerStyle={styles.ctnButSchedule}
          buttonStyle={stylesCard.butLightOutline}
          titleStyle={stylesCard.titleButton}
          onPress={() => this.onSchedule()}
        />
      </View>
    );
  }

  renderItem(item, index) {
    return (
      <View style={styles.viewItem}>
        <View style={stylesLikes.viewItemImage}>
          {/* image */}
          <Image
            style={styles.imgItem}
            source={require('../../../assets/imgs/lesson_default.png')}
          />

          {/* length */}
          <View style={stylesLikes.viewTxtLength}>
            <Text style={stylesLikes.txtLength}>01:32</Text>
          </View>
        </View>

        {/* content */}
        <View style={stylesLikes.viewItemContent}>
          <View style={styles.viewItemRating}>
            <StarRating
              maxStars={5}
              fullStarColor={colorTheme.primary}
              emptyStarColor={'#ACB1C0'}
              emptyStar={'star'}
              starStyle={styles.star}
              starSize={16}
              rating={4}
            />

            {/* date */}
            <Text style={styles.txtDate}>May 29, 2017</Text>
          </View>

          {/* title */}
          <Text style={styles.txtTitle}>Wendy Watson</Text>

          {/* body */}
          <Text style={styles.txtBody}>
            Anim cillum dolore irure dolor incididunt labore. Dolor et ...
          </Text>
        </View>
      </View>
    );
  }

  onSchedule() {
    // go to schedule page
    this.props.navigation.push(ScheduleSelect.NAV_NAME);
  }
}
