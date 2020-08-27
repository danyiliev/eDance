import React from 'react';
import {stylesApp, styleUtil} from '../../styles/app.style';
import {Alert, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {styles} from './styles';
import ComboSchedule from '../../components/ComboSchedule/ComboSchedule';
import SelectPicker from '../../components/SelectPicker/SelectPicker';
import {STATES} from '../../constants/constant-data';
import {AGE_GROUPS, LESSON_TYPES} from '../../constants/dance-data';
import {Button, Icon} from 'react-native-elements';
import {styles as stylesSignup} from '../signup/styles';
import {colors as colorTheme} from '../../styles/theme.style';
import ScheduleCheckout from './schedule-checkout/ScheduleCheckout';
import {DanceHelper} from '../../helpers/dance-helper';
import {Order} from '../../models/order.model';
import Pro from '../tabs/pro/Pro';
import BookingDate from '../booking/booking-date/BookingDate';

export default class ScheduleSelect extends React.Component {
  static NAV_NAME = 'schedule-select';

  state = {
    // data
    type: '',
    ageGroup: '',
    style: '',
    dance: '',
    level: '',
  };

  teacher = null;

  constructor(props) {
    super(props);

    props.navigation.setOptions({
      title: 'Schedule',
    });

    // get parameter
    if (props.route.params) {
      this.teacher = props.route.params.user;
    }

    // test
    this.state.type = LESSON_TYPES[0].value;
    this.state.ageGroup = AGE_GROUPS[0].value;
    this.state.style = DanceHelper.danceStylesAll()[0].value;
    this.state.dance = DanceHelper.dancesByStyle(this.state.style)[0].value;
    this.state.level = DanceHelper.danceLevelsAll()[0].value;
  }

  render() {
    return (
      <ScrollView style={stylesApp.viewContainer}>
        <View style={styles.viewContainer}>
          {/* lesson type */}
          <View style={styles.viewSelect}>
            {/* title */}
            <Text style={styles.txtTitle}>Lesson Type</Text>

            <ComboSchedule
              style={styles.styleCombo}
              placeholder={'Please select lesson type'}
              items={LESSON_TYPES}
              onChange={(type) => this.setState({type})}
            />
          </View>

          {/* age category */}
          <View style={styles.viewSelect}>
            {/* title */}
            <Text style={styles.txtTitle}>Age Category</Text>

            <ComboSchedule
              style={styles.styleCombo}
              placeholder={'Please select age category'}
              items={AGE_GROUPS}
              onChange={(ageGroup) => this.setState({ageGroup})}
            />
          </View>

          {/* dance style */}
          <View style={styles.viewSelect}>
            {/* title */}
            <Text style={styles.txtTitle}>Dance Styles</Text>

            <ComboSchedule
              style={styles.styleCombo}
              placeholder={'Please select dance style'}
              items={DanceHelper.danceStylesAll()}
              onChange={(style) => this.setState({style})}
            />
          </View>

          {/* dance */}
          {this.state.style ? (
            <View style={styles.viewSelect}>
              {/* title */}
              <Text style={styles.txtTitle}>Dance</Text>

              <ComboSchedule
                style={styles.styleCombo}
                placeholder={'Please select dance'}
                items={DanceHelper.dancesByStyle(this.state.style)}
                onChange={(dance) => this.setState({dance})}
              />
            </View>
          ) : null}

          {/* dance level */}
          <View style={styles.viewSelect}>
            {/* title */}
            <Text style={styles.txtTitle}>Dance Level</Text>

            <ComboSchedule
              style={styles.styleCombo}
              placeholder={'Please select dance level'}
              items={DanceHelper.danceLevelsAll()}
              onChange={(level) => this.setState({level})}
            />
          </View>

          {/* next */}
          <View style={styles.viewButNext}>
            <Button
              title="NEXT"
              buttonStyle={stylesApp.butPrimary}
              titleStyle={stylesApp.titleButPrimary}
              onPress={() => this.onButNext()}
              icon={
                <Icon
                  type="ionicon"
                  name="md-arrow-forward"
                  containerStyle={stylesSignup.ctnButIcon}
                  size={22}
                  color={colorTheme.light}
                />
              }
              iconRight={true}
            />
          </View>
        </View>
      </ScrollView>
    );
  }

  onButNext() {
    // check validity
    if (!this.state.type) {
      Alert.alert('Lesson Type is Empty', 'Please select lesson type');
      return;
    }
    if (!this.state.ageGroup) {
      Alert.alert('Age Group is Empty', 'Please select age group');
      return;
    }
    if (!this.state.style) {
      Alert.alert('Dance Style is Empty', 'Please select dance');
      return;
    }
    if (!this.state.dance) {
      Alert.alert('Dance is Empty', 'Please select dance');
      return;
    }
    if (!this.state.level) {
      Alert.alert('Dance Level is Empty', 'Please select dance level');
      return;
    }

    const orderNew = new Order();

    orderNew.lessonType = this.state.type;
    orderNew.ageGroup = this.state.ageGroup;
    orderNew.danceStyle = this.state.style;
    orderNew.dance = this.state.dance;
    orderNew.danceLevel = this.state.level;
    orderNew.setTeacher(this.teacher);

    if (this.teacher) {
      // go to date page
      this.props.navigation.push(BookingDate.NAV_NAME, {
        order: orderNew,
      });
    } else {
      // go to select teacher page
      this.props.navigation.push(Pro.NAV_NAME, {
        order: orderNew,
      });
    }
  }
}
