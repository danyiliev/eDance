import React from 'react';
import PropTypes from 'prop-types';
import {styles} from './styles';
import {colors as colorTheme} from '../../styles/theme.style';
import {styleUtil} from '../../styles/app.style';
import {Icon} from 'react-native-elements';
import {View} from 'react-native';

export default class CheckboxWithShadow extends React.Component {
  static propTypes = {
    width: PropTypes.number,
    checked: PropTypes.bool,
    containerStyle: PropTypes.object,
  };

  static defaultProps = {
    width: 28,
  };

  render() {
    return (
      <View
        style={{
          ...styles.viewIcon,
          ...this.props.containerStyle,
          width: this.props.width,
          height: this.props.width,
          borderRadius: this.props.width / 2,
          backgroundColor: this.props.checked ? colorTheme.primary : colorTheme.lightGrey,
          ...(this.props.checked ? styleUtil.withShadow(6) : {}),
        }}>
        {this.props.checked ? (
          <Icon
            type="ionicon"
            name="md-checkmark"
            size={(18 / 28) * this.props.width}
            iconStyle={styles.icnCheck}
            color={colorTheme.light}
          />
        ) : null}
      </View>
    );
  }
}
