import {Text, TouchableOpacity, View, Platform} from 'react-native';
import React from 'react';
import {styles} from './styles';
import PropTypes from 'prop-types';
import {stylesApp} from '../../styles/app.style';
import {colors as colorTheme} from '../../styles/theme.style';
import {Icon} from 'react-native-elements';
import SelectPicker from '../SelectPicker/SelectPicker';
import {Picker} from '@react-native-community/picker';

export default class ComboSchedule extends React.Component {
  static propTypes = {
    style: PropTypes.object,
    placeholder: PropTypes.string,
    items: PropTypes.array,
    onChange: PropTypes.func,
  };

  state = {
    // ui
    showPicker: false,
    valueSelected: '',
    value: '',
  };

  render() {
    return (
      <View>
        <TouchableOpacity onPress={() => this.setState({showPicker: true})}>
          <View style={{...styles.viewSelectItem, ...this.props.style}}>
            <Text
              style={{
                ...styles.txtItem,
                ...(this.state.value ? {} : {color: colorTheme.grey}),
              }}>
              {this.state.value
                ? this.getItemText(this.state.value)
                : this.props.placeholder}
            </Text>

            {/* right arrow */}
            <Icon
              type="ionicon"
              name="ios-arrow-forward"
              style={styles.iconRight}
              size={20}
              color={colorTheme.primary}
            />
          </View>
        </TouchableOpacity>

        {this.renderPicker()}
      </View>
    );
  }

  renderPicker() {
    return (
      <SelectPicker
        isVisible={this.state.showPicker}
        onDismiss={(done) => this.dismissPicker(done)}>
        <Picker
          selectedValue={
            Platform.OS === 'ios' ? this.state.valueSelected : this.state.value
          }
          onValueChange={(itemValue, itemIndex) => {
            if (Platform.OS === 'ios') {
              this.setState({
                valueSelected: itemValue,
              });
            } else {
              this.setState({
                value: itemValue,
              });
            }
          }}>
          {this.props.items?.map((s, i) => {
            return (
              <Picker.Item key={i.toString()} label={s.name} value={s.value} />
            );
          })}
        </Picker>
      </SelectPicker>
    );
  }

  dismissPicker(done) {
    this.setState({
      showPicker: false,
    });

    let {valueSelected} = this.state;
    if (!valueSelected) {
      // default is the first one
      valueSelected = this.props.items[0].value;
    }

    // update date value based on done/canceled
    if (done) {
      this.setState({
        value: valueSelected,
      });

      if (this.props.onChange) {
        this.props.onChange(valueSelected);
      }
    } else {
      this.setState({
        valueSelected: this.state.value,
      });
    }
  }

  getItemText(val) {
    const item = this.props.items?.find((i) => i.value === val);
    return item ? item.name : '';
  }
}
