import React from 'react';
import {FlatList, Text, TouchableOpacity, View} from 'react-native';
import {stylesApp} from '../../styles/app.style';
import {styles} from './styles';
import {Utils} from '../../helpers/utils';
import FastImage from 'react-native-fast-image';
import {Icon} from 'react-native-elements';
import {colors as colorTheme} from '../../styles/theme.style';
import Chat from '../chat/Chat';

export default class Lessons extends React.Component {
  static NAV_NAME = 'lessons';

  state = {
    // ui
    showLoading: false,

    // data
    lessons: [],
  };

  constructor(props) {
    super(props);

    props.navigation.setOptions({
      title: 'My Lessons',
    });
  }

  render() {
    return (
      <View style={stylesApp.viewContainer}>
        <FlatList
          contentContainerStyle={styles.listCtnContainer}
          keyExtractor={(item, index) => index.toString()}
          data={Utils.makeEmptyArray(4)}
          ListEmptyComponent={() => this.renderEmptyItem()}
          renderItem={({item, index}) => this.renderItem(item, index)}
          onRefresh={() => this.onRefresh()}
          refreshing={this.state.showLoading}
        />
      </View>
    );
  }

  renderEmptyItem() {
    // do not show anything when loading progress
    if (this.state.showLoading) {
      return null;
    }

    return (
      <View style={stylesApp.viewLoading}>
        <Text style={stylesApp.textEmptyItem}>No lessons available yet</Text>
      </View>
    );
  }

  renderItem(item, index) {
    return (
      <TouchableOpacity
        activeOpacity={0.7} onPress={() => this.onItem(index)}>
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
            <Text style={styles.txtMessage}>American Ballroom, VW, Silver 2 Closed</Text>

            <Text style={styles.txtDate}>Start On: 2019-10-13 10:14</Text>
          </View>

          {/* date */}
          <View style={styles.viewItemFooter}>
            <Text style={styles.txtBadge}>Closed</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  onItem(index) {
    // go to lesson detail page
  }
}
