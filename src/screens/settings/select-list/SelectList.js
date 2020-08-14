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

export default class SelectList extends React.Component {
  static NAV_NAME = 'select-list';

  state = {
    selected: [],
  };

  type = '';

  constructor(props) {
    super(props);

    this.type = props.route.params.type;

    props.navigation.setOptions({
      title: this.getTitle(),
      headerRight: () => (
        <Button
          type="clear"
          title="Save"
          titleStyle={styles.butTitleRight}
          onPress={() => this.onSave()}
        />
      ),
    });
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
        title={item.name}
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

  onSave() {
  }
}
