import React from 'react';
import PropTypes from 'prop-types';
import {Text, TouchableOpacity, View} from 'react-native';
import {colors as colorTheme} from '../../styles/theme.style';
import {styleUtil} from '../../styles/app.style';
import {Button, Icon} from 'react-native-elements';
import {styles} from './styles';

const checkboxWidth = 28;

export default class CheckboxRound extends React.Component {
  static propTypes = {
    label: PropTypes.string,
    checked: PropTypes.bool,
    onPress: PropTypes.func,
    containerStyle: PropTypes.object,
  };

  render() {
    return (
      <TouchableOpacity onPress={this.props.onPress}>
        <View style={{...styles.viewContainer, ...this.props.containerStyle}}>
          <Text style={styles.txtLabel}>{this.props.label}</Text>

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
                size={18}
                iconStyle={styles.icnCheck}
                color={colorTheme.light}
              />
            ) : null}
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}
