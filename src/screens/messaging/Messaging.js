import React from 'react';
import {FlatList, Text, TouchableOpacity, View} from 'react-native';
import {styles} from './styles';
import {stylesApp} from '../../styles/app.style';
import {Utils} from '../../helpers/utils';
import FastImage from 'react-native-fast-image';
import {colors as colorTheme} from '../../styles/theme.style';
import {Icon} from 'react-native-elements';
import Chat from '../chat/Chat';

export default class Messaging extends React.Component {
  static NAV_NAME = 'messaging';

  state = {
    // ui
    redrawIndex: 0,
  };

  // data
  messages = [];

  constructor(props) {
    super(props);

    props.navigation.setOptions({
      title: 'Messages',
    });

    // load data
    for (let i = 0; i < 4; i++) {
      this.messages.push({});
    }
  }

  render() {
    return (
      <View style={stylesApp.viewContainer}>
        <FlatList
          contentContainerStyle={styles.listCtnContainer}
          keyExtractor={(item, index) => index.toString()}
          data={Utils.makeEmptyArray(this.messages.length)}
          renderItem={({item, index}) => this.renderItem(item, index)}
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

  onItem(index) {
    // go to chat page
    this.props.navigation.push(Chat.NAV_NAME);
  }
}
