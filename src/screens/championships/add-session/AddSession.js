import React from 'react';
import {ScrollView, View} from 'react-native';
import {stylesApp} from '../../../styles/app.style';
import {SELECT_AGE} from '../../../constants/dance-data';
import {styles as stylesSelect} from '../../settings/select-list/styles';
import {ListItem} from 'react-native-elements';

export default class AddSession extends React.Component {
  static NAV_NAME = 'add-session';

  sessionTypes = [
    'SOLO EXHIBITIONS',
    'PRO-AM & AMATEUR',
    'PRO-AM CLOSED 3-DANCE SCHOLARSHIP CHAMPIONSHIPS',
    'PRO-AM OPEN 4 & 5-DANCE SCHOLARSHIP CHAMPIONSHIPS',
    'Pre-Teen, Junior & Youth - Pro-Am & Amateur',
    'ADULT AMATEUR EVENTS',
    'OPEN PROFESSIONAL CHAMPIONSHIPS',
  ];

  typesSelected = [];

  constructor(props) {
    super(props);

    props.navigation.setOptions({
      title: 'Edit Session',
    });
  }

  render() {
    return (
      <View style={stylesApp.viewContainer}>
        <ScrollView>
          <View style={stylesApp.viewContainer}>
            {this.sessionTypes.map((t, i) => {
              return this.renderType(t);
            })}
          </View>
        </ScrollView>
      </View>
    );
  }

  renderType(type) {
    return (
      <ListItem
        title={type}
        titleStyle={stylesSelect.titleListItem}
        checkmark={this.typesSelected.findIndex((item) => item.type === type) >= 0}
        bottomDivider
        containerStyle={stylesSelect.contentListItem}
        contentContainerStyle={stylesSelect.ctnListItem}
        onPress={() => this.onItem(type)}
      />
    );
  }

  onItem(type) {
  }
}
