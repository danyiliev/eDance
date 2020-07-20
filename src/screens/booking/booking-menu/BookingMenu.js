import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {styles} from './styles';
import ContentWithBackground from '../../../components/ContentWithBackground/ContentWithBackground';
import {stylesApp, styleUtil} from '../../../styles/app.style';
import ImageScale from 'react-native-scalable-image';
import BookingDate from '../booking-date/BookingDate';

export default class BookingMenu extends React.Component {
  static NAV_NAME = 'booking-menu';

  constructor(props) {
    super(props);

    props.navigation.setOptions({
      title: 'Schedule',
    });
  }

  render() {
    return (
      <ContentWithBackground>
        <View style={stylesApp.viewContainer}>
          {/* title */}
          <Text style={styles.txtTitle}>Successfully Purchased!</Text>

          {/* buttons */}

          {/* private live */}
          <TouchableOpacity onPress={() => this.onBookType()}>
            <View style={styles.viewButton}>
              <ImageScale
                width={24}
                style={styles.imgButIcon}
                source={require('../../../../assets/imgs/ic_live_private.png')}
              />
              <Text style={styles.txtButton}>Book Your Private “Live”</Text>
            </View>
          </TouchableOpacity>

          {/* private group */}
          <TouchableOpacity onPress={() => this.onBookType()}>
            <View style={styles.viewButton}>
              <ImageScale
                width={24}
                style={styles.imgButIcon}
                source={require('../../../../assets/imgs/ic_live_group.png')}
              />
              <Text style={styles.txtButton}>Book Your Private or Group</Text>
            </View>
          </TouchableOpacity>

          {/* lesson */}
          <TouchableOpacity onPress={() => this.onBookType()}>
            <View style={styles.viewButton}>
              <ImageScale
                width={24}
                style={styles.imgButIcon}
                source={require('../../../../assets/imgs/ic_book_lesson.png')}
              />
              <Text style={styles.txtButton}>Book Your Dance Lesson</Text>
            </View>
          </TouchableOpacity>

          {/* credit */}
          <TouchableOpacity onPress={() => this.onBookType()}>
            <View style={styles.viewButton}>
              <ImageScale
                width={24}
                style={styles.imgButIcon}
                source={require('../../../../assets/imgs/ic_credit.png')}
              />
              <Text style={styles.txtButton}>
                Use Credit for Pre-ordered Dance Lesson
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </ContentWithBackground>
    );
  }

  onBookType() {
    // go to date page
    this.props.navigation.push(BookingDate.NAV_NAME);
  }
}
