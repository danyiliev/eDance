import React from 'react';
import {styles} from './styles';
import {FlatList, Linking, Text, TouchableOpacity, View} from 'react-native';
import {Button, Icon, SearchBar} from 'react-native-elements';
import {colors as colorTheme} from '../../../styles/theme.style';
import {ApiService} from '../../../services';
import {VideoHelper} from '../../../helpers/video-helper';
import FastImage from 'react-native-fast-image';
import {Video} from '../../../models/video.model';
import {stylesApp} from '../../../styles/app.style';
import EditProfile from '../../profile/edit-profile/EditProfile';
import RadioDetail from './radio-detail/RadioDetail';
import Pro from '../pro/Pro';

export default class Radio extends React.Component {
  static NAV_NAME = 'radio';

  webAppUrl = 'https://my.radiolize.com/public/edancesportradio.com';

  pageCount = 20;

  state = {
    // ui
    showLoading: true,

    // data
    channels: [],
  };

  constructor(props) {
    super(props);

    this.props.navigation.addListener('tabPress', (e) => {
      // Prevent default behavior
      e.preventDefault();

      // open radio web app
      Linking.openURL(this.webAppUrl);
    });

    // trick for custom action; navigate to default tab page manually
    this.props.navigation.navigate(Pro.NAV_NAME);
  }

  componentDidMount(): void {
    this.loadData(true);
  }

  render() {
    return (
      <View style={styles.viewContainer}>
        {this.renderHeader()}

        <FlatList
          ListEmptyComponent={() => this.renderEmptyItem()}
          contentContainerStyle={styles.listCtnContainer}
          keyExtractor={(item, index) => index.toString()}
          onRefresh={() => this.onRefresh()}
          refreshing={this.state.showLoading}
          data={this.state.channels}
          renderItem={({item, index}) => this.renderItem(item, index)}
          numColumns={2}
          onEndReached={() => this.onEndReached()}
          onEndReachedThreshold={3}
        />
      </View>
    );
  }

  renderItem(item, index) {
    return (
      <View style={styles.viewItem}>
        <TouchableOpacity
          style={styles.viewItemContent}
          onPress={() => this.onItem(item)}>
          <FastImage
            style={styles.imgItem}
            source={VideoHelper.getHeaderImage(item)}
            resizeMode={FastImage.resizeMode.cover}
          />
        </TouchableOpacity>

        <Text style={styles.txtName}>{item.name}</Text>
      </View>
    );
  }

  renderHeader() {
    // search bar
    return (
      <View style={styles.viewSearchbar}>
        <SearchBar
          lightTheme={true}
          placeholder="Search Channel"
          containerStyle={styles.searchCtn}
          inputContainerStyle={styles.searchInputCtn}
          searchIcon={false}
          returnKeyType="search"
          inputStyle={styles.searchInput}
        />
        <View style={styles.butSearchCtn}>
          <Button
            buttonStyle={styles.butSearch}
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

  renderEmptyItem() {
    // do not show anything when loading progress
    if (this.state.showLoading) {
      return null;
    }

    return (
      <View style={stylesApp.viewLoading}>
        <Text style={styles.textEmptyItem}>No radios available yet</Text>
      </View>
    );
  }

  onRefresh() {
    this.loadData(true);
  }

  async loadData(continued = false) {
    let indexFrom = 0;

    if (!continued) {
      // show loading mark
      this.setState({
        showLoading: true,
      });

      indexFrom = this.state.channels.length;
    }

    try {
      let channels = await ApiService.getVideos(
        indexFrom,
        this.pageCount,
        Video.TYPE_RADIO,
      );

      if (indexFrom > 0) {
        // attach
        channels = [...this.state.channels, ...channels];
      }

      this.setState({channels});
    } catch (e) {
      console.log(e);
    }

    this.setState({
      showLoading: false,
    });
  }

  onEndReached() {
    // smaller than one page, no need to load again
    if (this.state.channels.length < this.pageCount) {
      return;
    }

    this.loadData();
  }

  onItem(item) {
    // go to radio detail page
    this.props.navigation.push(RadioDetail.NAV_NAME, {
      data: item,
    });
  }
}
