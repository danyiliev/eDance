import React from 'react';
import {Avatar, Button, ListItem} from 'react-native-elements';
import {stylesApp} from '../../../styles/app.style';
import {styles} from '../../settings/select-list/styles';
import {FlatList, Text, View} from 'react-native';
import {ApiService} from '../../../services';
import {Video} from '../../../models/video.model';
import {User} from '../../../models/user.model';
import {UserHelper} from '../../../helpers/user-helper';
import SelectTeacher from '../../championships/select-teacher/SelectTeacher';
import GroupDetail from '../../groups/group-detail/GroupDetail';

export default class SelectGroup extends React.Component {
  static NAV_NAME = 'select-group';

  state = {
    // true
    showLoading: true,
    selectedIndex: -1,

    // data
    groups: [],
  };

  pageCount = 20;
  onSave = null;

  group = null;

  constructor(props) {
    super(props);

    this.onSave = props.route.params.onSave;

    props.navigation.setOptions({
      title: 'Select Group',
      headerRight: () => (
        <Button
          type="clear"
          title="Done"
          titleStyle={stylesApp.butTitleNavRight}
          onPress={() => this.onButSave()}
        />
      ),
    });

    // get parameter
    if (props.route.params) {
      this.group = props.route.params.group;
    }
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
          data={this.state.groups}
          onRefresh={() => this.onRefresh()}
          renderItem={({item, index}) => this.renderItem(item, index)}
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
      <ListItem bottomDivider onPress={() => this.onItem(index)}>
        <ListItem.CheckBox checked={index === this.state.selectedIndex} onPress={() => this.onSelectItem(index)} />
        <ListItem.Content>
          <ListItem.Title>{item.name}</ListItem.Title>
          <ListItem.Subtitle>{item.user?.getFullName()}</ListItem.Subtitle>
        </ListItem.Content>
        <ListItem.Chevron />
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
        <Text style={stylesApp.txtEmptyItem}>No groups available yet</Text>
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
      // fetch all groups
      let groups = await ApiService.getGroupsAll(indexFrom, this.pageCount);
      if (indexFrom > 0) {
        // attach
        groups = [...this.state.groups, ...groups];
      }

      this.setState({groups, selectedIndex: groups.findIndex((g) => g.equalTo(this.group))});
    } catch (e) {
      console.log(e);
    }

    this.setState({
      showLoading: false,
    });
  }

  onItem(index) {
    // go to group detail page
    this.props.navigation.push(GroupDetail.NAV_NAME, {
      group: this.state.groups[index],
    });
  }

  onSelectItem(index) {
    this.setState({selectedIndex: index});
  }

  onButSave() {
    if (this.state.selectedIndex < 0) {
      return;
    }

    this.onSave(this.state.groups[this.state.selectedIndex]);

    // back to prev page
    this.props.navigation.pop();
  }
}
