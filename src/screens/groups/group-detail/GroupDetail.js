import React from 'react';
import {stylesApp} from '../../../styles/app.style';
import {ScrollView, Text, View} from 'react-native';
import {styles as stylesAdd} from '../../championships/add-championship/styles';
import {styles as stylesSetting} from '../../settings/setting-profile/styles';
import {styles as stylesSignup} from '../../signup/styles';
import {styles} from './styles';
import FastImage from 'react-native-fast-image';
import {UserHelper} from '../../../helpers/user-helper';
import {DanceHelper} from '../../../helpers/dance-helper';
import {
  SELECT_AMERICAN_BALLROOM,
  SELECT_AMERICAN_RHYTHM,
  SELECT_LATIN,
  SELECT_STANDARD,
} from '../../../constants/dance-data';

export default class GroupDetail extends React.Component {
  static NAV_NAME = 'group-detail';

  group = null;

  constructor(props) {
    super(props);

    props.navigation.setOptions({
      title: 'Group Details',
    });

    // get parameter
    if (props.route.params) {
      this.group = props.route.params.group;
    }
  }

  render() {
    return (
      <View style={stylesApp.viewContainer}>
        <ScrollView>
          <View style={stylesAdd.viewContainer}>
            <View style={stylesSetting.viewForm}>
              {/* name */}
              <View style={stylesApp.flexRowCenter}>
                <Text style={styles.txtLabel}>Group Name:</Text>
                <Text>{this.group?.name}</Text>
              </View>

              {/* teacher */}
              <View style={[stylesApp.flexRowCenter, stylesApp.mt12]}>
                <Text style={styles.txtLabel}>Teacher:</Text>

                <View style={stylesApp.flexRowCenter}>
                  <FastImage
                    style={styles.imgUser}
                    source={UserHelper.getUserImage(this.group?.user)}
                    resizeMode={FastImage.resizeMode.cover}
                  />
                  <Text style={[stylesApp.ml10]}>{this.group?.user.getFullName()}</Text>
                </View>
              </View>
            </View>

            {/* levels */}
            <View style={[stylesSetting.viewForm, stylesApp.mt14]}>
              {/* title */}
              <Text style={[stylesSignup.txtItemTitle, stylesApp.mt6]}>Dance Levels</Text>

              <View style={styles.viewFormContent}>
                {this.group.danceLevels.map((l, i) => (
                  <Text key={`danceLevel-${i}`} style={styles.txtItem}>{DanceHelper.danceLevelNameByVal(l)}</Text>
                ))}
              </View>
            </View>

            <View style={[stylesSetting.viewForm, stylesApp.mt14]}>
              {/* title */}
              <Text style={[stylesSignup.txtItemTitle, stylesApp.mt6]}>Dance Styles & Dances</Text>

              {this.group?.styleBallroom.length > 0 ? (
                <>
                  <Text style={styles.txtSubTitle}>
                    {DanceHelper.danceStyleNameByVal(SELECT_AMERICAN_BALLROOM)}
                  </Text>
                  <View style={styles.viewFormContent}>
                    {this.group?.styleBallroom.map((dance, i) => (
                      <Text style={styles.txtItem} key={`${SELECT_AMERICAN_BALLROOM}-${i}`}>
                        {DanceHelper.danceNameByVal(dance, SELECT_AMERICAN_BALLROOM)}
                      </Text>
                    ))}
                  </View>
                </>
              ) : null}

              {this.group?.styleRythm.length > 0 ? (
                <>
                  <Text style={styles.txtSubTitle}>
                    {DanceHelper.danceStyleNameByVal(SELECT_AMERICAN_RHYTHM)}
                  </Text>
                  <View style={styles.viewFormContent}>
                    {this.group?.styleRythm.map((dance, i) => (
                      <Text style={styles.txtItem} key={`${SELECT_AMERICAN_RHYTHM}-${i}`}>
                        {DanceHelper.danceNameByVal(dance, SELECT_AMERICAN_RHYTHM)}
                      </Text>
                    ))}
                  </View>
                </>
              ) : null}

              {this.group?.styleStandard.length > 0 ? (
                <>
                  <Text style={styles.txtSubTitle}>
                    {DanceHelper.danceStyleNameByVal(SELECT_STANDARD)}
                  </Text>
                  <View style={styles.viewFormContent}>
                    {this.group?.styleStandard.map((dance, i) => (
                      <Text style={styles.txtItem} key={`${SELECT_STANDARD}-${i}`}>
                        {DanceHelper.danceNameByVal(dance, SELECT_STANDARD)}
                      </Text>
                    ))}
                  </View>
                </>
              ) : null}

              {this.group?.styleLatin.length > 0 ? (
                <>
                  <Text style={styles.txtSubTitle}>
                    {DanceHelper.danceStyleNameByVal(SELECT_LATIN)}
                  </Text>
                  <View style={styles.viewFormContent}>
                    {this.group?.styleLatin.map((dance, i) => (
                      <Text style={styles.txtItem} key={`${SELECT_LATIN}-${i}`}>
                        {DanceHelper.danceNameByVal(dance, SELECT_LATIN)}
                      </Text>
                    ))}
                  </View>
                </>
              ) : null}

            </View>

          </View>
        </ScrollView>
      </View>
    );
  }
}
