import React from 'react';
import DismissKeyboard from '../../../components/DismissKeyboard/DismissKeyboard';
import {styles as stylesRadio} from '../radio/styles';
import {FlatList, Image, TouchableOpacity, View} from 'react-native';
import {Utils} from '../../../helpers/utils';
import {Button, Icon, SearchBar} from 'react-native-elements';
import {colors as colorTheme} from '../../../styles/theme.style';

export default class Tv extends React.Component {
  static NAV_NAME = 'tv';

  state = {
    // ui
    showLoading: false,
    redrawIndex: 0,
  };

  // data
  channels = [];

  constructor(props) {
    super(props);

    // load data
    for (let i =0; i < 20; i++) {
      this.channels.push({});
    }
  }

  render() {
    return (
      <View style={stylesRadio.viewContainer}>
        {this.renderHeader()}

        <FlatList
          contentContainerStyle={stylesRadio.listCtnContainer}
          keyExtractor={(item, index) => index.toString()}
          onRefresh={() => this.onRefresh()}
          refreshing={this.state.showLoading}
          data={Utils.makeEmptyArray(this.channels.length)}
          renderItem={({item, index}) => this.renderItem(item, index)}
          numColumns={2}
        />
      </View>
    );
  }

  renderItem(item, index) {
    return (
      <View style={stylesRadio.viewItem}>
        <TouchableOpacity style={stylesRadio.viewItemContent}>
          <Image
            style={stylesRadio.imgItem}
            source={require('../../../../assets/imgs/tv_default.png')} />
        </TouchableOpacity>
      </View>
    )
  }

  renderHeader() {
    // search bar
    return (
      <View style={stylesRadio.viewSearchbar}>
        <SearchBar
          lightTheme={true}
          placeholder="Search Channel"
          containerStyle={stylesRadio.searchCtn}
          inputContainerStyle={stylesRadio.searchInputCtn}
          searchIcon={false}
          returnKeyType="search"
          inputStyle={stylesRadio.searchInput}
        />
        <View style={stylesRadio.butSearchCtn}>
          <Button
            buttonStyle={stylesRadio.butSearch}
            icon={
              <Icon
                type="ionicon"
                name="md-search"
                size={22}
                color={colorTheme.light}
              />
            }
          />
        </View>
      </View>
    );
  }

  onRefresh() {
  }
}
