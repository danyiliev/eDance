import React from 'react';
import {styles} from './styles';
import {Dimensions, ScrollView, View} from 'react-native';
import {Calendar} from 'react-native-calendars';
import {colors as colorTheme} from '../../../styles/theme.style';
import {Button} from 'react-native-elements';
import {stylesApp} from '../../../styles/app.style';
import {TimeSlot} from '../../../models/order.model';
import CheckboxRound from '../../../components/CheckboxRound/CheckboxRound';
const {width: SCREEN_WDITH} = Dimensions.get('window');
import moment from 'moment';

export default class BookingDate extends React.Component {
  static NAV_NAME = 'booking-date';

  state = {
    selectedDate: '',
    timeSlots: [],
  };

  order = null;

  constructor(props) {
    super(props);

    // get parameter
    if (props.route.params) {
      this.order = props.route.params.order;
    }

    props.navigation.setOptions({
      title: 'Book Lesson',
      headerRight: () => (
        <Button
          type="clear"
          title="Next"
          titleStyle={stylesApp.butTitleNavRight}
          onPress={() => this.onButSave()}
        />
      ),
    });
  }

  componentDidMount(): void {
    this.getTimeSlots();
  }

  render() {
    return (
      <ScrollView style={stylesApp.viewContainer}>
        <View style={styles.viewContainer}>
          <View style={styles.viewCalendar}>
            <Calendar
              style={styles.calContainer}
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

  renderTimeSlots() {
    const spacing = 14;
    const padding = 14;
    const itemWidth = (SCREEN_WDITH - padding * 2) / 2;

    return (
      <View style={styles.viewTimeSlot}>
        {this.state.timeSlots.map((slot, i) => {
          return (
            <CheckboxRound
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

  getTimeSlots() {
    let startTime = moment(this.order.teacher?.timeStart, 'HH:mm');
    const endTime = moment(this.order.teacher?.timeEnd, 'HH:mm');
    const durationLesson = this.order.teacher?.durationLesson;
    const durationRest = this.order.teacher?.durationRest;

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
  }

  onDayPress = (day) => {
    this.setState({
      selectedDate: day.dateString,
    });
  };


  onButNext() {}
}
