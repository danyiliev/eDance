import React from 'react';
import {styles} from './styles';
import {ActivityIndicator, Dimensions, ScrollView, Text, View} from 'react-native';
import {Calendar} from 'react-native-calendars';
import {colors as colorTheme} from '../../../styles/theme.style';
import {Button} from 'react-native-elements';
import {stylesApp} from '../../../styles/app.style';
import {TimeSlot} from '../../../models/lesson.model';
import CheckboxRound from '../../../components/CheckboxRound/CheckboxRound';
import moment from 'moment';
import {Utils} from '../../../helpers/utils';
import ScheduleCheckout from '../../schedule/schedule-checkout/ScheduleCheckout';
import _ from 'lodash';
import {ApiService} from '../../../services';

const {width: SCREEN_WDITH} = Dimensions.get('window');

export default class BookingDate extends React.Component {
  static NAV_NAME = 'booking-date';

  state = {
    // ui
    showLoading: true,

    selectedDate: '',
    timeSlots: [],

    markedDates: {},
  };

  selectedDate = '';
  periods = {};
  lesson = null;

  constructor(props) {
    super(props);

    // get parameter
    if (props.route.params) {
      this.lesson = props.route.params.lesson;
    }
    this.renderRightButton();

    props.navigation.setOptions({
      title: `Book ${this.lesson.group ? 'Group' : 'Private'} Lesson`,
    });

    // select today as default
    this.selectedDate = moment().format('YYYY-MM-DD');
  }

  componentDidMount(): void {
    this.markDatesByMonth(moment().format('YYYY-MM'));
    this.onDayPress(moment().format('YYYY-MM-DD'));
  }

  render() {
    const today = moment().format('YYYY-MM-DD');

    return (
      <ScrollView style={stylesApp.viewContainer}>
        <View style={styles.viewContainer}>
          <View style={styles.viewCalendar}>
            <Calendar
              style={styles.calContainer}
              minDate={today}
              theme={{
                arrowColor: colorTheme.light,
                monthTextColor: colorTheme.light,
                textMonthFontSize: 24,
                textMonthFontWeight: '600',
                textDayHeaderFontSize: 10,
                textSectionTitleColor: colorTheme.grey,
                textDayFontSize: 16,
                textDayFontWeight: '600',
                dayTextColor: colorTheme.primary,
                selectedDayBackgroundColor: colorTheme.primary,
                'stylesheet.calendar.header': {
                  header: styles.calHeader,
                },
                'stylesheet.calendar.main': {
                  container: styles.calMain,
                  monthView: styles.calMonthView,
                },
              }}
              onDayPress={(day) => this.onDayPress(day.dateString)}
              markedDates={this.state.markedDates}
              markingType={'multi-dot'}
            />
          </View>

          {/* time slot lists */}
          {this.renderTimeSlots()}
        </View>
      </ScrollView>
    );
  }

  renderRightButton() {
    this.props.navigation.setOptions({
      headerRight: () => (
        <Button
          type="clear"
          title="Next"
          titleStyle={stylesApp.butTitleNavRight}
          disabled={!this.isTimeSelected()}
          onPress={() => this.onButNext()}
        />
      ),
    });
  }

  renderTimeSlots() {
    if (this.state.showLoading) {
      return (
        <View style={stylesApp.viewLoading}>
          <ActivityIndicator animating={true} />
        </View>
      );
    }

    // no result
    if (this.state.timeSlots.length <= 0) {
      return (
        <View style={stylesApp.viewLoading}>
          <Text style={stylesApp.txtEmptyItem}>No available time slots</Text>
        </View>
      );
    }

    const spacing = 14;
    const padding = 14;
    const itemWidth = (SCREEN_WDITH - padding * 2) / 2;

    return (
      <View style={styles.viewTimeSlot}>
        {this.state.timeSlots.map((slot, i) => {
          return (
            <CheckboxRound
              key={i.toString()}
              label={slot.toString()}
              checked={slot.selected}
              onPress={() => this.onSelectTimeSlot(i)}
              containerStyle={{
                width: itemWidth,
                padding: spacing,
                paddingVertical: 4,
              }}
            />
          );
        })}
      </View>
    );
  }

  markDatesByMonth(strMonth) {
    const start = moment(`${strMonth}-01`);
    const end = moment(`${strMonth}-${start.daysInMonth()}`);

    // get today without time
    const now = moment().startOf('day');

    this.periods = {};

    //
    // get available dates based on day of week
    //
    let date = start.isBefore(now) ? now : start;
    const dotAvailable = {key: 'available', color: colorTheme.primary, selectedDotColor: colorTheme.light};

    do {
      const weekday = date.isoWeekday() - 1;
      if (this.lesson.teacher?.availableDays.includes(weekday)) {
        this.periods[date.format('YYYY-MM-DD')] = {
          dots: [dotAvailable],
        };
      }

      date.add(1, 'days');
    } while (date.isSameOrBefore(end));

    this.setState({markedDates: this.periods});
  }

  setMarkedDates() {
    const periods = _.clone(this.periods);

    if (this.selectedDate) {
      periods[this.selectedDate] = {
        ...periods[this.selectedDate],
        selected: true,
      };
    }

    this.setState({
      markedDates: periods,
    });
  }

  async getTimeSlots() {
    // show loading
    this.setState({
      timeSlots: [],
      showLoading: true,
    });

    if (!(this.selectedDate in this.state.markedDates)) {
      // no time slots
      this.setState({
        showLoading: false,
      });

      return;
    }

    // load lessons of selected day
    let lessons = [];
    try {
      lessons = await ApiService.getLessonsByTeacher(this.lesson.teacher?.id, this.selectedDate);
      // lessons = await ApiService.getLessonsByTeacher(this.lesson.teacher?.id, '2020-11-09');
      console.log(lessons);
    } catch (e) {
      console.log(e);
    }

    // hide loading
    this.setState({
      showLoading: false,
    });

    let startTime = moment(this.lesson.teacher?.timeStart, 'HH:mm');
    const endTime = moment(this.lesson.teacher?.timeEnd, 'HH:mm');
    const durationLesson = this.lesson.teacher?.durationLesson;
    const durationRest = this.lesson.teacher?.durationRest;

    const timeSlots = [];

    do {
      let isTaken = false;

      const start = startTime.clone();
      const end = startTime.add(durationLesson, 'm');

      // check if time slot is already taken
      for (const l of lessons) {
        const lessonStart = moment(l.getMinTime(), 'HH:mm');
        const lessonEnd = moment(l.getMaxTime(), 'HH:mm');

        if (start.isBetween(lessonStart, lessonEnd) || end.isBetween(lessonStart, lessonEnd)) {
          isTaken = true;
          break;
        }
        if (lessonStart.isBetween(start, end) || lessonEnd.isBetween(start, end)) {
          isTaken = true;
          break;
        }
      }

      if (!isTaken) {
        const slot = new TimeSlot();
        slot.start = start.format('HH:mm');
        slot.end = end.format('HH:mm');

        timeSlots.push(slot);
      }
    } while (!startTime.add(durationRest, 'm').isAfter(endTime));

    // update UI
    this.setState({timeSlots});
  }

  onSelectTimeSlot(index) {
    const {timeSlots} = this.state;
    timeSlots[index].selected = !timeSlots[index].selected;

    this.setState({timeSlots});

    this.renderRightButton();
  }

  isTimeSelected() {
    return this.state.timeSlots.findIndex((t) => t.selected) >= 0;
  }

  onDayPress(date) {
    this.selectedDate = date;
    this.setMarkedDates();

    this.getTimeSlots();
  }

  onButNext() {
    this.lesson.date = this.state.selectedDate;
    this.lesson.timeSlots = this.state.timeSlots.filter((t) => t.selected);

    // go to confirm page
    this.props.navigation.push(ScheduleCheckout.NAV_NAME, {
      lesson: this.lesson,
    });
  }
}
