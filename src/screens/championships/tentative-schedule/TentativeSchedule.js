import React from 'react';
import {connect} from 'react-redux';
import {Alert, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {stylesApp, styleUtil} from '../../../styles/app.style';
import {styles} from './styles';
import {Button, Icon} from 'react-native-elements';
import {colors as colorTheme} from '../../../styles/theme.style';
import {UiHelper} from '../../../helpers/ui-helper';
import {DanceHelper} from '../../../helpers/dance-helper';
import {Event, EventSession} from '../../../models/event.model';
import moment from 'moment';
import AddSession from '../add-session/AddSession';
import Toast from 'react-native-simple-toast';
import AddPrize from '../add-prize/AddPrize';

class TentativeSchedule extends React.Component {
  static NAV_NAME = 'tentative-schedule';
  static NAV_NAME_SIGNUP = 'tentative-schedule-signup';

  state = {
    // ui
    showTimePicker: false,

    sessions: [],
  };

  event = null;

  constructor(props) {
    super(props);

    props.navigation.setOptions({
      title: 'Tentative Schedule',
    });

    // get parameter
    if (props.route.params) {
      this.event = props.route.params.event;
    }
  }

  render() {
    return (
      <View style={stylesApp.viewContainer}>
        <ScrollView bounces={false}>
          <View style={styles.viewContainer}>
            {this.state.sessions.map((s, i) => {
              return this.renderSession(s, i);
            })}

            <Text style={styles.txtSessionLabel}>
              Session {this.state.sessions.length + 1}
            </Text>
            <View style={styles.viewForm}>
              <TouchableOpacity onPress={() => this.onAddSession()}>
                <View style={stylesApp.viewLoading}>
                  <Icon color={colorTheme.grey} type="ionicon" name="ios-add" size={100} />
                </View>
              </TouchableOpacity>
            </View>
          </View>

          {/* time picker */}
          {UiHelper.getInstance().renderDateTimePicker(
            this,
            'datetime',
            (time) => {
              this.onSelectTime(time);
            },
            'Select Time For Event',
          )}

          {/* save */}
          <View style={[styleUtil.withShadow(), styles.viewButSave]}>
            <Button
              title="Next"
              buttonStyle={stylesApp.butPrimary}
              titleStyle={stylesApp.titleButPrimary}
              onPress={() => this.onButNext()}
            />
          </View>
        </ScrollView>
      </View>
    );
  }

  renderSession(session, index) {
    return (
      <View key={index.toString()}>
        <Text style={styles.txtSessionLabel}>Session {index + 1}</Text>
        <View style={styles.viewForm}>
          {/* delete */}
          <Button
            type="clear"
            icon={<Icon type="font-awesome" name="trash" size={18} color={colorTheme.primary} />}
            containerStyle={styles.ctnButDelete}
            onPress={() => this.onDelete(index)}
          />

          {/* time */}
          <View style={stylesApp.flexRowCenter}>
            <Text style={styles.txtFormLabel}>Date & Time: </Text>
            <Text style={styles.txtFormValue}>{session.startAt}</Text>
          </View>

          {this.renderSessionTypes(index)}
        </View>
      </View>
    );
  }

  renderSessionTypes(index) {
    const types = this.state.sessions[index].types;

    if (types.length <= 0) {
      return (
        <TouchableOpacity onPress={() => this.onAddSessionContent(index)}>
          <View style={stylesApp.viewLoading}>
            <Text style={stylesApp.txtEmptyItem}>Click here to add session items</Text>
          </View>
        </TouchableOpacity>
      );
    }

    const viewTypes = types.map((t, idx) => {
      return (
        <View key={`session${index}-type${idx}`}>
          <Text style={styles.txtSessionType}>{t.type}</Text>

          {t.danceStyles.map((s, i) => {
            return (
              <Text key={`session${index}-type${i}-style${i}`} style={styles.txtSessionDanceStyle}>
                {DanceHelper.danceStyleNameByVal(s)}
              </Text>
            );
          })}
        </View>
      );
    });

    return <TouchableOpacity onPress={() => this.onAddSessionContent(index)}>{viewTypes}</TouchableOpacity>;
  }

  onAddSession() {
    // show time picker
    UiHelper.getInstance().timeSelected = new Date();

    this.setState({
      showTimePicker: true,
    });
  }

  onSelectTime(time) {
    const sessionNew = new EventSession();
    sessionNew.startAt = moment(time).format('YYYY-MM-DD HH:mm');

    const {sessions} = this.state;
    sessions.push(sessionNew);

    this.setState({sessions});
  }

  onAddSessionContent(index) {
    // go to add session page
    this.props.navigation.push(
      this.props.UserReducer.isLoggedIn ? AddSession.NAV_NAME : AddSession.NAV_NAME_SIGNUP,
      {
        session: this.state.sessions[index],
        onSave: (types) => this.onSaveTypes(index, types),
      },
    );
  }

  onSaveTypes(index, types) {
    const {sessions} = this.state;
    sessions[index].types = types;

    this.setState({sessions});
  }

  onDelete(index) {
    Alert.alert(
      'Are you sure you want to remove this session?',
      '',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'Yes', onPress: () => this.doDeleteItem(index)},
      ],
      {cancelable: true},
    );
  }

  doDeleteItem(index) {
    const {sessions} = this.state;
    sessions.splice(index, 1);

    this.setState({sessions});
  }

  onButNext() {
    // check sessions are added
    if (this.state.sessions.length <= 0) {
      Toast.show('Session should be added first');
      return;
    }

    // check all sessions are filled
    for (const s of this.state.sessions) {
      if (s.types.length <= 0) {
        Toast.show('All event sessions should be filled.');
        return;
      }
    }

    this.event.sessions = this.state.sessions;

    // go to add prize page
    this.props.navigation.push(
      this.props.UserReducer.isLoggedIn ? AddPrize.NAV_NAME : AddPrize.NAV_NAME_SIGNUP,
      {
        event: this.event,
      },
    );
  }
}

const mapStateToProps = (state) => state;

export default connect(mapStateToProps, null)(TentativeSchedule);
