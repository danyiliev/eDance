import {Platform} from 'react-native';
import SelectPicker from '../components/SelectPicker/SelectPicker';
import {styles as stylesSignup} from '../screens/signup/styles';
import React from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';

export class UiHelper {
  static instance: UiHelper;

  timeSelected = new Date();
  strTimeSelected = '';

  static getInstance() {
    if (!this.instance) {
      this.instance = new UiHelper();
    }

    return this.instance;
  }

  static numberToSequence(num) {
    if (num === 1) {
      return `${num}st`;
    } else if (num === 2) {
      return `${num}nd`;
    } else if (num === 3) {
      return `${num}rd`;
    } else {
      return `${num}th`;
    }
  }

  renderDateTimePicker(page, mode = 'time', onSelectTime, title = '') {
    if (Platform.OS === 'ios') {
      return (
        <SelectPicker
          isVisible={page.state.showTimePicker}
          contentStyle={stylesSignup.picker}
          title={title}
          onDismiss={(done) => this.dismissTime(page, done, onSelectTime)}>
          {this.renderTimePickerCore(page, mode, onSelectTime)}
        </SelectPicker>
      );
    } else {
      if (!page.state.showTimePicker) {
        return null;
      }

      return this.renderTimePickerCore(page, mode, onSelectTime);
    }
  }

  renderTimePickerCore(page, mode, onSelectTime) {
    return (
      <DateTimePicker
        value={this.timeSelected}
        mode={mode}
        display="default"
        onChange={(event, selectedDate) => this.onChangeTime(page, selectedDate, onSelectTime)}
      />
    );
  }

  onChangeTime(page, selectedDate, onSelectTime) {
    this.timeSelected = selectedDate;

    if (Platform.OS === 'ios') {
    } else {
      page.setState({
        showTimePicker: false,
      });

      // null if cancelled
      if (selectedDate && onSelectTime) {
        onSelectTime(selectedDate);
      }
    }
  }

  dismissTime(page, done, onSelectTime) {
    page.setState({
      showTimePicker: false,
    });
    page.keyboardView?.moveMainView(0);

    // update date value based on done/canceled
    if (done) {
      if (onSelectTime) {
        onSelectTime(this.timeSelected);
      }
    }
  }
}
