import React from 'react';
import DismissKeyboard from '../../../components/DismissKeyboard/DismissKeyboard';
import {styles} from './styles';
import {styles as stylesSignup} from '../../signup/styles';
import {Dimensions, ScrollView, Text, TouchableOpacity, View, Platform, Alert} from 'react-native';
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

class SettingProfile extends BaseSettingProfile {
  static NAV_NAME = 'setting-profile';
  static NAV_NAME_SIGNUP = 'setting-profile-signup';

  restDurations = ['5 Minutes', '10 Minutes', '15 Minutes'];

  constructor(props) {
    super(props);

    this.state = {
      ...this.state,

      // data
      ageGroups: [],
      price: '',
      priceGroup: '',

      durationRestIndex: 0,
    };

    // init data
    if (this.currentUser) {
      this.state.ageGroups = this.currentUser.ageGroups;
      this.state.styleBallroom = this.currentUser.styleBallroom;
      this.state.styleRythm = this.currentUser.styleRythm;
      this.state.styleStandard = this.currentUser.styleStandard;
      this.state.styleLatin = this.currentUser.styleLatin;
      this.state.danceLevels = this.currentUser.danceLevels;
      this.state.price = this.currentUser.price?.toString();
      this.state.priceGroup = this.currentUser.priceGroup?.toString();

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
          <View style={[stylesApp.flexRowCenter, stylesApp.mt12]}>
            <Text style={styles.txtInputLabel}>Private Lesson: </Text>
            <View style={styles.viewInput}>
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

          {/* price group */}
          <View style={[stylesApp.flexRowCenter, stylesApp.mt4]}>
            <Text style={styles.txtInputLabel}>Group Lesson: </Text>
            <View style={styles.viewInput}>
              <Input
                containerStyle={styles.ctnInput}
                autoCapitalize={'none'}
                keyboardType="numeric"
                returnKeyType="done"
                placeholder="Input Price"
                placeholderTextColor={colorTheme.primary}
                inputStyle={styles.input}
                inputContainerStyle={stylesApp.input}
                onChangeText={(priceGroup) => {
                  this.setState({priceGroup});
                }}
                value={this.state.priceGroup}
                renderErrorMessage={false}
              />
              {/* right icon */}
              <Icon color={'#cecece'} type="font-awesome" name="usd" size={16} />
            </View>
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

  onSelectType(index) {
    this.setState({
      typeIndex: index,
    });
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
          Number(this.state.priceGroup) ?? 0,
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
      user.priceGroup = Number(this.state.priceGroup);

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
