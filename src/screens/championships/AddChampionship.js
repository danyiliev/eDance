import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {styles} from './styles';
import {Icon} from 'react-native-elements';
import {colors as colorTheme} from '../../styles/theme.style';
import {stylesApp} from '../../styles/app.style';

export default class AddChampionship extends React.Component {
  static NAV_NAME = 'add-championship';

  menus = [
    'Tentative Schedule',
    'Cash Prizes & Awards',
    'Hotel & Package Prices',
    'Entry Fees',
    'Concellation & Refund Policy',
    'Closed Restricted Syllabus Competition & Schedules',
    'Open Unrestricted Syllabus Championships & Schedules',
  ];


  constructor(props) {
    super(props);

    props.navigation.setOptions({
      title: 'Create Championships',
    });
  }

  render() {
    return (
      <View style={stylesApp.viewContainer}>
        <View style={styles.viewContainer}>
          {this.renderMenuItem('Tentative Schedule')}
        </View>
      </View>
    );
  }

  renderMenuItem(title) {
    return (
      <TouchableOpacity onPress={() => this.onMenuItem()}>
        <View style={styles.viewListItem}>
          <Text style={styles.txtItem}>{title}</Text>

          {/* chevron */}
          <Icon type="ionicon" name="ios-arrow-forward" size={24} color={colorTheme.primary} />
        </View>
      </TouchableOpacity>
    );
  }
}
