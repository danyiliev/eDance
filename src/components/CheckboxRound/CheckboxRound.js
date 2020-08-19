import React from 'react';
import PropTypes from 'prop-types';
import {Text, TouchableOpacity, View} from 'react-native';
import {colors as colorTheme} from '../../styles/theme.style';
import {styleUtil} from '../../styles/app.style';
import {Button, Icon} from 'react-native-elements';
import {styles} from './styles';

export default class CheckboxRound extends React.Component {
  static propTypes = {
    label: PropTypes.string,
    checked: PropTypes.bool,
    onPress: PropTypes.func,
    containerStyle: PropTypes.object,
    checkboxWidth: PropTypes.number,
    disabled: PropTypes.bool,
  };

  render() {
    if (this.props.disabled) {
      return (
        <View style={this.props.containerStyle}>
          {this.renderItem()}
        </View>
      );
    }

    return (
      <TouchableOpacity
        onPress={this.props.onPress}
        style={this.props.containerStyle}>
        {this.renderItem()}
      </TouchableOpacity>
    );
  }

  renderItem() {
    const checkboxWidth = this.props.checkboxWidth ?? 28;

    return (
      <View style={{...styles.viewContainer}}>
        <Text
          style={{
            ...styles.txtLabel,
            color: this.props.disabled ? colorTheme.grey : colorTheme.primary,
          }}>
          {this.props.label}
        </Text>

        <View
          style={{
            ...styles.viewIcon,
            width: checkboxWidth,
            height: checkboxWidth,
            borderRadius: checkboxWidth / 2,
            backgroundColor: this.props.checked
              ? colorTheme.primary
              : colorTheme.lightGrey,
            ...(this.props.checked ? styleUtil.withShadow(6) : {}),
          }}>
          {this.props.checked ? (
            <Icon
              type="ionicon"
              name="md-checkmark"
              size={(18 / 28) * checkboxWidth}
              iconStyle={styles.icnCheck}
              color={colorTheme.light}
            />
          ) : null}
        </View>
      </View>
    );
  }
}
