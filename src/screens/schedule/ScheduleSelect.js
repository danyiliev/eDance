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

export default class ScheduleSelect extends React.Component {
  static NAV_NAME = 'schedule-select';

  static SELECT_TYPE = 'type';
  static SELECT_STYLE = 'style';
  static SELECT_LEVEL = 'level';
  static SELECT_OCCASION = 'occasion';

  state = {
    showTypePicker: false,
    showStylePicker: false,
    showLevelPicker: false,
    showOccasionPicker: false,
    typeSelected: '',
    styleSelected: '',
    levelSelected: '',
    occasionSelected: '',

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
        <View style={[styleUtil.withShadow(), styles.viewButNext]}>
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

  renderTypePicker() {
    return (
      <SelectPicker
        isVisible={this.state.showTypePicker}
        contentStyle={styles.picker}
        onDismiss={done => this.dismissType(done)}>

      </SelectPicker>
    );
  }

  dismissType(done) {
    this.setState({
      showTypePicker: false,
    });

    let { typeSelected } = this.state;
    if (!typeSelected) {
      // default is the first one
      typeSelected = LESSON_TYPES[0].value;
    }

    // update date value based on done/canceled
    if (done) {
      this.setState({
        type: typeSelected,
      });
    } else {
      this.setState({
        typeSelected: this.state.state,
      });
    }
  }
}
