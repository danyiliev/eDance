import React from 'react';
import {stylesApp, styleUtil} from '../../styles/app.style';
import {Text, TouchableOpacity, View} from 'react-native';
import {styles} from './styles';
import ComboSchedule from '../../components/ComboSchedule/ComboSchedule';
import SelectPicker from '../../components/SelectPicker/SelectPicker';
import {STATES} from '../../constants/constant-data';
import {DANCE_LEVELS, DANCE_STYLES, LESSON_TYPES, OCCASIONS} from '../../constants/dance-data';
import {Button, Icon} from 'react-native-elements';
import {styles as stylesSignup} from '../signup/styles';
import {colors as colorTheme} from '../../styles/theme.style';
import ScheduleCheckout from './schedule-checkout/ScheduleCheckout';

export default class ScheduleSelect extends React.Component {
  static NAV_NAME = 'schedule-select';

  state = {
    // data
    type: '',
    style: '',
    level: '',
    occasion: '',
  };

  constructor(props) {
    super(props);

    props.navigation.setOptions({
      title: 'Schedule'
    });
  }

  render() {
    return (
      <View style={styles.viewContainer}>
        {/* lesson type */}
        <View style={styles.viewSelect}>
          {/* title */}
          <Text style={styles.txtTitle}>
            Lesson Type
          </Text>

          <ComboSchedule
            style={styles.styleCombo}
            placeholder={'Please select lesson type'}
            items={LESSON_TYPES}
          />
        </View>

        {/* dance style */}
        <View style={styles.viewSelect}>
          {/* title */}
          <Text style={styles.txtTitle}>
            Dance Styles
          </Text>

          <ComboSchedule
            style={styles.styleCombo}
            placeholder={'Please select dance style'}
            items={DANCE_STYLES}
          />
        </View>

        {/* dance level */}
        <View style={styles.viewSelect}>
          {/* title */}
          <Text style={styles.txtTitle}>
            Dance Level
          </Text>

          <ComboSchedule
            style={styles.styleCombo}
            placeholder={'Please select dance level'}
            items={DANCE_LEVELS}
          />
        </View>

        {/* occasion */}
        <View style={styles.viewSelect}>
          {/* title */}
          <Text style={styles.txtTitle}>
            Special Occasion
          </Text>

          <ComboSchedule
            style={styles.styleCombo}
            placeholder={'Please select occasion'}
            items={OCCASIONS}
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
    );
  }

  onButNext() {
    // go to checkout page
    this.props.navigation.push(ScheduleCheckout.NAV_NAME);
  }
}
