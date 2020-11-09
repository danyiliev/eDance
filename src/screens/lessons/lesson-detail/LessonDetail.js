import React from 'react';
import {Text, View} from 'react-native';
import {styles} from './styles';
import {stylesApp} from '../../../styles/app.style';
import FastImage from 'react-native-fast-image';
import {UserHelper} from '../../../helpers/user-helper';
import {Button, Icon} from 'react-native-elements';
import {DanceHelper} from '../../../helpers/dance-helper';
import {connect} from 'react-redux';
import {LessonHelper} from '../../../helpers/lesson-helper';
import Broadcast from '../broadcast/Broadcast';
import Playback from '../playback/Playback';
import {colors as colorTheme} from '../../../styles/theme.style';
import SignupBase from '../../signup/SignupBase';
import Chat from '../../chat/Chat';

class LessonDetail extends React.Component {
  static NAV_NAME = 'lesson-detail';

  currentUser = null;
  lesson = null;
  isTeacher = true;

  prepareDuration = 10;

  constructor(props) {
    super(props);

    props.navigation.setOptions({
      title: 'Lesson Detail',
    });

    this.currentUser = props.UserReducer.user;

    // get parameter
    if (props.route.params) {
      this.lesson = props.route.params.lesson;
      this.isTeacher = this.lesson?.teacherId === this.currentUser.id;

      this.prepareDuration = this.isTeacher ? 10 : 0;
    }
  }

  render() {
    const targetUser = LessonHelper.getTargetUser(this.lesson, this.currentUser);

    return (
      <View style={styles.viewContainer}>
        <View>
          {this.renderNotice()}

          <View style={styles.viewForm}>
            {/* time */}
            <Text style={styles.txtCreated}>{this.lesson?.createdAtStr()}</Text>

            {/* title */}
            <Text style={styles.txtItemTitle}>Summary</Text>

            <View style={styles.viewContent}>
              {/* lesson type */}
              <View style={styles.viewItem}>
                <Text style={styles.txtItemLabel}>Lesson Type:</Text>
                <Text style={styles.txtItemValue}>
                  {DanceHelper.lessonTypeNameByVal(this.lesson?.lessonType)}
                </Text>
              </View>

              {this.lesson?.group ? (
                <View style={styles.viewItem}>
                  <Text style={styles.txtItemLabel}>Group:</Text>
                  <Text style={styles.txtItemValue}>{this.lesson?.group?.name}</Text>
                </View>
              ) : null}

              {/* age group */}
              <View style={styles.viewItem}>
                <Text style={styles.txtItemLabel}>Age Group:</Text>
                <Text style={styles.txtItemValue}>
                  {DanceHelper.ageGroupNameByVal(this.lesson?.ageGroup)}
                </Text>
              </View>

              {/* dance style */}
              <View style={styles.viewItem}>
                <Text style={styles.txtItemLabel}>Dance Style:</Text>
                <Text style={styles.txtItemValue}>
                  {DanceHelper.danceStyleNameByVal(this.lesson?.danceStyle)}
                </Text>
              </View>

              {/* dance */}
              <View style={styles.viewItem}>
                <Text style={styles.txtItemLabel}>Dance:</Text>
                <Text style={styles.txtItemValue}>
                  {DanceHelper.danceNameByVal(this.lesson?.dance, this.lesson?.danceStyle)} ({this.lesson?.dance})
                </Text>
              </View>

              {/* dance level */}
              <View style={styles.viewItem}>
                <Text style={styles.txtItemLabel}>Dance Level:</Text>
                <Text style={styles.txtItemValue}>
                  {DanceHelper.danceLevelNameByVal(this.lesson?.danceLevel)}
                </Text>
              </View>

              <Text style={styles.txtSubTitle}>Order Info</Text>

              {/* teacher */}
              <View style={styles.viewItem}>
                <Text style={styles.txtItemLabel}>{this.isTeacher ? 'Student:' : 'Teacher:'}</Text>
                <View style={[stylesApp.flexRowCenter, stylesApp.flex1]}>
                  <FastImage
                    style={styles.imgUser}
                    source={UserHelper.getUserImage(targetUser)}
                    resizeMode={FastImage.resizeMode.cover}
                  />
                  <Text style={[styles.txtItemValue, stylesApp.ml10, stylesApp.flex1]}>
                    {targetUser?.getFullName()}
                  </Text>

                  <Button
                    type="clear"
                    icon={<Icon type="font-awesome" name="comments-o" size={20} color={colorTheme.primary} />}
                    onPress={() => this.onButMessage(targetUser)}
                  />
                </View>
              </View>

              {/* date */}
              <View style={styles.viewItem}>
                <Text style={styles.txtItemLabel}>Date:</Text>
                <Text style={styles.txtItemValue}>{this.lesson?.date}</Text>
              </View>

              {/* time */}
              <View style={styles.viewItem}>
                <Text style={styles.txtItemLabel}>Time:</Text>
                <Text style={styles.txtItemValue}>{this.lesson?.timeToString()}</Text>
              </View>

              {/* price */}
              <View style={styles.viewItem}>
                <Text style={styles.txtItemLabel}>Price:</Text>
                <Text style={styles.txtItemValue}>${this.lesson?.price}</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.viewActions}>
          <Button
            title="Back"
            type="clear"
            containerStyle={[styles.ctnButAction, stylesApp.mr10]}
            buttonStyle={stylesApp.butLightOutline}
            titleStyle={stylesApp.titleButLight}
            onPress={() => this.onButCancel()}
          />
          <Button
            title={this.isTeacher ? 'Start' : 'Join'}
            containerStyle={[styles.ctnButAction, stylesApp.ml10]}
            buttonStyle={stylesApp.butPrimary}
            titleStyle={stylesApp.titleButPrimary}
            // disabled={this.lesson?.isClosed() || this.lesson?.minsToStart() > this.prepareDuration}
            disabledStyle={[stylesApp.butPrimary, stylesApp.semiTrans]}
            onPress={() => this.onButStart()}
          />
        </View>
      </View>
    );
  }

  renderNotice() {
    if (this.lesson?.isClosed()) {
      return (
        <View style={styles.viewNotice}>
          <Text style={styles.txtNotice}>Lesson is already closed.</Text>
        </View>
      );
    }

    if (this.lesson?.minsToStart() > this.prepareDuration) {
      return (
        <View style={styles.viewNotice}>
          <Text style={styles.txtNotice}>Lesson is not started yet.</Text>
        </View>
      );
    }

    return null;
  }

  onButCancel() {
    // go back to prev page
    this.props.navigation.pop();
  }

  onButStart() {
    if (this.isTeacher) {
      // go to broadcast page
      this.props.navigation.push(Broadcast.NAV_NAME, {
        lesson: this.lesson,
      });
    } else {
      // go to playback page
      this.props.navigation.push(Playback.NAV_NAME, {
        lesson: this.lesson,
      });
    }
  }

  onButMessage(user) {
    // go to chat page
    this.props.navigation.push(Chat.NAV_NAME, {userTo: user});
  }
}

const mapStateToProps = (state) => state;

export default connect(mapStateToProps, null)(LessonDetail);
