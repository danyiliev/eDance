import React from 'react';
import {Platform, Text, TouchableOpacity, View} from 'react-native';
import {stylesApp} from '../../styles/app.style';
import {styles} from './styles';
import {colors as colorTheme} from '../../styles/theme.style';
import {Icon, Input} from 'react-native-elements';
import PropTypes from 'prop-types';
import {styles as stylesSetting} from '../../screens/settings/setting-profile/styles';
import SelectPicker from '../SelectPicker/SelectPicker';
import {Picker} from '@react-native-community/picker';
import {Price} from '../../models/event.model';

export default class PriceWithCurrency extends React.Component {
  static propTypes = {
    inputStyle: PropTypes.object,
    value: PropTypes.number,
    placeholder: PropTypes.string,
    onChangeText: PropTypes.func,
    onChangeCurrency: PropTypes.func,
  };

  state = {
    // ui
    showPicker: false,
    currencySelected: Price.CURRENCIES[0],
    currency: Price.CURRENCIES[0],
  };

  render() {
    return (
      <View style={stylesApp.flexRow}>
        {/* input */}
        <Input
          containerStyle={stylesApp.flex1}
          autoCapitalize={'none'}
          keyboardType="numeric"
          placeholder={this.props.placeholder}
          placeholderTextColor={colorTheme.primary}
          inputStyle={this.props.inputStyle}
          inputContainerStyle={stylesApp.input}
          onChangeText={this.props.onChangeText}
          value={this.props.value}
          renderErrorMessage={false}
        />

        {/* currency picker */}
        <TouchableOpacity onPress={() => this.setState({showPicker: true})}>
          <View style={styles.viewCurrency}>
            <Text style={styles.txtCurrency}>{this.state.currency}</Text>
            <Icon type="ionicon" name="md-arrow-dropdown" size={18} />
          </View>
        </TouchableOpacity>

        {this.renderCurrencyPicker()}
      </View>
    );
  }

  renderCurrencyPicker() {
    return (
      <SelectPicker isVisible={this.state.showPicker} onDismiss={(done) => this.dismissPicker(done)}>
        <Picker
          selectedValue={Platform.OS === 'ios' ? this.state.currencySelected : this.state.currency}
          onValueChange={(itemValue, itemIndex) => {
            if (Platform.OS === 'ios') {
              this.setState({
                currencySelected: itemValue,
              });
            } else {
              this.setState({
                currency: itemValue,
              });
            }
          }}>
          {Price.CURRENCIES?.map((s, i) => {
            return <Picker.Item key={s} label={s} value={s} />;
          })}
        </Picker>
      </SelectPicker>
    );
  }

  dismissPicker(done) {
    this.setState({
      showPicker: false,
    });

    let {currencySelected} = this.state;
    if (!currencySelected) {
      // default is the first one
      currencySelected = Price.CURRENCIES[0];
    }

    // update date value based on done/canceled
    if (done) {
      this.setState({
        currency: currencySelected,
      });

      if (this.props.onChangeCurrency) {
        this.props.onChangeCurrency(currencySelected);
      }
    } else {
      this.setState({
        currencySelected: this.state.currency,
      });
    }
  }
}
