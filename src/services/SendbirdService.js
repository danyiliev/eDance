import {config} from '../helpers/config';
import SendBird, {PreviousMessageListQuery} from 'sendbird';
import {Message} from '../models/message.model';
import {Platform} from 'react-native';

export class SendbirdService {
  static RECEIVE_HANDLER_ID = 'RECEIVE_HANDLER';

  urlChatApi = `https://api-${config.sendbirdAppId}.sendbird.com/v3`;

  getInstance() {
    let sb = SendBird.getInstance();
    if (!sb) {
      sb = new SendBird({appId: config.sendbirdAppId});
    }

    return sb;
  }

  sbConnect(userId) {
    const sb = this.getInstance();

    return new Promise((resolve, reject) => {
      sb.connect(userId, async (user, error) => {
        if (error) {
          reject(error);
        } else {
          console.log(user);

          resolve(user);
        }
      });
    });
  }

  sbDisconnect() {
    return new Promise((resolve, reject) => {
      const sb = SendBird.getInstance();
      if (sb) {
        sb.disconnect(() => {
          resolve(null);
        });
      } else {
        resolve(null);
      }
    });
  }

  sbUpdateProfile(user) {
    return new Promise((resolve, reject) => {
      if (!user) {
        reject('Nickname is required.');
        return;
      }

      let sb = this.getInstance();

      sb.updateCurrentUserInfo(user.getFullName(), user.getPhotoUrl(), (u, error) => {
        if (error) {
          console.log(error);

          reject('Update profile failed.');
        } else {
          resolve(true);
        }
      });
    });
  }

  sbCreateGroupChannel(userIdList) {
    const sb = this.getInstance();

    //
    // find out the channel with users first
    //
    const channelQuery = sb.GroupChannel.createMyGroupChannelListQuery();
    channelQuery.order = 'latest_last_message';
    channelQuery.includeEmpty = true;
    channelQuery.userIdsExactFilter = [userIdList[1]];

    return new Promise((resolve, reject) => {
      channelQuery.next(function (channelList, error) {
        if (error) {
          reject(error);
        }

        if (channelList.length > 0) {
          resolve(channelList[0]);
        } else {
          //
          // not found, create a new channel
          //
          var params = new sb.GroupChannelParams();
          params.isDistinct = true;
          params.addUserIds(userIdList);

          sb.GroupChannel.createChannel(params, (channel, error) => {
            if (error) {
              reject(error);
            } else {
              resolve(channel);
            }
          });
        }
      });
    });
  }

  sbGetChannelByUrl(url) {
    const sb = this.getInstance();

    return new Promise((resolve, reject) => {
      sb.GroupChannel.getChannel(url, (channel, error) => {
        if (error) {
          reject(error);
        } else {
          resolve(channel);
        }
      });
    });
  }

  sbSendTextMessage(channel, textMessage, callback = null) {
    if (channel.isGroupChannel()) {
      channel.endTyping();
    }
    return channel.sendUserMessage(textMessage, (message, error) => {
      if (!callback) {
        return;
      }

      callback(message, error);
    });
  }

  sbSendFileMessage(channel, msg, callback = null) {
    const sb = this.getInstance();

    const startTime = Date.now() / 1000;
    const clearIntervalId = setInterval(() => {
      const curTime = Date.now() / 1000;
      if (curTime - startTime > 1 * 60 * 60) {
        clearInterval(clearIntervalId);
      }
      if (sb.getConnectionState() === 'OPEN') {
        clearInterval(clearIntervalId);

        let data = msg.extra;

        if (msg.type === Message.TYPE_IMAGE) {
          data = JSON.stringify({
            width: msg.imageWidth,
            height: msg.imageHeight,
          });
        }

        const customType = '';
        const thumbSizeList = [{maxWidth: 160, maxHeight: 160}];

        channel.sendFileMessage(msg.file, data, customType, thumbSizeList, (message, error) => {
          if (error) {
            console.log('sendFileMessage: ', error);

            return;
          }
          msg.id = message.messageId.toString();

          if (!callback) {
            return;
          }

          // init url for show temporarily
          msg.file = {uri: message.url};

          callback(msg, error);
        });
      }
    }, 500);
  }

  registerChannelChange(id, callback) {
    const sb = SendBird.getInstance();
    let channelHandler = new sb.ChannelHandler();

    channelHandler.onChannelChanged = callback;
    sb.addChannelHandler(id, channelHandler);
  }

  registerReceiveMessage(callback) {
    const sb = SendBird.getInstance();
    let channelHandler = new sb.ChannelHandler();

    channelHandler.onMessageReceived = callback;
    sb.addChannelHandler(SendbirdService.RECEIVE_HANDLER_ID, channelHandler);
  }

  removeChannelHandler(id) {
    const sb = SendBird.getInstance();
    sb.removeChannelHandler(id);
  }

  getPreviousMessages(channel, continued = false) {
    if (!continued) {
      this.prevMsgQuery = channel.createPreviousMessageListQuery();
    }

    this.prevMsgQuery.limit = config.chatPageSize;
    this.prevMsgQuery.reverse = true;

    return new Promise((resolve, reject) => {
      if (this.prevMsgQuery.hasMore) {
        this.prevMsgQuery.load(function (messages, error) {
          if (error) {
            return reject(error);
          }

          // console.log(messages);

          const msgs = [];
          for (const obj of messages) {
            const m = new Message().initFromSbMsg(obj);

            msgs.push(m);
          }

          resolve(msgs);
        });
      } else {
        resolve([]);
      }
    });
  }

  clearAllTokens() {
    const sb = this.getInstance();
    sb.unregisterPushTokenAllForCurrentUser();
  }

  addToken(token) {
    const sb = this.getInstance();

    if (Platform.OS === 'ios') {
      sb.registerAPNSPushTokenForCurrentUser(token, function (response, error) {
        // Do something in response to a successful registration.
        console.log(response);
      });
    } else {
      sb.registerGCMPushTokenForCurrentUser(token, function (response, error) {
        // Do something in response to a successful registeration.
        console.log(response);
      });
    }
  }

  removeToken() {
    const sb = this.getInstance();

    if (Platform.OS === 'ios') {
      sb.unregisterAPNSPushTokenAllForCurrentUser(function (result, error) {
        console.log('unregisterAPNSPushTokenAllForCurrentUser: ', result);
      });
    } else {
      sb.unregisterGCMPushTokenAllForCurrentUser(function (result, error) {
        console.log('unregisterGCMPushTokenAllForCurrentUser: ', result);
      });
    }
  }

  refreshChannel(channel) {
    return new Promise((resolve, reject) => {
      channel.refresh((response, error) => {
        if (error) {
          reject(error);
        } else {
          console.log(response);

          resolve(response);
        }
      });
    });
  }

  chatTotalUnreadCount() {
    const sb = this.getInstance();

    return new Promise((resolve, reject) => {
      sb.getTotalUnreadMessageCount(function (count, error) {
        if (error) {
          console.log(error);
          reject(error);

          return;
        }

        console.log('TotalUnreadMessageCount: ', count);
        resolve(count);
      });
    });
  }
}

const sbService = new SendbirdService();

export default sbService;

