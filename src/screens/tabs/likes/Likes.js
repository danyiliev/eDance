import React from 'react';
import {styles as stylesMain} from '../radio/styles';
import {styles as stylesLike, styles} from './styles';
import {FlatList, Image, Text, View} from 'react-native';
import {Utils} from '../../../helpers/utils';
import {stylesApp} from '../../../styles/app.style';
import ImageScale from 'react-native-scalable-image';

export default class Likes extends React.Component {
  static NAV_NAME = 'likes';

  state = {
    // ui
    showLoading: false,
    redrawIndex: 0,
  };

  // data
  lessons = [];

  constructor(props) {
    super(props);

    // load data
    for (let i =0; i < 20; i++) {
      this.lessons.push({});
    }
  }

  render() {
    return (
      <View style={stylesMain.viewContainer}>
        <FlatList
          contentContainerStyle={styles.listCtnContainer}
          keyExtractor={(item, index) => index.toString()}
          onRefresh={() => this.onRefresh()}
          refreshing={this.state.showLoading}
          data={Utils.makeEmptyArray(this.lessons.length)}
          renderItem={({item, index}) => this.renderItem(item, index)}
        />
      </View>
    );
  }

  renderItem(item, index) {
    return (
      <View style={styles.viewItem}>
        <View style={styles.viewItemImage}>
          {/* image */}
          <Image
            style={styles.imgItem}
            source={require('../../../../assets/imgs/lesson_default.png')}
          />

          {/* length */}
          <View style={styles.viewTxtLength}>
            <Text style={styles.txtLength}>
              01:32
            </Text>
          </View>
        </View>

        {/* content */}
        <View style={styles.viewItemContent}>
          <View style={styles.viewItemHeader}>
            <Text style={styles.txtLesson}>
              Lesson {index+1}
            </Text>
            <Text style={styles.txtStatus}>
              Purchased
            </Text>
          </View>

          <View style={styles.viewItemContentBody}>
            <View style={stylesApp.flex1}>
              {/* name */}
              <Text style={styles.txtName}>
                John Smith
              </Text>

              {/* category */}
              <Text style={styles.txtCategory}>
                Samba/Waltz
              </Text>
            </View>

            <View style={styles.viewLike}>
              <ImageScale
                width={33}
                source={require('../../../../assets/imgs/tab_like.png')}
              />
            </View>
          </View>
        </View>
      </View>
    );
  }

  onRefresh() {
  }
}
