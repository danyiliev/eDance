import React from 'react';
import {styles} from './styles';
import {View} from 'react-native';
import {Calendar} from 'react-native-calendars';
import {colors as colorTheme} from '../../../styles/theme.style';
import {Button} from 'react-native-elements';
import {stylesApp} from '../../../styles/app.style';

export default class BookingDate extends React.Component {
  static NAV_NAME = 'booking-date';

  state = {
    selectedDate: '',
  };

  constructor(props) {
    super(props);

    props.navigation.setOptions({
      title: 'Book lesson'
    });
  }

  render() {
    return (
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
              }
            }}
            onDayPress={this.onDayPress}
            markedDates={{
              [this.state.selectedDate]: {
                selected: true,
              }
            }}/>
        </View>

        <View style={styles.viewButNext}>
          <Button
            title="CHECKOUT"
            buttonStyle={stylesApp.butPrimary}
            titleStyle={stylesApp.titleButPrimary}
            onPress={() => this.onButNext()}
          />
        </View>

      </View>
    );
  }

  onDayPress = (day) => {
    this.setState({
      selectedDate: day.dateString,
    });
  };

  onButNext() {

  }
}
