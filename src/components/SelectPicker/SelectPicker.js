import React from 'react';
import {styles} from './styles';
import {Modal, Text, TouchableWithoutFeedback, View} from 'react-native';
import {Button} from 'react-native-elements';

export default class SelectPicker extends React.Component {
  state = {
    visible: false,
    title: '',
  };

  UNSAFE_componentWillReceiveProps(nextProps) {
    this.setState({
      visible: nextProps.isVisible,
    });
  }

  render() {
    return (
      <View>
        <Modal visible={this.state.visible} transparent animationType="slide">
          <TouchableWithoutFeedback onPress={() => this.onDismiss()}>
            <View style={styles.viewOverlay}>
              {/* parent onpress should be prevented on main view */}
              <TouchableWithoutFeedback>
                <View style={styles.viewModal}>
                  {/* header */}
                  <View style={styles.viewHeader}>
                    <View />
                    <Text style={styles.txtTitle}>{this.props.title}</Text>

                    <Button
                      type="clear"
                      title="Done"
                      // buttonStyle={styles.butClear}
                      titleStyle={styles.titleButClear}
                      onPress={() => this.onButDone()}
                    />
                  </View>

                  {/* content */}
                  <View style={[styles.viewContent, this.props.contentStyle]}>
                    {this.props.children}
                  </View>
                </View>
              </TouchableWithoutFeedback>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      </View>
    );
  }

  onDismiss(done = false) {
    this.props.onDismiss(done);
  }

  onButDone() {
    this.onDismiss(true);
  }
}
