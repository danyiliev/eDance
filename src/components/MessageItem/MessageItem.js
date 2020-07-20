import {Text, View} from 'react-native';
import {Message} from '../../models/message.model';
import FastImage from 'react-native-fast-image';
import React from 'react';
import {styles} from './styles';
import PropTypes from 'prop-types';

export default class MessageItem extends React.Component {
  static propTypes = {
    msg: PropTypes.object,
  };

  render() {
    const {msg} = this.props;

    //
    // message
    //
    if (msg instanceof Message) {
      const itemView = this.renderItemContent(msg);
      if (!itemView) {
        return null;
      }

      // message from right
      if (msg.senderId) {
        return (
          <View style={{...styles.viewItem, flexDirection: 'row-reverse'}}>
            {this.renderUser()}

            <View style={[styles.viewMessage, styles.ctnMsgLeft]}>
              {itemView}
              <Text style={styles.txtMessageTime}>{msg.timeFormatted()}</Text>
            </View>
          </View>
        );
      } else {
        return (
          <View style={{...styles.viewItem, flexDirection: 'row'}}>
            {this.renderUser()}

            <View style={[styles.viewMessage, styles.ctnMsgRight]}>
              {itemView}
              <Text style={styles.txtMessageTime}>{msg.timeFormatted()}</Text>
            </View>
          </View>
        );
      }
    }
  }

  renderUser() {
    return (
      <View style={styles.viewUser}>
        <FastImage
          style={styles.imgUser}
          source={require('../../../assets/imgs/user_default.png')}
          resizeMode={FastImage.resizeMode.cover}
        />
      </View>
    );
  }

  renderItemContent(item) {
    // text
    if (item.type === Message.TYPE_TEXT) {
      return <Text style={styles.txtMessageText}>{item.text}</Text>;
    }
    // image
    else {
      return null;
    }
  }
}
