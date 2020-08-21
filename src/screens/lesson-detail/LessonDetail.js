import React from 'react';
import {Text, View} from 'react-native';
import {styles} from './styles';
import {stylesApp} from '../../styles/app.style';
import FastImage from 'react-native-fast-image';
import {UserHelper} from '../../helpers/user-helper';
import {Button} from 'react-native-elements';

export default class LessonDetail extends React.Component {
  static NAV_NAME = 'lesson-detail';

  constructor(props) {
    super(props);

    props.navigation.setOptions({
      title: 'Lesson Detail',
    });
  }

  render() {
    return (
      <View style={styles.viewContainer}>
        <View>
          {false ?? (
            <View style={styles.viewNotice}>
              <Text style={styles.txtNotice}>Lesson is not started yet.</Text>
            </View>
          )}

          <View style={styles.viewForm}>
            {/* time */}
            <Text style={styles.txtCreated}>2020-09-13 12:22</Text>

            {/* title */}
            <Text style={styles.txtItemTitle}>
              Summary
            </Text>

            <View style={styles.viewContent}>
              {/* lesson type */}
              <View style={styles.viewItem}>
                <Text style={styles.txtItemLabel}>
                  Lesson Type:
                </Text>
                <Text style={styles.txtItemValue}>
                  Private
                </Text>
              </View>

              {/* age group */}
              <View style={styles.viewItem}>
                <Text style={styles.txtItemLabel}>
                  Age Group:
                </Text>
                <Text style={styles.txtItemValue}>
                  J-1
                </Text>
              </View>

              {/* dance style */}
              <View style={styles.viewItem}>
                <Text style={styles.txtItemLabel}>
                  Dance Style:
                </Text>
                <Text style={styles.txtItemValue}>
                  J-1
                </Text>
              </View>

              {/* dance */}
              <View style={styles.viewItem}>
                <Text style={styles.txtItemLabel}>
                  Dance:
                </Text>
                <Text style={styles.txtItemValue}>
                  J-1
                </Text>
              </View>

              {/* dance level */}
              <View style={styles.viewItem}>
                <Text style={styles.txtItemLabel}>
                  Dance Level:
                </Text>
                <Text style={styles.txtItemValue}>
                  J-1
                </Text>
              </View>

              <Text style={styles.txtSubTitle}>
                Order Info
              </Text>

              {/* teacher */}
              <View style={styles.viewItem}>
                <Text style={styles.txtItemLabel}>
                  Teacher:
                </Text>
                <View style={stylesApp.flexRowCenter}>
                  <FastImage
                    style={styles.imgUser}
                    source={UserHelper.getUserImage()}
                    resizeMode={FastImage.resizeMode.cover}
                  />
                  <Text style={[styles.txtItemValue, stylesApp.ml10]}>
                    Teacher Name
                  </Text>
                </View>
              </View>

              {/* date */}
              <View style={styles.viewItem}>
                <Text style={styles.txtItemLabel}>
                  Date:
                </Text>
                <Text style={styles.txtItemValue}>
                  2091-03-12
                </Text>
              </View>

              {/* time */}
              <View style={styles.viewItem}>
                <Text style={styles.txtItemLabel}>
                  Time:
                </Text>
                <Text style={styles.txtItemValue}>
                  09:00 - 12:00
                </Text>
              </View>

              {/* price */}
              <View style={styles.viewItem}>
                <Text style={styles.txtItemLabel}>
                  Price:
                </Text>
                <Text style={styles.txtItemValue}>
                  $35
                </Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.viewActions}>
          <Button
            title="Cancel"
            type="clear"
            containerStyle={[styles.ctnButAction, stylesApp.mr10]}
            buttonStyle={stylesApp.butLightOutline}
            titleStyle={stylesApp.titleButLight}
            onPress={() => this.onButCancel()}
          />
          <Button
            title="Start"
            containerStyle={[styles.ctnButAction, stylesApp.ml10]}
            buttonStyle={stylesApp.butPrimary}
            titleStyle={stylesApp.titleButPrimary}
            onPress={() => this.onButStart()}
          />
        </View>
      </View>
    );
  }

  onButCancel() {
  }

  onButStart() {
  }
}
