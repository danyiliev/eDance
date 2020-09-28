import React from 'react';
import {FlatList, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {Button, Icon} from 'react-native-elements';
import {styles} from './styles';
import {colors as colorTheme} from '../../styles/theme.style';
import {stylesApp, styleUtil} from '../../styles/app.style';
import {styles as stylesCart} from '../cart/styles';
import {styles as stylesAdd} from './tentative-schedule/styles';
import {styles as stylesDate} from '../booking/booking-date/styles';
import Reviews from '../reviews/Reviews';
import AddChampionship from './add-championship/AddChampionship';
import {setUserInfo} from '../../actions/user';
import {connect} from 'react-redux';
import {User} from '../../models/user.model';
import {Event, EventSession, SessionType} from '../../models/event.model';
import {DanceHelper} from '../../helpers/dance-helper';
import {SELECT_AMERICAN_BALLROOM} from '../../constants/dance-data';
import ChampionshipDetail from './championship-detail/ChampionshipDetail';
import {ApiService} from '../../services';
import {setEvents} from '../../actions/event';
import {Calendar} from 'react-native-calendars';
import moment from 'moment';
import _ from 'lodash';

class Championships extends React.Component {
  static NAV_NAME = 'championships';

  state = {
    // ui
    showLoading: false,
    currentDate: '',

    markedDates: {},

    // data
    events: [],
  };

  periods = {};
  selectedDate = '';
  currentUser = null;

  eventsAll = [];
  pageCount = 15;

  constructor(props) {
    super(props);

    props.navigation.setOptions({
      title: 'World Championships',
    });

    this.currentUser = props.UserReducer.user;
  }

  componentDidMount(): void {
    this._sub = this.props.navigation.addListener('focus', this._componentFocused);

    this.loadDataByMonth(moment().format('YYYY-MM'));
  }

  componentWillUnmount(): void {
    this._sub();
  }

  render() {
    return (
      <View style={stylesApp.viewContainer}>
        <FlatList
          contentContainerStyle={stylesCart.listCtnContainer}
          keyExtractor={(item, index) => index.toString()}
          data={this.state.events}
          ListHeaderComponent={() => this.renderListHeader()}
          ListEmptyComponent={() => this.renderEmptyItem()}
          renderItem={({item, index}) => this.renderItem(item, index)}
          refreshing={this.state.showLoading}
        />

        {/* add */}
        <View style={[styleUtil.withShadow(), stylesCart.viewButBuy]}>
          <Button
            title="Create Championship"
            buttonStyle={stylesApp.butPrimary}
            titleStyle={stylesApp.titleButPrimary}
            onPress={() => this.onButCreate()}
          />
        </View>
      </View>
    );
  }

  renderItem(item, index) {
    return (
      <View>
        <View style={styles.viewEventHeader}>
          <Text style={styles.txtEventLabel}>Event Id: {item.id}</Text>
        </View>

        {item.sessions.map((s, i) => {
          return this.renderSession(item, s, i);
        })}
      </View>
    );
  }

  renderListHeader() {
    return (
      <Calendar
        current={this.state.currentDate}
        style={styles.calContainer}
        onMonthChange={(month) => this.onMonthChange(month)}
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
            header: stylesDate.calHeader,
          },
          'stylesheet.calendar.main': {
            container: stylesDate.calMain,
            monthView: stylesDate.calMonthView,
          },
        }}
        markedDates={this.state.markedDates}
        // Date marking style [simple/period/multi-dot/custom]. Default = 'simple'
        markingType="multi-period"
        onDayPress={(day) => this.onDayPress(day)}
      />
    );
  }

  renderSession(event, session, index) {
    return (
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => this.onSessionItem(event, session)}
        key={`session${index}`}>
        <View style={styles.viewItem}>
          {/* time */}
          <View style={stylesApp.flexRowCenter}>
            <Text style={stylesAdd.txtFormLabel}>Date & Time: </Text>
            <Text style={stylesAdd.txtFormValue}>{session.startAt}</Text>
          </View>

          {this.renderSessionTypes(session.types)}

          <View style={styles.viewSessionFooter}>
            <Text>{session.entryCount} Entries</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  renderSessionTypes(types) {
    const viewTypes = types.map((t, i) => {
      return (
        <View key={`sessionType${i}`}>
          <Text style={styles.txtSessionType}>{t.type}</Text>
        </View>
      );
    });

    return viewTypes;
  }

  _componentFocused = () => {
    this.refreshList();
  };

  refreshList() {
    this.setState({
      events: this.props.EventReducer.events,
    });
  }

  onButCreate() {
    // go to create page
    this.props.navigation.push(AddChampionship.NAV_NAME);
  }

  renderEmptyItem() {
    // do not show anything when loading progress
    if (this.state.showLoading) {
      return null;
    }

    let emptyNotice = 'No championships available this month';
    if (this.selectedDate) {
      emptyNotice = 'No championships available this day';
    }

    return (
      <View style={stylesApp.viewLoading}>
        <Text style={stylesApp.txtEmptyItem}>{emptyNotice}</Text>
      </View>
    );
  }

  onSessionItem(event, session) {
    // go to event detail page
    this.props.navigation.push(ChampionshipDetail.NAV_NAME, {
      event: event,
      session: session,
    });
  }

  async loadData(continued = false) {
    let indexFrom = 0;

    if (!continued) {
      // show loading mark
      this.setState({
        showLoading: true,
      });
    } else {
      indexFrom = this.state.events.length;
    }

    try {
      let events = await ApiService.getEvents(indexFrom, this.pageCount);

      if (indexFrom > 0) {
        // attach
        events = [...this.state.events, ...events];
      }

      // save to store
      this.props.setEvents(events);
      this.setState({events});
    } catch (e) {
      console.log(e);
    }

    this.setState({
      showLoading: false,
    });
  }

  async loadDataByMonth(strMonth) {
    try {
      // show loading mark
      await this.setState({
        showLoading: true,
      });

      this.eventsAll = await ApiService.getEventsByMonth(strMonth);

      // set start & end dates for marking
      const periods = {};
      for (const e of this.eventsAll) {
        let current = moment(e.startDate());
        do {
          const strCurrent = current.format('YYYY-MM-DD');
          if (!(strCurrent in periods)) {
            periods[strCurrent] = {
              periods: [],
            };
          }

          let p = null;
          if (current.diff(moment(e.startDate()), 'days') === 0) {
            // start date
            p = {startingDay: true, endingDay: false, color: colorTheme.red}
          }
          if (current.diff(moment(e.endDate()), 'days') === 0) {
            // start date
            p = {startingDay: false, endingDay: true, color: colorTheme.red}
          }
          if (!p) {
            p = {color: colorTheme.red};
          }

          periods[strCurrent].periods.push(p);

          current = current.add(1, 'day');
        } while ((moment(e.endDate()).diff(current), 'days') > 0);
      }

      // save to store
      this.props.setEvents(this.eventsAll);
      await this.setState({events: this.eventsAll});

      // init ui data
      this.periods = periods;
      this.selectedDate = '';

      this.setMarkedDates();

    } catch (e) {
      console.log(e);
    }

    this.setState({
      showLoading: false,
    });
  }

  onMonthChange(cal) {
    if (!cal.month || !cal.year) {
      return;
    }

    const strMonth = moment()
      .set('month', cal.month - 1)
      .set('year', cal.year)
      .format('YYYY-MM');

    this.setState({
      currentDate: strMonth,
    });

    this.loadDataByMonth(strMonth);
  }

  onDayPress(calc) {
    this.selectedDate = calc.dateString;
    this.setMarkedDates();

    // extract events on the date
    const events = [];
    for (const e of this.eventsAll) {
      for (const session of e.sessions) {
        if (moment(session.startAt).isSame(calc.dateString, 'day')) {
          events.push(e);

          break;
        }
      }
    }

    this.setState({events});
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
}

const mapStateToProps = (state) => state;
const mapDispatchToProps = {
  setEvents,
};

export default connect(mapStateToProps, mapDispatchToProps)(Championships);

