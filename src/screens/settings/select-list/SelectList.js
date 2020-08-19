import React from 'react';
import {Button, ListItem} from 'react-native-elements';
import {FlatList, View} from 'react-native';
import {Utils} from '../../../helpers/utils';
import {styles} from './styles';
import {
  AGE_GROUPS,
  SELECT_AGE,
  SELECT_AMERICAN_BALLROOM,
  SELECT_AMERICAN_RHYTHM,
  SELECT_LATIN,
  SELECT_STANDARD,
  STYLE_AMERICAN_BALLROOM,
  STYLE_AMERICAN_RHYTHM,
  STYLE_INTERNATIONAL_LATIN,
  STYLE_INTERNATIONAL_STANDARD,
} from '../../../constants/dance-data';
import {stylesApp} from '../../../styles/app.style';

export default class SelectList extends React.Component {
  static NAV_NAME = 'select-list';

  state = {
    selected: [],
  };

  type = '';
  onSave = null;

  constructor(props) {
    super(props);

    this.type = props.route.params.type;
    this.onSave = props.route.params.onSave;

    props.navigation.setOptions({
      title: this.getTitle(),
      headerRight: () => (
        <Button
          type="clear"
          title="Save"
          titleStyle={stylesApp.butTitleNavRight}
          onPress={() => this.onButSave()}
        />
      ),
    });

    // init data
    const valueAll = this.getList();
    const values = props.route.params.values ?? [];
    for (const v of values) {
      for (const item of valueAll) {
        if (v === item.value) {
          this.state.selected.push(item);
        }
      }
    }
  }

  render() {
    return (
      <View style={styles.viewContainer}>
        <FlatList
          keyExtractor={(item, index) => index.toString()}
          data={this.getList()}
          renderItem={({item, index}) => this.renderItem(item, index)}
        />
      </View>
    );
  }

  renderItem(item, index) {
    return (
      <ListItem
        title={this.type === SELECT_AGE ? item.name : `${item.value} - ${item.name}`}
        titleStyle={styles.titleListItem}
        checkmark={
          this.state.selected.findIndex((data) => data.value === item.value) >= 0
        }
        bottomDivider
        containerStyle={styles.contentListItem}
        contentContainerStyle={styles.ctnListItem}
        onPress={() => this.onItem(item)}
      />
    );
  }

  getList() {
    if (this.type === SELECT_AGE) {
      return AGE_GROUPS;
    } else if (this.type === SELECT_AMERICAN_BALLROOM) {
      return STYLE_AMERICAN_BALLROOM;
    } else if (this.type === SELECT_AMERICAN_RHYTHM) {
      return STYLE_AMERICAN_RHYTHM;
    } else if (this.type === SELECT_STANDARD) {
      return STYLE_INTERNATIONAL_STANDARD;
    } else if (this.type === SELECT_LATIN) {
      return STYLE_INTERNATIONAL_LATIN;
    }

    return [];
  }

  getTitle() {
    if (this.type === SELECT_AGE) {
      return 'Age Groups';
    } else if (this.type === SELECT_AMERICAN_BALLROOM) {
      return 'American Ballroom';
    } else if (this.type === SELECT_AMERICAN_RHYTHM) {
      return 'American Rhythm';
    } else if (this.type === SELECT_STANDARD) {
      return 'International Standard';
    } else if (this.type === SELECT_LATIN) {
      return 'International Latin';
    }

    return '';
  }

  onItem(item) {
    const {selected} = this.state;
    const index = selected.findIndex((data) => data.value === item.value);

    if (index >= 0) {
      // remove if exist
      selected.splice(index, 1);
    } else {
      // add if not exist
      selected.push(item);
    }

    this.setState({selected});
  }

  onButSave() {
    const values = [];

    for (const item of this.state.selected) {
      values.push(item.value);
    }

    this.onSave(this.type, values);

    // back to prev page
    this.props.navigation.pop();
  }
}
