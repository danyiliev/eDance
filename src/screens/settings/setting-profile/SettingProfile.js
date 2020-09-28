import React from 'react';
import DismissKeyboard from '../../../components/DismissKeyboard/DismissKeyboard';
import {styles} from './styles';
import {styles as stylesSignup} from '../../signup/styles';
import {
  Dimensions,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Platform,
  Alert,
} from 'react-native';
import {stylesApp, styleUtil} from '../../../styles/app.style';
import {Button, ButtonGroup, Icon, Input} from 'react-native-elements';
import {styles as stylesLogin} from '../../login/styles';
import {colors as colorTheme} from '../../../styles/theme.style';
import ImageScale from 'react-native-scalable-image';
import CheckboxRound from '../../../components/CheckboxRound/CheckboxRound';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import SelectPicker from '../../../components/SelectPicker/SelectPicker';
import {Picker} from '@react-native-community/picker';
import {STATES} from '../../../constants/constant-data';
import TagItem from '../../../components/TagItem/TagItem';
import ScheduleSelect from '../../schedule/ScheduleSelect';
import SelectList from '../select-list/SelectList';
import {
  AGE_GROUPS,
  DANCE_LEVELS,
  DURATIONS_LESSON,
  DURATIONS_REST,
  SELECT_AGE,
  SELECT_AMERICAN_BALLROOM,
  SELECT_AMERICAN_RHYTHM,
  SELECT_LATIN,
  SELECT_STANDARD,
} from '../../../constants/dance-data';
import {setUserInfo} from '../../../actions/user';
import {connect} from 'react-redux';
import {ApiService} from '../../../services';
import {UserHelper} from '../../../helpers/user-helper';
import {User} from '../../../models/user.model';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import {LoadingHUD} from 'react-native-hud-hybrid';
import SignupBase from '../../signup/SignupBase';
import BaseSettingProfile from '../../base-setting-profile';

const {width: SCREEN_WIDTH} = Dimensions.get('window');
const HEIGHT_TIMER = 140;

class SettingProfile extends BaseSettingProfile {
  static NAV_NAME = 'setting-profile';
  static NAV_NAME_SIGNUP = 'setting-profile-signup';

  lessonDurations = ['30 Minutes', '45 Minutes', 'An hour'];
  restDurations = ['5 Minutes', '10 Minutes', '15 Minutes'];
  dayOfWeeks = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  timeSelected = new Date();
  strTimeSelected = '';

  constructor(props) {
    super(props);

    this.state = {
      ...this.state,

      // ui
      showTimePickerStart: false,
      showTimePickerEnd: false,

      // data
      ageGroups: [],
      price: '',

      durationLessonIndex: 0,
      durationRestIndex: 0,
      availableDays: [],
      timeStart: '',
      timeEnd: '',
    };

    this.currentUser = props.UserReducer.user;

    // init data
    if (this.currentUser) {
      this.state.ageGroups = this.currentUser.ageGroups;
      this.state.styleBallroom = this.currentUser.styleBallroom;
      this.state.styleRythm = this.currentUser.styleRythm;
      this.state.styleStandard = this.currentUser.styleStandard;
      this.state.styleLatin = this.currentUser.styleLatin;
      this.state.danceLevels = this.currentUser.danceLevels;
      this.state.price = this.currentUser.price?.toString();

      this.state.durationLessonIndex = DURATIONS_LESSON.findIndex(
        (d) => d === this.currentUser.durationLesson,
      );
      this.state.durationRestIndex = DURATIONS_REST.findIndex(
        (d) => d === this.currentUser.durationRest,
      );
      this.state.availableDays = this.currentUser.availableDays;
      this.state.timeStart = this.currentUser.timeStart;
      this.state.timeEnd = this.currentUser.timeEnd;
    }

    props.navigation.setOptions({
      title: this.props.UserReducer.isLoggedIn ? 'Lesson Options' : 'Create a Dance Teacher Profile',
    });
  }

  render() {
    return (
      <KeyboardAwareScrollView style={stylesApp.viewContainer}>
        <DismissKeyboard
          ref={(view) => {
            this.keyboardView = view;
          }}>
          <View style={styles.viewContent}>
            {this.renderTeacherSetting()}

            {/* save */}
            <View style={[styleUtil.withShadow(), styles.viewButSave]}>
              <Button
                title={this.props.UserReducer.isLoggedIn ? 'SAVE' : 'NEXT'}
                buttonStyle={stylesApp.butPrimary}
                titleStyle={stylesApp.titleButPrimary}
                onPress={() => this.onButSave()}
              />
            </View>
          </View>
        </DismissKeyboard>
      </KeyboardAwareScrollView>
    );
  }

  renderTeacherSetting() {
    return (
      <View>
        <Text style={styles.txtLabel}>Lesson Options You Teach:</Text>

        {/* age groups */}
        <TouchableOpacity onPress={() => this.onSelectAge()}>
          <View style={styles.viewListItem}>
            <Text style={styles.txtItem}>Select Age Groups</Text>

            {/* chevron */}
            <Icon type="ionicon" name="ios-arrow-forward" size={18} color={colorTheme.primary} />
          </View>
        </TouchableOpacity>

        {/*tags of age group */}
        <View style={styles.viewTapContainer}>
          {this.state.ageGroups.map((value, i) => {
            return <TagItem key={i.toString()} text={value} />;
          })}
        </View>

        {/* levels */}
        <View style={[styles.viewForm, stylesApp.mt14]}>
          {/* title */}
          <Text style={[stylesSignup.txtItemTitle, stylesApp.mt6]}>
            Dance Level
          </Text>

          {this.renderLevels()}
        </View>

        {this.renderDanceStyles()}

        {/* price */}
        <View style={[styles.viewForm, stylesApp.mt14]}>
          <Text style={[stylesSignup.txtItemTitle, stylesApp.mt6]}>Price</Text>

          {/* price */}
          <View style={[styles.viewInput, stylesApp.mt12]}>
            <Input
              containerStyle={styles.ctnInput}
              autoCapitalize={'none'}
              keyboardType="numeric"
              returnKeyType="done"
              placeholder="Input Price"
              placeholderTextColor={colorTheme.primary}
              inputStyle={styles.input}
              inputContainerStyle={stylesApp.input}
              onChangeText={(price) => {
                this.setState({price});
              }}
              value={this.state.price}
              renderErrorMessage={false}
            />
            {/* right icon */}
            <Icon color={'#cecece'} type="font-awesome" name="usd" size={16} />
          </View>
        </View>

        {/* time options */}
        <View style={[styles.viewForm, stylesApp.mt24]}>
          <Text style={[stylesSignup.txtItemTitle, stylesApp.mt6]}>
            Create your own dance schedule:
          </Text>

          <Text style={[styles.txtLabel, stylesApp.mt12]}>
            Choose how long your dance classes will be
          </Text>
          <ButtonGroup
            containerStyle={styles.ctnSegmentGender}
            buttons={this.lessonDurations}
            textStyle={stylesSignup.txtSegment}
            innerBorderStyle={stylesSignup.borderSegment}
            selectedButtonStyle={stylesSignup.butSegmentSelected}
            selectedTextStyle={stylesSignup.SegmentSelected}
            selectedIndex={this.state.durationLessonIndex}
            onPress={(index) => this.setState({durationLessonIndex: index})}
          />

          <Text style={[styles.txtLabel, stylesApp.mt12]}>
            How long do you need between dance classes?
          </Text>
          <ButtonGroup
            containerStyle={styles.ctnSegmentGender}
            buttons={this.restDurations}
            textStyle={stylesSignup.txtSegment}
            innerBorderStyle={stylesSignup.borderSegment}
            selectedButtonStyle={stylesSignup.butSegmentSelected}
            selectedTextStyle={stylesSignup.SegmentSelected}
            selectedIndex={this.state.durationRestIndex}
            onPress={(index) => this.setState({durationRestIndex: index})}
          />

          <Text style={[styles.txtLabel, stylesApp.mt14]}>
            Choose your available days to teach
          </Text>
          {this.renderDayOfWeeks()}

          <Text style={[styles.txtLabel, stylesApp.mt14]}>
            What's your available time to teach?
          </Text>

          {/* time */}
          <View style={stylesApp.flexRowCenter}>
            <Text style={styles.txtTimeLabel}>From</Text>

            <TouchableOpacity
              style={styles.viewTime}
              onPress={() => this.onTimeStart()}>
              <Text>{this.state.timeStart}</Text>
            </TouchableOpacity>

            <Text style={styles.txtTimeLabel}>To</Text>
            <TouchableOpacity
              style={styles.viewTime}
              onPress={() => this.onTimeEnd()}>
              <Text style={styles.pickerTime}>{this.state.timeEnd}</Text>
            </TouchableOpacity>
          </View>

          {/* time picker */}
          {this.renderTimePicker()}
        </View>
      </View>
    );
  }

  renderTypes() {
    return (
      <View style={stylesApp.mt24}>
        {this.types.map((s, i) => {
          return (
            <View key={i.toString()}>
              <CheckboxRound
                label={s}
                checked={this.state.typeIndex === i}
                onPress={() => this.onSelectType(i)}
              />
              {/* divider */}
              {i < this.types.length ? (
                <View style={styles.viewDivider} />
              ) : null}
            </View>
          );
        })}
      </View>
    );
  }

  renderDayOfWeeks() {
    const spacing = 14;
    const padding = 14;
    const itemWidth = (SCREEN_WIDTH - padding * 2 - spacing * 4) / 3;

    return (
      <View style={styles.viewTapContainer}>
        {this.dayOfWeeks.map((d, i) => {
          return (
            <CheckboxRound
              key={i.toString()}
              label={d}
              checked={this.isDayOfWeekSelected(i)}
              containerStyle={{
                width: itemWidth,
                marginLeft: i % 3 !== 0 ? spacing / 2 : 0,
                marginRight: i % 3 !== 2 ? spacing / 2 : 0,
              }}
              onPress={() => this.onSelectDayOfWeek(i)}
            />
          );
        })}
      </View>
    );
  }

  renderTimePicker() {
    if (Platform.OS === 'ios') {
      return (
        <SelectPicker
          isVisible={
            this.state.showTimePickerStart || this.state.showTimePickerEnd
          }
          contentStyle={stylesSignup.picker}
          onDismiss={(done) => this.dismissTime(done)}>
          {this.renderTimePickerCore()}
        </SelectPicker>
      );
    } else {
      if (!this.state.showTimePickerStart && !this.state.showTimePickerEnd) {
        return null;
      }

      return this.renderTimePickerCore();
    }
  }

  renderTimePickerCore() {
    return (
      <DateTimePicker
        value={this.timeSelected}
        mode="time"
        display="default"
        onChange={(event, selectedDate) =>
          this.onChangeTime(event, selectedDate)
        }
      />
    );
  }

  onSelectType(index) {
    this.setState({
      typeIndex: index,
    });
  }

  onSelectDayOfWeek(day) {
    const {availableDays} = this.state;
    const index = availableDays.findIndex((data) => data === day);

    if (index >= 0) {
      // remove if exist
      availableDays.splice(index, 1);
    } else {
      // add if not exist
      availableDays.push(day);
    }

    this.setState({availableDays});
  }

  isDayOfWeekSelected(day) {
    return this.state.availableDays.findIndex((data) => data === day) >= 0;
  }

  onChangeTime(event, selectedDate) {
    const strTime = moment(selectedDate).format('HH:mm');

    if (Platform.OS === 'ios') {
      if (selectedDate) {
        this.strTimeSelected = strTime;
      }
    } else {
      this.setState({
        showTimePickerStart: false,
        showTimePickerEnd: false,
      });

      // null if cancelled
      if (selectedDate) {
        if (this.state.showTimePickerStart) {
          this.setState({
            timeStart: strTime,
          });
        } else {
          this.setState({
            timeEnd: strTime,
          });
        }
      }
    }
  }

  dismissTime(done) {
    this.setState({
      showTimePickerStart: false,
      showTimePickerEnd: false,
    });
    this.keyboardView.moveMainView(0);

    // update date value based on done/canceled
    if (this.state.showTimePickerStart) {
      if (done) {
        this.setState({
          timeStart: this.strTimeSelected,
        });
      } else {
        this.strTimeSelected = this.state.timeStart;
      }
    } else {
      if (done) {
        this.setState({
          timeEnd: this.strTimeSelected,
        });
      } else {
        this.strTimeSelected = this.state.timeEnd;
      }
    }
  }

  onTimeStart() {
    if (this.state.timeStart) {
      this.timeSelected = moment(this.state.timeStart, 'HH:mm').toDate();
    }

    this.setState({
      showTimePickerStart: true,
    });
    this.keyboardView.moveMainView(HEIGHT_TIMER);
  }

  onTimeEnd() {
    if (this.state.timeEnd) {
      this.timeSelected = moment(this.state.timeEnd, 'HH:mm').toDate();
    }

    this.setState({
      showTimePickerEnd: true,
    });
    this.keyboardView.moveMainView(HEIGHT_TIMER);
  }

  onButNext() {}

  onSelectAge() {
    this.props.navigation.push(SelectList.NAV_NAME, {
      type: SELECT_AGE,
      values: this.state.ageGroups,
      onSave: this.onSaveItems.bind(this),
    });
  }

  onSaveItems(type, values) {
    super.onSaveItems(type, values);

    if (type === SELECT_AGE) {
      this.setState({
        ageGroups: values,
      });
    }
  }

  async onButSave() {
    try {
      if (this.props.UserReducer.isLoggedIn) {
        // show loading
        this.loadingHUD.show();

        await ApiService.updateTeacherInfo(
          this.state.ageGroups,
          this.state.danceLevels,
          this.state.styleBallroom,
          this.state.styleRythm,
          this.state.styleStandard,
          this.state.styleLatin,
          Number(this.state.price) ?? 0,
          this.state.availableDays,
          DURATIONS_LESSON[this.state.durationLessonIndex],
          DURATIONS_REST[this.state.durationRestIndex],
          this.state.timeStart,
          this.state.timeEnd,
        );
      }

      let user = this.currentUser;
      if (!user) {
        user = new User();
      }

      // set data
      user.ageGroups = this.state.ageGroups;
      user.danceLevels = this.state.danceLevels;
      user.styleBallroom = this.state.styleBallroom;
      user.styleRythm = this.state.styleRythm;
      user.styleStandard = this.state.styleStandard;
      user.styleLatin = this.state.styleLatin;
      user.price = Number(this.state.price);

      user.availableDays = this.state.availableDays;
      user.durationLesson = DURATIONS_LESSON[this.state.durationLessonIndex];
      user.durationRest = DURATIONS_REST[this.state.durationRestIndex];
      user.timeStart = this.state.timeStart;
      user.timeEnd = this.state.timeEnd;

      if (this.props.UserReducer.isLoggedIn) {
        UserHelper.saveUserToLocalStorage(user, this.props);

        // go back to prev page
        this.props.navigation.pop();
      } else {
        // save user to reduce
        this.props.setUserInfo(user);

        // go to signup page
        this.props.navigation.push(SignupBase.NAV_NAME, {
          userType: User.TYPE_TEACHER,
        });
      }
    } catch (e) {
      console.log(e);

      Alert.alert('Failed to save settings', e.message);
    }

    this.loadingHUD.hideAll();
  }
}

const mapStateToProps = (state) => state;

const mapDispatchToProps = {
  setUserInfo,
};

export default connect(mapStateToProps, mapDispatchToProps)(SettingProfile);
