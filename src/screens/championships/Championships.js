import React from 'react';
import {FlatList, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {Button, Icon} from 'react-native-elements';
import {styles} from './styles';
import {colors as colorTheme} from '../../styles/theme.style';
import {stylesApp, styleUtil} from '../../styles/app.style';
import {styles as stylesCart} from '../cart/styles';
import {styles as stylesAdd} from './add-championship/styles';
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

class Championships extends React.Component {
  static NAV_NAME = 'championships';

  state = {
    // ui
    showLoading: false,

    // data
    events: [],
  };

  currentUser = null;

  pageCount = 15;

  constructor(props) {
    super(props);

    props.navigation.setOptions({
      title: 'World Championships',
    });

    this.currentUser = props.UserReducer.user;
  }

  componentDidMount(): void {
    this.loadData();

    this._sub = this.props.navigation.addListener('focus', this._componentFocused);
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
          ListEmptyComponent={() => this.renderEmptyItem()}
          renderItem={({item, index}) => this.renderItem(item, index)}
          refreshing={this.state.showLoading}
        />

        {/* add */}
        {this.currentUser?.type === User.TYPE_TEACHER ? (
          <View style={[styleUtil.withShadow(), stylesCart.viewButBuy]}>
            <Button
              title="Create Championship"
              buttonStyle={stylesApp.butPrimary}
              titleStyle={stylesApp.titleButPrimary}
              onPress={() => this.onButCreate()}
            />
          </View>
        ) : null}
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

    return (
      <View style={stylesApp.viewLoading}>
        <Text style={stylesApp.txtEmptyItem}>No championships available yet</Text>
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
}

const mapStateToProps = (state) => state;
const mapDispatchToProps = {
  setEvents,
};

export default connect(mapStateToProps, mapDispatchToProps)(Championships);

