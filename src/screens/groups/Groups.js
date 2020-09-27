import React from 'react';
import {connect} from 'react-redux';
import {FlatList, Text, TouchableOpacity, View} from 'react-native';
import {stylesApp} from '../../styles/app.style';
import {styles} from './styles';
import {ApiService} from '../../services';
import {Video} from '../../models/video.model';
import {Icon} from 'react-native-elements';
import AddProduct from '../add-product/AddProduct';
import AddGroup from './add-group/AddGroup';

class Groups extends React.Component {
  static NAV_NAME = 'groups';

  pageCount = 20;

  state = {
    // ui
    showLoading: false,

    // data
    groups: [],
  };

  constructor(props) {
    super(props);

    props.navigation.setOptions({
      title: 'My Groups',
      headerRight: () => (
        <TouchableOpacity style={stylesApp.viewHeaderRight} onPress={() => this.onButAdd()}>
          <Icon type="ionicon" name="md-add" size={24} />
        </TouchableOpacity>
      ),
    });

    this.currentUser = props.UserReducer.user;
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
          data={this.state.groups}
          ListEmptyComponent={() => this.renderEmptyItem()}
          renderItem={({item, index}) => this.renderItem(item, index)}
          onRefresh={() => this.onRefresh()}
          refreshing={this.state.showLoading}
          onEndReached={() => {
            console.log('onEndReached');

            this.endReached = true;
          }}
          onMomentumScrollEnd={() => {
            console.log('onMomentumScrollEnd');

            if (this.endReached && !this.state.showLoading && this.state.groups.length >= this.pageCount) {
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
      <TouchableOpacity activeOpacity={0.7} onPress={() => this.onItem(index)}>
        <View style={styles.viewItem}>
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
        <Text style={stylesApp.txtEmptyItem}>You have not created groups yet</Text>
      </View>
    );
  }

  async loadData(continued = false) {
    let indexFrom = 0;

    if (!continued) {
      // show loading mark
      this.setState({
        showLoading: true,
      });
    } else {
      indexFrom = this.state.groups.length;
    }

    try {
      // let channels = await ApiService.getVideos(
      //   indexFrom,
      //   this.pageCount,
      //   Video.TYPE_RADIO,
      // );
      //
      // if (indexFrom > 0) {
      //   // attach
      //   channels = [...this.state.channels, ...channels];
      // }
      //
      // this.props.setRadios(channels);
    } catch (e) {
      console.log(e);
    }

    this.setState({
      showLoading: false,
    });
  }

  onButAdd() {
    // go to add product page
    this.props.navigation.push(AddGroup.NAV_NAME);
  }
}

const mapStateToProps = (state) => state;

export default connect(mapStateToProps, null)(Groups);
