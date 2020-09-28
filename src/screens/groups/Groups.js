import React from 'react';
import {connect} from 'react-redux';
import {Alert, FlatList, Text, TouchableOpacity, View} from 'react-native';
import {stylesApp} from '../../styles/app.style';
import {styles} from './styles';
import {ApiService} from '../../services';
import {Video} from '../../models/video.model';
import {Button, Icon} from 'react-native-elements';
import AddProduct from '../add-product/AddProduct';
import AddGroup from './add-group/AddGroup';
import {setMyGroups} from '../../actions/lesson';
import {DanceHelper} from '../../helpers/dance-helper';
import {colors as colorTheme} from '../../styles/theme.style';
import Toast from 'react-native-simple-toast';

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
      title: 'My Dance Groups',
      headerRight: () => (
        <TouchableOpacity style={stylesApp.viewHeaderRight} onPress={() => this.onButAdd()}>
          <Icon type="ionicon" name="md-add" size={24} />
        </TouchableOpacity>
      ),
    });

    this.currentUser = props.UserReducer.user;
  }

  componentDidMount(): void {
    this._sub = this.props.navigation.addListener('focus', this._componentFocused);

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
          <Text style={styles.txtName}>{item?.name}</Text>

          <View style={[styles.viewRow, stylesApp.mt8]}>
            <Text style={styles.txtLabel}>Dance Levels: </Text>
            <Text style={stylesApp.flex1}>
              {item?.danceLevels
                .map((l, i) => {
                  return DanceHelper.danceLevelNameByVal(l);
                })
                .join(', ')}
            </Text>
          </View>
          <View style={[styles.viewRow, stylesApp.mt4]}>
            <Text style={styles.txtLabel}>Dance Styles: </Text>
            <Text style={stylesApp.flex1}>
              {item
                ?.danceStyles()
                .map((l, i) => {
                  return DanceHelper.danceStyleNameByVal(l);
                })
                .join(', ')}
            </Text>
          </View>

          {/* delete */}
          <Button
            type="clear"
            icon={<Icon type="font-awesome" name="trash" size={18} color={colorTheme.primary} />}
            containerStyle={styles.ctnButAction}
            onPress={() => this.onDelete(index)}
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
      let groups = await ApiService.getGroups(indexFrom, this.pageCount);

      if (indexFrom > 0) {
        // attach
        groups = [...this.state.groups, ...groups];
      }

      this.props.setMyGroups(groups);
      this.setState({groups});
    } catch (e) {
      console.log(e);
    }

    this.setState({
      showLoading: false,
    });
  }

  onRefresh() {
    this.loadData();
  }

  onButAdd() {
    // go to add product page
    this.props.navigation.push(AddGroup.NAV_NAME);
  }

  _componentFocused = () => {
    this.refreshList();
  };

  refreshList() {
    this.setState({
      groups: this.props.LessonReducer.myGroups,
    });
  }

  onItem(index) {
    // go to edit group page
    this.props.navigation.push(AddGroup.NAV_NAME, {
      group: this.state.groups[index],
    });
  }

  onDelete(index) {
    Alert.alert(
      'Are you sure you want to delete this group?',
      '',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'Yes', onPress: () => this.doDeleteGroup(index)},
      ],
      {cancelable: true},
    );
  }

  async doDeleteGroup(index) {
    try {
      let {groups} = this.state;

      await ApiService.deleteGroup(groups[index].id);

      // remove product
      groups.splice(index, 1);
      this.setState({groups});

      Toast.show('Deleted the group successfully');
    } catch (e) {
      Alert.alert('Failed to Delete Group', e.message);
    }
  }
}

const mapStateToProps = (state) => state;
const mapDispatchToProps = {
  setMyGroups,
};

export default connect(mapStateToProps, mapDispatchToProps)(Groups);
