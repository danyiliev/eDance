import React from 'react';
import {Avatar, Button, ListItem} from 'react-native-elements';
import {stylesApp} from '../../../styles/app.style';
import {styles} from '../../settings/select-list/styles';
import {FlatList, Text, View} from 'react-native';
import {ApiService} from '../../../services';
import {Video} from '../../../models/video.model';
import {User} from '../../../models/user.model';
import {UserHelper} from '../../../helpers/user-helper';

export default class SelectTeacher extends React.Component {
  static NAV_NAME = 'select-teacher';

  state = {
    // true
    showLoading: true,
    selectedIndex: -1,

    // data
    users: [],
  };

  pageCount = 20;
  onSave = null;

  constructor(props) {
    super(props);

    this.onSave = props.route.params.onSave;

    props.navigation.setOptions({
      title: 'Select Teacher',
      headerRight: () => (
        <Button
          type="clear"
          title="Save"
          titleStyle={stylesApp.butTitleNavRight}
          onPress={() => this.onButSave()}
        />
      ),
    });
  }

  componentDidMount(): void {
    this.loadData();
  }

  render() {
    return (
      <View style={stylesApp.viewContainer}>
        <FlatList
          keyExtractor={(item, index) => index.toString()}
          ListEmptyComponent={() => this.renderEmptyItem()}
          refreshing={this.state.showLoading}
          data={this.state.users}
          onRefresh={() => this.onRefresh()}
          renderItem={({item, index}) => this.renderItem(item, index)}
          onEndReached={() => {
            console.log('onEndReached');

            this.endReached = true;
          }}
          onMomentumScrollEnd={() => {
            console.log('onMomentumScrollEnd');

            if (this.endReached && !this.state.showLoading && this.state.users.length >= this.pageCount) {
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
      <ListItem bottomDivider onPress={() => this.onItem(index)}>
        <Avatar source={UserHelper.getUserImage(item)} rounded />
        <ListItem.Content>
          <ListItem.Title>{item.getFullName()}</ListItem.Title>
        </ListItem.Content>
        <ListItem.CheckBox checked={index === this.state.selectedIndex} />
      </ListItem>
    );
  }

  renderEmptyItem() {
    // do not show anything when loading progress
    if (this.state.showLoading) {
      return null;
    }

    return (
      <View style={stylesApp.viewLoading}>
        <Text style={stylesApp.txtEmptyItem}>No teachers available yet</Text>
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
      indexFrom = this.state.users.length;
    }

    try {
      // fetch all users
      let users = await ApiService.getUsers(indexFrom, this.pageCount, [User.TYPE_TEACHER]);
      if (indexFrom > 0) {
        // attach
        users = [...this.state.users, ...users];
      }

      this.setState({users});
    } catch (e) {
      console.log(e);
    }

    this.setState({
      showLoading: false,
    });
  }

  onItem(index) {
    this.setState({selectedIndex: index});
  }

  onButSave() {
    if (this.state.selectedIndex < 0) {
      return;
    }

    this.onSave(this.state.users[this.state.selectedIndex]);

    // back to prev page
    this.props.navigation.pop();
  }
}
