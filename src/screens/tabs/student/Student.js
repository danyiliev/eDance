import React from 'react';
import {styles as stylesMain} from '../radio/styles';
import {FlatList, Image, Text, View} from 'react-native';
import {Utils} from '../../../helpers/utils';
import {styles as stylesLike} from '../likes/styles';
import {stylesApp, styleUtil} from '../../../styles/app.style';
import ImageScale from 'react-native-scalable-image';
import {Button, Icon} from 'react-native-elements';
import {colors as colorTheme} from '../../../styles/theme.style';
import {styles} from './styles';

export default class Student extends React.Component {
  static NAV_NAME = 'student';

  // data
  lessons = [];

  constructor(props) {
    super(props);

    // load data
    for (let i = 0; i < 20; i++) {
      this.lessons.push({});
    }
  }

  render() {
    return (
      <View style={stylesMain.viewContainer}>
        <FlatList
          contentContainerStyle={stylesLike.listCtnContainer}
          keyExtractor={(item, index) => index.toString()}
          data={Utils.makeEmptyArray(this.lessons.length)}
          renderItem={({item, index}) => this.renderItem(item, index)}
        />
      </View>
    );
  }

  renderItem(item, index) {
    return (
      <View style={stylesLike.viewItem}>
        <View style={stylesLike.viewItemImage}>
          {/* image */}
          <Image
            style={stylesLike.imgItem}
            source={require('../../../../assets/imgs/lesson_default.png')}
          />

          {/* length */}
          <View style={stylesLike.viewTxtLength}>
            <Text style={stylesLike.txtLength}>01:32</Text>
          </View>
        </View>

        {/* content */}
        <View style={stylesLike.viewItemContent}>
          <View style={stylesLike.viewItemHeader}>
            <Text style={stylesLike.txtLesson}>Lesson {index + 1}</Text>
            <Text style={styles.txtPrice}>$35</Text>
          </View>

          <View style={styles.viewItemContentBody}>
            <View style={stylesApp.flex1}>
              {/* name */}
              <Text style={stylesLike.txtName}>Kene Julie</Text>

              {/* category */}
              <Text style={styles.txtCategory}>Rumba</Text>

              {/* level */}
              <Text style={styles.txtLevel}>Begineer Level</Text>
            </View>

            <View style={styles.viewAction}>
              <View style={styleUtil.withShadow()}>
                <Button
                  type="clear"
                  icon={
                    <Icon
                      type="ionicon"
                      name="md-add"
                      size={24}
                      color={colorTheme.light}
                    />
                  }
                  containerStyle={styles.ctnButAction}
                  buttonStyle={styles.butAction}
                />
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  }
}
