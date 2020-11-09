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
  ActivityIndicator,
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
import Toast from 'react-native-simple-toast';
import {connect} from 'react-redux';
import {SbService} from '../../services';
import {SendbirdService} from '../../services/SendbirdService';

const {StatusBarManager} = NativeModules;

class Chat extends React.Component {
  static NAV_NAME = 'chat';

  state = {
    // ui
    showLoading: true,
    statusBarHeight: 0,

    // data
    text: '',
    messages: [], // current chat & call history
  };

  currentUser = null;
  channel = null;
  userTo = null;

  loadingHistory = false;

  constructor(props) {
    super(props);

    this.currentUser = props.UserReducer.user;

    // get params
    if (props.route.params) {
      this.userTo = props.route.params.user;
      this.channel = props.route.params.channel;
    }

    props.navigation.setOptions({
      title: this.userTo?.getFullName(),
    });
  }

  async componentDidMount(): void {
    if (Platform.OS === 'ios') {
      StatusBarManager.getHeight((statusBarFrameData) => {
        this.setState({statusBarHeight: statusBarFrameData.height});
      });
      this.statusBarListener = StatusBarIOS.addListener('statusBarFrameWillChange', (statusBarData) => {
        this.setState({statusBarHeight: statusBarData.frame.height});
      });
    }

    //
    // init for sendbird
    //
    try {
      if (!this.channel) {
        this.channel = await SbService.sbCreateGroupChannel([this.currentUser.id, this.userTo?.id]);

        console.log(this.channel);
      }

      // add channel event handler
      SbService.registerReceiveMessage(this.onMessageReceived);
    } catch (e) {
      console.log(e);

      Toast.show(e.message);
    }

    this.loadData();
  }

  componentWillUnmount(): void {
    // remove channel event handler
    SbService.removeChannelHandler(SendbirdService.RECEIVE_HANDLER_ID);
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

                    if (this.endReached && !this.loadingHistory) {
                      this.loadData(true);
                    }
                    this.endReached = false;
                  }}
                  onEndReachedThreshold={0.01}
                  ListFooterComponent={() => this.renderEmptyItem()}
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
    if (this.state.showLoading) {
      return (
        <View style={stylesApp.viewLoading}>
          <ActivityIndicator />
        </View>
      );
    } else if (this.state.messages.length <= 0) {
      return (
        <View style={stylesApp.viewLoading}>
          <Text style={stylesApp.txtEmptyItem}>No messages yet</Text>
        </View>
      );
    }

    return null;
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
    msgNew.senderId = this.currentUser.id;
    msgNew.type = msgType;

    if (!strText) {
      return;
    }

    // send message
    SbService.sbSendTextMessage(this.channel, strText, (message, error) => {
      msgNew.id = message.messageId.toString();
    });

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

  async loadData(continued = false) {
    // channel has not been inited
    if (!this.channel) {
      return;
    }

    // show loading
    await this.setState({
      showLoading: true,
    });
    if (this.state.messages.length > 0 && !continued) {
      // this.loadingHUD.show();
    }

    try {
      await this.loadHistory(continued);
    } catch (e) {
      console.log(e);
    }

    // mark as read
    this.channel.markAsRead();

    //
    // hide loading
    //
    this.setState({
      showLoading: false,
    });
  }

  async loadHistory(continued = false) {
    this.loadingHistory = true;

    //
    // fetch latest 20 histories for chat
    //
    let msgs = await SbService.getPreviousMessages(this.channel, continued);
    let {messages} = this.state;

    const newData = [];
    for (const m of msgs) {
      // check if existing
      let bExisting = false;
      for (const tmp of messages) {
        if (m.equalTo(tmp)) {
          bExisting = true;
          break;
        }
      }
      if (bExisting) {
        continue;
      }

      newData.push(m);
    }

    let msgsNew = [...messages, ...newData];
    msgsNew.sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));

    // add prev messages to main message list
    this.setState({
      messages: msgsNew,
    });

    this.loadingHistory = false;
  }

  // received message
  onMessageReceived = (channel, message) => {
    if (!channel.isEqual(this.channel)) {
      return;
    }

    console.log(message);

    this.receiveMessageCore(message);

    // mark as read
    this.channel.markAsRead();
  };

  receiveMessageCore(message) {
    const {messages} = this.state;
    const msg = new Message().initFromSbMsg(message);

    messages.unshift(msg);

    this.setState({
      messages: messages,
    });

    // scroll to end
    this.scrollToEnd();
  }
}

const mapStateToProps = (state) => state;

export default connect(mapStateToProps, null)(Chat);
