import React from 'react';
import {styles} from './styles';
import {ActivityIndicator, Dimensions, ScrollView, View} from 'react-native';
import {Calendar} from 'react-native-calendars';
import {colors as colorTheme} from '../../../styles/theme.style';
import {Button} from 'react-native-elements';
import {stylesApp} from '../../../styles/app.style';
import {TimeSlot} from '../../../models/lesson.model';
import CheckboxRound from '../../../components/CheckboxRound/CheckboxRound';
const {width: SCREEN_WDITH} = Dimensions.get('window');
import moment from 'moment';
import {Utils} from '../../../helpers/utils';
import ScheduleCheckout from '../../schedule/schedule-checkout/ScheduleCheckout';

export default class BookingDate extends React.Component {
  static NAV_NAME = 'booking-date';

  state = {
    // ui
    showLoading: true,

    selectedDate: '',
    timeSlots: [],
  };

  lesson = null;

  constructor(props) {
    super(props);

    props.navigation.setOptions({
      title: 'Book Lesson',
    });

    // get parameter
    if (props.route.params) {
      this.lesson = props.route.params.lesson;
    }
    this.renderRightButton();

    // select today as default
    this.state.selectedDate = moment().format('YYYY-MM-DD');
  }

  componentDidMount(): void {
    this.getTimeSlots();
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
              onDayPress={this.onDayPress}
              markedDates={{
                [this.state.selectedDate]: {
                  selected: true,
                },
              }}
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

  async getTimeSlots() {
    // show loading
    this.setState({
      showLoading: true,
    });

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
      const slot = new TimeSlot();
      slot.start = startTime.format('HH:mm');
      slot.end = startTime.add(durationLesson, 'm').format('HH:mm');

      timeSlots.push(slot);
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

  onDayPress = (day) => {
    this.setState({
        selectedDate: day.dateString,
        timeSlots: [],
      },
      () => {
        this.renderRightButton();
        this.getTimeSlots();
      },
    );
  };

  onButNext() {
    this.lesson.date = this.state.selectedDate;
    this.lesson.timeSlots = this.state.timeSlots.filter((t) => t.selected);

    // go to confirm page
    this.props.navigation.push(ScheduleCheckout.NAV_NAME, {
      lesson: this.lesson,
    });
  }
}
