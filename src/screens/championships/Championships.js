import React from 'react';
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {Icon} from 'react-native-elements';
import {styles} from './styles';
import {colors as colorTheme} from '../../styles/theme.style';
import {stylesApp} from '../../styles/app.style';

export default class Championships extends React.Component {
  static NAV_NAME = 'championships';

  menus = [
    'Tentative Schedule',
    'Cash Prizes & Awards',
    'Hotel & Package Prices',
    'Entry Fees',
    'Concellation & Refund Policy',
    'Closed Restricted Syllabus Competion & Schedules',
    'Open Unrestricted Syllabus Championships & Schedules',
  ];

  constructor(props) {
    super(props);

    props.navigation.setOptions({
      title: 'World Championships',
    });
  }

  render() {
    return (
      <View style={stylesApp.viewContainer}>
        <View style={styles.viewContainer}>
          {
            this.menus.map((s, i) => {
              return (
                <TouchableOpacity
                  key={i.toString()}
                  onPress={() => this.onMenuItem(i)}>
                  <View style={styles.viewListItem}>
                    <Text style={styles.txtItem}>
                      {s}
                    </Text>

                    {/* chevron */}
                    <Icon
                      type="ionicon"
                      name="ios-arrow-forward"
                      containerStyle={styles.iconRight}
                      size={24}
                      color={colorTheme.primary}
                    />
                  </View>
                </TouchableOpacity>
              );
            })
          }
        </View>
      </View>
    );
  }

  onMenuItem(index) {
  }
}
