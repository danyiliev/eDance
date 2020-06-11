import {
  Animated,
  Keyboard, Platform,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React from "react";
import {stylesApp} from '../../styles/app.styles';

export default class DismissKeyboard extends React.Component {

  state = {
    keyboardHeight: new Animated.Value(0),
  };

  componentDidMount() {
    this.keyboardWillHideSub = Keyboard.addListener('keyboardWillHide', this.keyboardWillHide);
  }

  componentWillUnmount() {
    this.keyboardWillHideSub.remove();
  }

  render() {
    const { keyboardHeight } = this.state;

    return (
      <TouchableWithoutFeedback
        onPress={() => Keyboard.dismiss()}
        accessible={false}>
        <Animated.View
          style={{
            ...stylesApp.viewContainer,
            transform: [{
              translateY: keyboardHeight
            }]
          }}>
          {this.props.children}
        </Animated.View>
      </TouchableWithoutFeedback>
    );
  }

  moveMainView(offset) {
    if (Platform.OS === 'ios') {
      Animated.timing(this.state.keyboardHeight, {
        duration: 200,
        toValue: -offset,
      }).start();
    }
  };

  keyboardWillHide = (event) => {
    this.moveMainView(0);
  };
}
