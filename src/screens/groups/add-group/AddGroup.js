import React from 'react';
import {connect} from 'react-redux';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {stylesApp, styleUtil} from '../../../styles/app.style';
import {styles} from './styles';
import {Alert, Dimensions, Text, TouchableOpacity, View} from 'react-native';
import {styles as stylesSetting} from '../../settings/setting-profile/styles';
import {styles as stylesSignup} from '../../signup/styles';
import {styles as stylesSchedule} from '../../schedule/styles';
import {Button, ButtonGroup, Input} from 'react-native-elements';
import {colors as colorTheme} from '../../../styles/theme.style';
import BaseSettingProfile from '../../base-setting-profile';
import {Utils} from '../../../helpers/utils';
import {User} from '../../../models/user.model';
import {Group} from '../../../models/group.model';
import {ApiService} from '../../../services';
import {setMyGroups} from '../../../actions/lesson';
import ComboSchedule from '../../../components/ComboSchedule/ComboSchedule';
import {DanceHelper} from '../../../helpers/dance-helper';
import CheckboxRound from '../../../components/CheckboxRound/CheckboxRound';
import moment from 'moment';
import DismissKeyboard from '../../../components/DismissKeyboard/DismissKeyboard';
import {DURATIONS_LESSON} from '../../../constants/dance-data';

class AddGroup extends BaseSettingProfile {
  static NAV_NAME = 'add-group';

  lessonDurations = ['30 Minutes', '45 Minutes', 'An hour'];
  dayOfWeeks = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  group = null;

  constructor(props) {
    super(props);

    this.state = {
      ...this.state,

      name: '',
      style: '',
      dance: '',
      availableDays: [],
    };

    // get parameter
    if (props.route.params) {
      this.group = props.route.params.group;

      this.state.name = this.group.name;
      this.state.danceLevels = this.group.danceLevels;
      this.state.style = this.group.styles[0];
      this.state.dance = this.group.dances[0];

      this.state.timeStart = this.group.timeStart;
      this.state.availableDays = this.group.availableDays;
      this.state.durationLessonIndex = DURATIONS_LESSON.findIndex((d) => d === this.group.durationLesson);
    } else {
      this.state.timeStart = this.currentUser?.timeStart;
      this.state.availableDays = this.currentUser?.availableDays;
      this.state.durationLessonIndex = DURATIONS_LESSON.findIndex(
        (d) => d === this.currentUser.durationLesson,
      );
    }

    props.navigation.setOptions({
      title: this.group ? 'Edit Group' : 'Create New Group',
    });
  }

  render() {
    return (
      <KeyboardAwareScrollView style={stylesApp.viewContainer}>
        <DismissKeyboard
          ref={(view) => {
            this.keyboardView = view;
          }}>
          <View style={styles.viewContainer}>
            {/* name */}
            <View style={stylesSetting.viewForm}>
              <Text style={stylesSignup.txtItemTitle}>Group Name</Text>

              <View style={[stylesSetting.viewInput, stylesApp.mt12]}>
                <Input
                  ref={(input) => {
                    this.inputName = input;
                  }}
                  containerStyle={stylesSetting.ctnInput}
                  autoCapitalize={'none'}
                  returnKeyType="done"
                  placeholder="Input Name"
                  placeholderTextColor={colorTheme.primary}
                  inputStyle={stylesSetting.input}
                  inputContainerStyle={stylesApp.input}
                  onChangeText={(name) => {
                    this.setState({name});
                  }}
                  value={this.state.name}
                  renderErrorMessage={false}
                />
              </View>
            </View>

            {/* levels */}
            <View style={[stylesSetting.viewForm, stylesApp.mt14]}>
              {/* title */}
              <Text style={[stylesSignup.txtItemTitle, stylesApp.mt6]}>Dance Level</Text>

              {this.renderLevels()}
            </View>

            {/* dance style */}
            <View style={[stylesSetting.viewForm, stylesApp.mt14]}>
              {/* title */}
              <Text style={stylesSchedule.txtTitle}>Dance Styles</Text>

              <ComboSchedule
                style={stylesSchedule.styleCombo}
                placeholder={'Please select dance style'}
                title="Select Dance Style"
                items={DanceHelper.danceStylesAll()}
                value={this.state.style}
                onChange={(style) => this.setState({style, dance: ''}, () => this.updateName())}
              />
            </View>

            {/* dance */}
            {this.state.style ? (
              <View style={[stylesSetting.viewForm, stylesApp.mt14]}>
                {/* title */}
                <Text style={stylesSchedule.txtTitle}>Dance</Text>

                <ComboSchedule
                  style={stylesSchedule.styleCombo}
                  title="Select Dance"
                  placeholder={'Please select dance'}
                  items={DanceHelper.dancesByStyle(this.state.style)}
                  value={this.state.dance}
                  onChange={(dance) => this.setState({dance}, () => this.updateName())}
                />
              </View>
            ) : null}

            {/* schedule */}
            <View style={[stylesSetting.viewForm, stylesApp.mt14]}>
              <Text style={stylesSchedule.txtTitle}>Schedule</Text>

              <Text style={[stylesSetting.txtLabel, stylesApp.mt12]}>
                Choose how long your dance classes will be
              </Text>
              <ButtonGroup
                containerStyle={stylesSetting.ctnSegmentGender}
                buttons={this.lessonDurations}
                textStyle={stylesSignup.txtSegment}
                innerBorderStyle={stylesSignup.borderSegment}
                selectedButtonStyle={stylesSignup.butSegmentSelected}
                selectedTextStyle={stylesSignup.SegmentSelected}
                selectedIndex={this.state.durationLessonIndex}
                onPress={(index) => this.setState({durationLessonIndex: index})}
              />

              {/* time */}
              <View style={[stylesApp.flexRowCenter, stylesApp.mt12, stylesApp.mb4]}>
                <Text style={stylesSetting.txtTimeLabel}>Start Time</Text>

                <TouchableOpacity style={stylesSetting.viewTime} onPress={() => this.onTimeStart(false)}>
                  {this.state.timeStart ? (
                    <Text>{this.state.timeStart}</Text>
                  ) : (
                    <Text style={styles.txtPlaceholder}>Please select time</Text>
                  )}
                </TouchableOpacity>
              </View>

              <Text style={[stylesSetting.txtLabel, stylesApp.mt14]}>
                Choose your available days to teach
              </Text>
              {this.renderDayOfWeeks()}
            </View>

            {/* save */}
            <View style={[styleUtil.withShadow(), stylesSetting.viewButSave]}>
              <Button
                title="SAVE"
                buttonStyle={stylesApp.butPrimary}
                titleStyle={stylesApp.titleButPrimary}
                onPress={() => this.onButSave()}
              />
            </View>

            {/* time picker */}
            {this.renderTimePicker()}
          </View>
        </DismissKeyboard>
      </KeyboardAwareScrollView>
    );
  }

  onSelectLevel(level) {
    let {danceLevels} = this.state;
    danceLevels = [level];

    this.setState({danceLevels}, () => this.updateName());
  }

  /**
   * update group name based on level, style and dance
   */
  updateName() {
    const names = [];
    if (this.state.danceLevels.length > 0) {
      names.push(this.state.danceLevels[0]);
    }
    if (this.state.style) {
      names.push(this.state.style);
    }
    if (this.state.dance) {
      names.push(this.state.dance);
    }

    this.setState({
      name: names.join('-'),
    });
  }

  async onButSave() {
    // check validity
    if (!this.state.name) {
      Alert.alert('Invalid Group Name', 'Group name cannot be empty', [
        {
          text: 'OK',
          onPress: () => this.inputName.focus(),
        },
      ]);

      return;
    }

    if (this.state.danceLevels.length <= 0) {
      Alert.alert('Dance Levels Not Selected', 'Dance levels cannot be empty');
      return;
    }

    if (!this.state.style) {
      Alert.alert('Dance Styles Not Selected', 'Dance styles and dances cannot be empty');
      return;
    }
    if (!this.state.dance) {
      Alert.alert('Dance Not Selected', 'Dance styles and dances cannot be empty');
      return;
    }

    if (!this.state.timeStart || this.state.availableDays.length <= 0) {
      Alert.alert('Schedule Not Selected', 'Group lesson schedule is not set');
      return;
    }

    // show loading
    this.loadingHUD.show();

    let isNew = false;
    let group = this.group;
    if (!group) {
      isNew = true;
      group = new Group();
    }

    group.name = this.state.name;
    group.danceLevels = this.state.danceLevels;

    // styles & dances
    group.styles = [this.state.style];
    group.dances = [this.state.dance];

    // schedule
    group.availableDays = this.state.availableDays;
    group.timeStart = this.state.timeStart;
    group.durationLesson = DURATIONS_LESSON[this.state.durationLessonIndex];

    try {
      const result = await ApiService.addGroup(group);

      if (isNew) {
        group.id = result.id;
        const {myGroups} = this.props.LessonReducer;
        myGroups.unshift(group);
      }

      // go back to prev page
      this.props.navigation.pop();
    } catch (e) {
      console.log(e);

      Alert.alert('Failed to Save Group', e.message);
    }

    this.loadingHUD.hideAll();
  }
}

const mapStateToProps = (state) => state;
const mapDispatchToProps = {
  setMyGroups,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddGroup);
