import React from 'react';
import {
  StatusBarIOS,
  FlatList,
  KeyboardAvoidingView,
  SafeAreaView,
  Text,
  View,
  NativeModules,
  Platform,
} from 'react-native';
import {stylesApp} from '../../styles/app.style';
import {styles} from './styles';
import ContentWithBackground from '../../components/ContentWithBackground/ContentWithBackground';
import {User} from '../../models/user.model';
import {Message} from '../../models/message.model';
import {config} from '../../helpers/config';
import MessageItem from '../../components/MessageItem/MessageItem';
import {Input, Button} from 'react-native-elements';
import {colors as colorTheme} from '../../styles/theme.style';

const {StatusBarManager} = NativeModules;

export default class Chat extends React.Component {
  static NAV_NAME = 'chat';

  state = {
    // ui
    statusBarHeight: 0,

    // data
    text: '',
    messages: [], // current chat & call history
  };

  constructor(props) {
    super(props);

    props.navigation.setOptions({
      title: 'Anna',
    });

    // init messages
    const msgs = [];
    for (let i = 0; i < 4; i++) {
      const msg = new Message();
      msg.text = 'If you could have any kind of pet, what would you choose?';

      if (i % 2) {
        msg.senderId = 'userid';
      }

      msgs.push(msg);
    }

    this.state.messages = msgs;
  }

  componentDidMount(): void {
    if (Platform.OS === 'ios') {
      StatusBarManager.getHeight((statusBarFrameData) => {
        this.setState({statusBarHeight: statusBarFrameData.height});
      });
      this.statusBarListener = StatusBarIOS.addListener(
        'statusBarFrameWillChange',
        (statusBarData) => {
          this.setState({statusBarHeight: statusBarData.frame.height});
        },
      );
    }
  }

  render() {
    return (
      <SafeAreaView style={stylesApp.viewContainer}>
        <ContentWithBackground>
          <KeyboardAvoidingView
            style={stylesApp.viewContainer}
            keyboardVerticalOffset={
              Platform.OS === 'ios' ? 44 + this.state.statusBarHeight : 0
            }
            behavior={Platform.OS === 'ios' ? 'padding' : null}>
            {/* chat */}
            <View style={styles.viewChat}>
              <View>
                <FlatList
                  inverted
                  contentContainerStyle={styles.listCtnContainer}
                  data={this.state.messages}
                  renderItem={({item, index}) => this.renderItem(item, index)}
                  ref={(ref) => (this.flatList = ref)}
                  bounces={this.state.messages.length > config.chatPageSize}
                  onEndReached={() => {
                    console.log('onEndReached');

                    this.endReached = true;
                  }}
                  initialNumToRender={20}
                  onMomentumScrollEnd={() => {
                    console.log('onMomentumScrollEnd');

                    this.endReached = false;
                  }}
                  onEndReachedThreshold={0.01}
                />
              </View>
            </View>

            {/* footer */}
            <View style={styles.viewFooter}>
              {/* input */}
              <Input
                containerStyle={styles.ctnInput}
                inputContainerStyle={stylesApp.input}
                inputStyle={styles.txtInput}
                placeholder={'Type a message…'}
                placeholderTextColor={colorTheme.primary}
                multiline
                value={this.state.text}
                onChangeText={(text) => {
                  this.setState({text});
                }}
                renderErrorMessage={false}
              />

              {/* send */}
              <Button
                type="clear"
                title="Send"
                titleStyle={styles.titleButSend}
                containerStyle={styles.ctnButSend}
                onPress={() => this.onButSend()}
              />
            </View>
          </KeyboardAvoidingView>
        </ContentWithBackground>
      </SafeAreaView>
    );
  }

  renderEmptyItem() {
    return (
      <View style={stylesApp.viewLoading}>
        <Text style={stylesApp.txtEmptyItem}>No messages yet</Text>
      </View>
    );
  }

  renderItem(item, index) {
    return (
      <MessageItem
        msg={item}
        onClickImage={() => {
          this.onClickChatImage(item);
        }}
        onClickPdf={() => {
          this.onClickPdf(item);
        }}
      />
    );
  }

  async onButSend(msgType = Message.TYPE_TEXT) {
    // determine text
    let strText = this.state.text;

    let msgNew = new Message();
    msgNew.senderId = 'asdf';
    msgNew.type = msgType;

    if (!strText) {
      return;
    }

    msgNew.text = strText;

    this.state.messages.unshift(msgNew);

    await this.setState({
      messages: this.state.messages,
      // clear input
      text: '',
    });

    // scroll to end
    this.scrollToEnd();
  }

  scrollToEnd() {
    this.flatList.scrollToIndex({
      animated: true,
      index: 0,
      viewOffset: 0,
    });
  }
}
