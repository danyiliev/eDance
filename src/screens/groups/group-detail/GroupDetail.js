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

            {/* styles */}
            <View style={[stylesSetting.viewForm, stylesApp.mt14]}>
              {/* title */}
              <Text style={[stylesSignup.txtItemTitle, stylesApp.mt6]}>Dance Styles</Text>

              <View style={styles.viewFormContent}>
                {this.group.styles.map((s, i) => (
                  <Text key={`style-${i}`} style={styles.txtItem}>{DanceHelper.danceStyleNameByVal(s)}</Text>
                ))}
              </View>
            </View>

            {/* dances */}
            <View style={[stylesSetting.viewForm, stylesApp.mt14]}>
              {/* title */}
              <Text style={[stylesSignup.txtItemTitle, stylesApp.mt6]}>Dances</Text>

              <View style={styles.viewFormContent}>
                {this.group.dances.map((d, i) => (
                  <Text key={`dance-${i}`} style={styles.txtItem}>{DanceHelper.danceNameByVal(d, this.group.styles[0])}</Text>
                ))}
              </View>
            </View>

          </View>
        </ScrollView>
      </View>
    );
  }
}
