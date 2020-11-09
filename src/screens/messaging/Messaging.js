import React from 'react';
import {FlatList, Text, TouchableOpacity, View} from 'react-native';
import {styles} from './styles';
import {stylesApp} from '../../styles/app.style';
import {Utils} from '../../helpers/utils';
import FastImage from 'react-native-fast-image';
import {colors as colorTheme} from '../../styles/theme.style';
import {Icon} from 'react-native-elements';
import Chat from '../chat/Chat';
import {SbService} from '../../services';

export default class Messaging extends React.Component {
  static NAV_NAME = 'messaging';

  static PAGE_SIZE = 20;

  state = {
    // ui
    showLoading: true,

    // data
    channels: [],
  };

  constructor(props) {
    super(props);

    props.navigation.setOptions({
      title: 'Messages',
    });
  }

  componentDidMount(): void {
    this.loadData();
  }

  render() {
    return (
      <View style={stylesApp.viewContainer}>
        <FlatList
          contentContainerStyle={styles.listCtnContainer}
          keyExtractor={(item, index) => index.toString()}
          data={this.channels}
          renderItem={({item, index}) => this.renderItem(item, index)}
          refreshing={this.state.showLoading}
          onRefresh={() => this.onRefresh()}
          ListEmptyComponent={() => this.renderEmptyItem()}
          onEndReached={() => {
            console.log('onEndReached');

            this.endReached = true;
          }}
          onMomentumScrollEnd={() => {
            console.log('onMomentumScrollEnd');

            if (
              this.endReached &&
              !this.state.showLoading &&
              this.state.channels.length >= Messaging.PAGE_SIZE
            ) {
              this.loadData(true);
            }
            this.endReached = false;
          }}
          onEndReachedThreshold={0.01}
        />
      </View>
    );
  }

  renderItem(item, index) {
    return (
      <TouchableOpacity onPress={() => this.onItem(index)}>
        <View style={styles.viewItem}>
          {/* photo */}
          <FastImage
            style={styles.imgUser}
            source={require('../../../assets/imgs/user_default.png')}
            resizeMode={FastImage.resizeMode.cover}
          />

          <View style={styles.viewItemBody}>
            {/* name */}
            <Text style={styles.txtName}>Ricardo Edwards</Text>

            {/* text */}
            <Text style={styles.txtMessage}>Samba teacher</Text>

            {/* date */}
            <Text style={styles.txtDate}>Mar 13, 2018 10:14 AM</Text>
          </View>

          {/* chevron */}
          <Icon
            type="ionicon"
            name="ios-arrow-forward"
            containerStyle={styles.iconRight}
            size={24}
            color={colorTheme.primary}
          />
        </View>
      </TouchableOpacity>
    );
  }

  renderEmptyItem() {
    // do not show anything when loading progress
    if (this.state.showLoading) {
      return null;
    }

    return (
      <View style={stylesApp.viewLoading}>
        <Text style={stylesApp.txtEmptyItem}>No messages yet</Text>
      </View>
    );
  }

  async loadData(continued = false) {
    if (!continued) {
      // show loading
      await this.setState({showLoading: true});
    }

    try {
      let channels = await this.getSbChannels(continued);
      if (continued) {
        channels = this.state.channels.concat(channels);
      }

      this.setState({channels});
    } catch (e) {
      console.log(e);
    }

    // update data
    this.setState({
      showLoading: false,
    });
  }

  getSbChannels(continued = false) {
    const sb = SbService.getInstance();

    if (!continued) {
      this.channelQuery = sb.GroupChannel.createMyGroupChannelListQuery();
      this.channelQuery.order = 'latest_last_message';
      this.channelQuery.includeEmpty = true;
      this.channelQuery.limit = Messaging.PAGE_SIZE; // The value of pagination limit could be set up to 100.
    }

    const that = this;

    return new Promise((resolve, reject) => {
      if (that.channelQuery?.hasNext) {
        that.channelQuery.next(function (channelList, error) {
          if (error) {
            console.log(error.message);
            reject(error);
          }

          resolve(channelList);
        });
      } else {
        console.log('No more grop channels');
        resolve([]);
      }
    });
  }

  onRefresh() {
    this.loadData();
  }

  onItem(index) {
    // go to chat page
    this.props.navigation.push(Chat.NAV_NAME);
  }
}
