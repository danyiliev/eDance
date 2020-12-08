import React from 'react';
import {Dimensions, Platform, Text, TouchableOpacity, View} from 'react-native';
import {styles} from './settings/setting-profile/styles';
import CheckboxRound from '../components/CheckboxRound/CheckboxRound';
import {
  DANCE_LEVELS,
  SELECT_AGE,
  SELECT_AMERICAN_BALLROOM,
  SELECT_AMERICAN_RHYTHM,
  SELECT_LATIN,
  SELECT_STANDARD,
} from '../constants/dance-data';
import {stylesApp} from '../styles/app.style';
import {styles as stylesSignup} from './signup/styles';
import {Icon} from 'react-native-elements';
import {colors as colorTheme} from '../styles/theme.style';
import TagItem from '../components/TagItem/TagItem';
import SelectList from './settings/select-list/SelectList';
import {LoadingHUD} from 'react-native-hud-hybrid';
import SelectPicker from '../components/SelectPicker/SelectPicker';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';

const {width: SCREEN_WIDTH} = Dimensions.get('window');
const HEIGHT_TIMER = 140;

export default class BaseSettingProfile extends React.Component {
  currentUser = null;

  lessonDurations = ['30 Minutes', '45 Minutes', 'An hour'];
  dayOfWeeks = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  timeSelected = new Date();
  strTimeSelected = '';

  constructor(props) {
    super(props);

    this.state = {
      // ui
      showTimePickerStart: false,
      showTimePickerEnd: false,

      danceLevels: [],

      styleBallroom: [],
      styleRythm: [],
      styleStandard: [],
      styleLatin: [],

      durationLessonIndex: 0,
      availableDays: [],
      timeStart: '',
      timeEnd: '',
    };

    this.loadingHUD = new LoadingHUD();

    this.currentUser = props.UserReducer.user;
  }

  renderDanceStyles() {
    return (
      <>
        <Text style={[stylesSignup.txtItemTitle, stylesApp.mt14]}>Dance Styles & Dances</Text>

        {/* american ballroom */}
        <TouchableOpacity onPress={() => this.onSelectStyle(SELECT_AMERICAN_BALLROOM)}>
          <View style={{...styles.viewListItem, ...stylesApp.mt14}}>
            <Text style={styles.txtItem}>American Ballroom</Text>

            {/* chevron */}
            <Icon type="ionicon" name="ios-arrow-forward" size={18} color={colorTheme.primary} />
          </View>
        </TouchableOpacity>

        {/* tags */}
        <View style={styles.viewTapContainer}>
          {this.state.styleBallroom.map((value, i) => {
            return <TagItem key={i.toString()} text={value} />;
          })}
        </View>

        {/* american rhythm */}
        <TouchableOpacity onPress={() => this.onSelectStyle(SELECT_AMERICAN_RHYTHM)}>
          <View style={{...styles.viewListItem, ...stylesApp.mt12}}>
            <Text style={styles.txtItem}>American Rhythm</Text>

            {/* chevron */}
            <Icon type="ionicon" name="ios-arrow-forward" size={18} color={colorTheme.primary} />
          </View>
        </TouchableOpacity>

        {/* tags */}
        <View style={styles.viewTapContainer}>
          {this.state.styleRythm.map((value, i) => {
            return <TagItem key={i.toString()} text={value} />;
          })}
        </View>

        {/* standard */}
        <TouchableOpacity onPress={() => this.onSelectStyle(SELECT_STANDARD)}>
          <View style={{...styles.viewListItem, ...stylesApp.mt12}}>
            <Text style={styles.txtItem}>Standard</Text>

            {/* chevron */}
            <Icon type="ionicon" name="ios-arrow-forward" size={18} color={colorTheme.primary} />
          </View>
        </TouchableOpacity>

        {/* tags */}
        <View style={styles.viewTapContainer}>
          {this.state.styleStandard.map((value, i) => {
            return <TagItem key={i.toString()} text={value} />;
          })}
        </View>

        {/* latin */}
        <TouchableOpacity onPress={() => this.onSelectStyle(SELECT_LATIN)}>
          <View style={{...styles.viewListItem, ...stylesApp.mt12}}>
            <Text style={styles.txtItem}>Latin</Text>

            {/* chevron */}
            <Icon type="ionicon" name="ios-arrow-forward" size={18} color={colorTheme.primary} />
          </View>
        </TouchableOpacity>

        {/* tags */}
        <View style={styles.viewTapContainer}>
          {this.state.styleLatin.map((value, i) => {
            return <TagItem key={i.toString()} text={value} />;
          })}
        </View>
      </>
    );
  }

  renderLevels() {
    const spacing = 14;

    return (
      <View>
        <Text style={styles.txtFormLabel}>Closed</Text>
        <View style={styles.viewLevels}>
          {/* beginner */}
          <CheckboxRound
            label="Newcomer"
            checked={this.isLevelSelected(DANCE_LEVELS.CLOSED_NEWCOMER)}
            onPress={() => this.onSelectLevel(DANCE_LEVELS.CLOSED_NEWCOMER)}
          />

          <View style={stylesApp.flexRow}>
            {[1, 2, 3].map((s, i) => {
              return (
                <CheckboxRound
                  key={i.toString()}
                  containerStyle={{
                    flex: 1,
                    paddingLeft: i % 3 !== 0 ? spacing / 2 : 0,
                    paddingRight: i % 3 !== 2 ? spacing / 2 : 0,
                  }}
                  label={`Bronze ${s}`}
                  checked={this.isLevelSelected(DANCE_LEVELS.CLOSED_BRONZE[i])}
                  onPress={() => this.onSelectLevel(DANCE_LEVELS.CLOSED_BRONZE[i])}
                />
              );
            })}
          </View>

          <View style={stylesApp.flexRow}>
            {[1, 2, 3].map((s, i) => {
              return (
                <CheckboxRound
                  key={i.toString()}
                  containerStyle={{
                    flex: 1,
                    paddingLeft: i % 3 !== 0 ? spacing / 2 : 0,
                    paddingRight: i % 3 !== 2 ? spacing / 2 : 0,
                  }}
                  label={`Silver ${s}`}
                  checked={this.isLevelSelected(DANCE_LEVELS.CLOSED_SILVER[i])}
                  onPress={() => this.onSelectLevel(DANCE_LEVELS.CLOSED_SILVER[i])}
                />
              );
            })}
          </View>

          <View style={stylesApp.flexRow}>
            {[1, 2, 3].map((s, i) => {
              return (
                <CheckboxRound
                  key={i.toString()}
                  containerStyle={{
                    flex: 1,
                    paddingLeft: i % 3 !== 0 ? spacing / 2 : 0,
                    paddingRight: i % 3 !== 2 ? spacing / 2 : 0,
                  }}
                  label={`Gold ${s}`}
                  checked={this.isLevelSelected(DANCE_LEVELS.CLOSED_GOLD[i])}
                  onPress={() => this.onSelectLevel(DANCE_LEVELS.CLOSED_GOLD[i])}
                />
              );
            })}
          </View>

          {/* advanced */}
          <CheckboxRound
            label="Gold Advanced"
            checked={this.isLevelSelected(DANCE_LEVELS.CLOSED_GOLD_ADVANCED)}
            onPress={() => this.onSelectLevel(DANCE_LEVELS.CLOSED_GOLD_ADVANCED)}
          />
        </View>

        <Text style={styles.txtFormLabel}>Open</Text>
        <View style={styles.viewLevels}>
          <View style={stylesApp.flexRow}>
            {/* pre-bronze */}
            <CheckboxRound
              label="Pre-Bronze"
              checked={this.isLevelSelected(DANCE_LEVELS.OPEN_PREBRONZE)}
              containerStyle={{
                flex: 1,
                paddingRight: spacing,
              }}
              onPress={() => this.onSelectLevel(DANCE_LEVELS.OPEN_PREBRONZE)}
            />
            {/* bronze */}
            <CheckboxRound
              label="Bronze"
              checked={this.isLevelSelected(DANCE_LEVELS.OPEN_BRONZE)}
              containerStyle={{
                flex: 1,
                paddingLeft: spacing,
              }}
              onPress={() => this.onSelectLevel(DANCE_LEVELS.OPEN_BRONZE)}
            />
          </View>

          <View style={stylesApp.flexRow}>
            {/* pre-silver */}
            <CheckboxRound
              label="Pre-Silver"
              checked={this.isLevelSelected(DANCE_LEVELS.OPEN_PRESILVER)}
              containerStyle={{
                flex: 1,
                paddingRight: spacing,
              }}
              onPress={() => this.onSelectLevel(DANCE_LEVELS.OPEN_PRESILVER)}
            />
            {/* silver */}
            <CheckboxRound
              label="Silver"
              checked={this.isLevelSelected(DANCE_LEVELS.OPEN_SILVER)}
              containerStyle={{
                flex: 1,
                paddingLeft: spacing,
              }}
              onPress={() => this.onSelectLevel(DANCE_LEVELS.OPEN_SILVER)}
            />
          </View>

          <View style={stylesApp.flexRow}>
            {/* gold */}
            <CheckboxRound
              label="Gold"
              checked={this.isLevelSelected(DANCE_LEVELS.OPEN_GOLD)}
              containerStyle={{
                flex: 1,
                paddingRight: spacing,
              }}
              onPress={() => this.onSelectLevel(DANCE_LEVELS.OPEN_GOLD)}
            />
            {/* gold advanced */}
            <CheckboxRound
              label="Gold Advanced"
              checked={this.isLevelSelected(DANCE_LEVELS.OPEN_GOLD_ADVANCED)}
              containerStyle={{
                flex: 1,
                paddingLeft: spacing,
              }}
              onPress={() => this.onSelectLevel(DANCE_LEVELS.OPEN_GOLD_ADVANCED)}
            />
          </View>
        </View>
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
        display="spinner"
        onChange={(event, selectedDate) =>
          this.onChangeTime(event, selectedDate)
        }
      />
    );
  }

  isLevelSelected(level) {
    return this.state.danceLevels.findIndex((data) => data === level) >= 0;
  }

  onSelectLevel(level) {
    const {danceLevels} = this.state;
    const index = danceLevels.findIndex((data) => data === level);

    if (index >= 0) {
      // remove if exist
      danceLevels.splice(index, 1);
    } else {
      // add if not exist
      danceLevels.push(level);
    }

    this.setState({danceLevels});
  }

  onSelectStyle(type) {
    let values = [];

    if (type === SELECT_AMERICAN_BALLROOM) {
      values = this.state.styleBallroom;
    } else if (type === SELECT_AMERICAN_RHYTHM) {
      values = this.state.styleRythm;
    } else if (type === SELECT_STANDARD) {
      values = this.state.styleStandard;
    } else if (type === SELECT_LATIN) {
      values = this.state.styleLatin;
    }

    this.props.navigation.push(SelectList.NAV_NAME, {
      type: type,
      values: values,
      onSave: this.onSaveItems.bind(this),
    });
  }

  onTimeStart(moveView = true) {
    if (this.state.timeStart) {
      this.timeSelected = moment(this.state.timeStart, 'HH:mm').toDate();
      this.strTimeSelected = this.state.timeStart;
    } else {
      this.strTimeSelected = moment().format('HH:mm');
    }

    this.setState({
      showTimePickerStart: true,
    });

    if (moveView) {
      this.keyboardView.moveMainView(HEIGHT_TIMER);
    }
  }

  onTimeEnd() {
    if (this.state.timeEnd) {
      this.timeSelected = moment(this.state.timeEnd, 'HH:mm').toDate();
      this.strTimeSelected = this.state.timeEnd;
    } else {
      this.strTimeSelected = moment().format('HH:mm');
    }

    this.setState({
      showTimePickerEnd: true,
    });
    this.keyboardView.moveMainView(HEIGHT_TIMER);
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

  onSaveItems(type, values) {
    if (type === SELECT_AMERICAN_BALLROOM) {
      this.setState({
        styleBallroom: values,
      });
    } else if (type === SELECT_AMERICAN_RHYTHM) {
      this.setState({
        styleRythm: values,
      });
    } else if (type === SELECT_STANDARD) {
      this.setState({
        styleStandard: values,
      });
    } else if (type === SELECT_LATIN) {
      this.setState({
        styleLatin: values,
      });
    }
  }
}
