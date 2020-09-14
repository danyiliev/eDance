import React from 'react';
import {Alert, FlatList, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {styles} from './styles';
import {Button, Icon} from 'react-native-elements';
import {colors as colorTheme} from '../../../styles/theme.style';
import {stylesApp, styleUtil} from '../../../styles/app.style';
import {styles as stylesCart} from '../../cart/styles';
import Reviews from '../../reviews/Reviews';
import AddSession from '../add-session/AddSession';
import {UiHelper} from '../../../helpers/ui-helper';
import moment from 'moment';
import {Event, EventSession} from '../../../models/event.model';
import {DanceHelper} from '../../../helpers/dance-helper';
import AddPrize from '../add-prize/AddPrize';

export default class AddChampionship extends React.Component {
  static NAV_NAME = 'add-championship';

  state = {
    // ui
    showTimePicker: false,

    sessions: [],
  };

  menus = [
    'Tentative Schedule',
    'Cash Prizes & Awards',
    'Hotel & Package Prices',
    'Entry Fees',
    'Concellation & Refund Policy',
    'Closed Restricted Syllabus Competition & Schedules',
    'Open Unrestricted Syllabus Championships & Schedules',
  ];

  constructor(props) {
    super(props);

    props.navigation.setOptions({
      title: 'Tentative Schedule',
    });
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
              onPress={() => this.onButSave()}
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

    const viewTypes = types.map((t, i) => {
      return (
        <View>
          <Text style={styles.txtSessionType}>{t.type}</Text>

          {t.danceStyles.map((s, i) => {
            return <Text style={styles.txtSessionDanceStyle}>{DanceHelper.danceStyleNameByVal(s)}</Text>;
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
    this.props.navigation.push(AddSession.NAV_NAME, {
      session: this.state.sessions[index],
      onSave: (types) => this.onSaveTypes(index, types),
    });
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

  onButSave() {
    let event = new Event();
    event.sessions = this.state.sessions;

    // go to add prize page
    this.props.navigation.push(AddPrize.NAV_NAME, {
      event: event,
    });
  }
}
