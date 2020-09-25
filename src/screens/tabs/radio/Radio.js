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
import {setRadios} from '../../../actions/radio';
import {connect} from 'react-redux';

class Radio extends React.Component {
  static NAV_NAME = 'radio';

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

    // check if radios are updated
    if (nextProps.RadioReducer.radios) {
      if (channels.length !== nextProps.RadioReducer.radios?.length) {
        this.setState({channels: nextProps.RadioReducer.radios});
      }
    }

    return true;
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
      <View style={styles.viewItem}>
        <TouchableOpacity
          style={styles.viewItemContent}
          onPress={() => this.onItem(index)}>
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
    this.loadData();
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
        Video.TYPE_RADIO,
      );

      if (indexFrom > 0) {
        // attach
        channels = [...this.state.channels, ...channels];
      }

      this.props.setRadios(channels);
    } catch (e) {
      console.log(e);
    }

    this.setState({
      showLoading: false,
    });
  }

  onItem(index) {
    // go to radio detail page
    this.props.navigation.push(RadioDetail.NAV_NAME, {
      index: index,
    });
  }
}

const mapStateToProps = (state) => state;
const mapDispatchToProps = {
  setRadios,
};

export default connect(mapStateToProps, mapDispatchToProps)(Radio);
