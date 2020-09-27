import React from 'react';
import PropTypes from 'prop-types';
import {Text, TouchableOpacity, View} from 'react-native';
import {colors as colorTheme} from '../../styles/theme.style';
import {stylesApp, styleUtil} from '../../styles/app.style';
import {Button, Icon} from 'react-native-elements';
import {styles} from './styles';
import CheckboxWithShadow from './CheckboxWithShadow';

export default class CheckboxRound extends React.Component {
  static propTypes = {
    label: PropTypes.string,
    checked: PropTypes.bool,
    onPress: PropTypes.func,
    containerStyle: PropTypes.object,
    checkboxWidth: PropTypes.number,
    disabled: PropTypes.bool,
    textSize: PropTypes.number,
  };

  static defaultProps = {
    textSize: 12,
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
        <CheckboxWithShadow width={checkboxWidth} checked={this.props.checked} />

        <Text
          style={{
            ...stylesApp.ml10,
            ...styles.txtLabel,
            color: this.props.disabled ? colorTheme.grey : colorTheme.primary,
            fontSize: this.props.textSize,
          }}>
          {this.props.label}
        </Text>
      </View>
    );
  }
}
