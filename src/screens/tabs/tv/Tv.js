import React from 'react';
import {styles as stylesRadio} from '../radio/styles';
import {FlatList, Image, Text, TouchableOpacity, View} from 'react-native';
import {Button, Icon, SearchBar} from 'react-native-elements';
import {colors as colorTheme} from '../../../styles/theme.style';
import FastImage from 'react-native-fast-image';
import {VideoHelper} from '../../../helpers/video-helper';
import {ApiService} from '../../../services';
import {Video} from '../../../models/video.model';
import {stylesApp} from '../../../styles/app.style';
import TvDetail from './tv-detail/TvDetail';
import {connect} from 'react-redux';
import {setTvs} from '../../../actions/radio';

class Tv extends React.Component {
  static NAV_NAME = 'tv';

  pageCount = 20;

  state = {
    // ui
    showLoading: true,

    // data
    channels: [],
  };

  constructor(props) {
    super(props);
  }

  componentDidMount(): void {
    this.loadData();
  }

  shouldComponentUpdate(nextProps: Readonly<P>, nextState: Readonly<S>, nextContext: any): boolean {
    const {channels} = this.state;

    // check if tvs are updated
    if (nextProps.RadioReducer.tvs) {
      if (channels.length !== nextProps.RadioReducer.tvs.length) {
        this.setState({channels: nextProps.RadioReducer.tvs});
      }
    }

    return true;
  }

  render() {
    return (
      <View style={stylesRadio.viewContainer}>
        {this.renderHeader()}

        <FlatList
          ListEmptyComponent={() => this.renderEmptyItem()}
          contentContainerStyle={stylesRadio.listCtnContainer}
          keyExtractor={(item, index) => index.toString()}
          onRefresh={() => this.onRefresh()}
          refreshing={this.state.showLoading}
          data={this.state.channels}
          renderItem={({item, index}) => this.renderItem(item, index)}
          numColumns={2}
          onEndReached={() => {
            console.log('onEndReached');

            this.endReached = true;
          }}
          onMomentumScrollEnd={() => {
            console.log('onMomentumScrollEnd');

            if (this.endReached && !this.state.showLoading && this.state.channels.length >= this.pageCount) {
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
      <View style={stylesRadio.viewItem}>
        <TouchableOpacity
          style={stylesRadio.viewItemContent}
          onPress={() => this.onItem(index)}>
          <FastImage
            style={stylesRadio.imgItem}
            source={VideoHelper.getHeaderImage(item)}
            resizeMode={FastImage.resizeMode.cover}
          />
        </TouchableOpacity>

        <Text style={stylesRadio.txtName}>{item.name}</Text>
      </View>
    );
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

  renderEmptyItem() {
    // do not show anything when loading progress
    if (this.state.showLoading) {
      return null;
    }

    return (
      <View style={stylesApp.viewLoading}>
        <Text style={stylesRadio.textEmptyItem}>No tvs available yet</Text>
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
    } else {
      indexFrom = this.state.channels.length;
    }

    try {
      let channels = await ApiService.getVideos(
        indexFrom,
        this.pageCount,
        Video.TYPE_TV,
      );

      if (indexFrom > 0) {
        // attach
        channels = [...this.state.channels, ...channels];
      }

      this.props.setTvs(channels);
    } catch (e) {
      console.log(e);
    }

    this.setState({
      showLoading: false,
    });
  }

  onItem(index) {
    // go to tv detail page
    this.props.navigation.push(TvDetail.NAV_NAME, {
      index: index,
    });
  }
}

const mapStateToProps = (state) => state;
const mapDispatchToProps = {
  setTvs,
};

export default connect(mapStateToProps, mapDispatchToProps)(Tv);
