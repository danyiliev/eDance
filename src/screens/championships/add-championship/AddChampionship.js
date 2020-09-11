import React from 'react';
import {Alert, FlatList, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {styles} from './styles';
import {Button, Icon} from 'react-native-elements';
import {colors as colorTheme} from '../../../styles/theme.style';
import {stylesApp, styleUtil} from '../../../styles/app.style';
import {styles as stylesCart} from '../../cart/styles';
import Reviews from '../../reviews/Reviews';
import AddSession from '../add-session/AddSession';

export default class AddChampionship extends React.Component {
  static NAV_NAME = 'add-championship';

  state = {
    sessions: [],
  };

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
      title: 'Create a Championship',
    });
  }

  render() {
    return (
      <View style={stylesApp.viewContainer}>
        <ScrollView bounces={false}>
          <View style={styles.viewContainer}>
            <Text style={styles.txtSessionLabel}>
              Session 1
            </Text>
            <View style={styles.viewForm}>
              {/* delete */}
              <Button
                type="clear"
                icon={<Icon type="font-awesome" name="trash" size={18} color={colorTheme.primary} />}
                containerStyle={styles.ctnButDelete}
                onPress={() => this.onDelete()}
              />

              {/* time */}
              <View style={stylesApp.flexRowCenter}>
                <Text style={styles.txtFormLabel}>Date & Time: </Text>
                <Text style={styles.txtFormValue}>2020-08-31 23:32</Text>
              </View>

              <Text style={styles.txtSessionType}>SOLO EXHIBITIONS</Text>
              <Text style={styles.txtSessionDanceStyle}>American Style</Text>
            </View>

            <Text style={styles.txtSessionLabel}>
              Session 2
            </Text>
            <View style={styles.viewForm}>
              {/* delete */}
              <Button
                type="clear"
                icon={<Icon type="font-awesome" name="trash" size={18} color={colorTheme.primary} />}
                containerStyle={styles.ctnButDelete}
                onPress={() => this.onDelete()}
              />

              {/* time */}
              <View style={stylesApp.flexRowCenter}>
                <Text style={styles.txtFormLabel}>Date & Time: </Text>
                <Text style={styles.txtFormValue}>2020-08-31 23:32</Text>
              </View>

              <TouchableOpacity onPress={() => this.onAddSessionContent()}>
                <View style={stylesApp.viewLoading}>
                  <Text style={stylesApp.txtEmptyItem}>Click here to add session items</Text>
                </View>
              </TouchableOpacity>
            </View>

            <Text style={styles.txtSessionLabel}>
              Session 3
            </Text>
            <View style={styles.viewForm}>
              <TouchableOpacity onPress={() => this.onAddSession()}>
                <View style={stylesApp.viewLoading}>
                  <Icon color={colorTheme.grey} type="ionicon" name="ios-add" size={100} />
                </View>
              </TouchableOpacity>
            </View>

          </View>


          {/* save */}
          <View style={[styleUtil.withShadow(), styles.viewButSave]}>
            <Button
              title="SAVE"
              buttonStyle={stylesApp.butPrimary}
              titleStyle={stylesApp.titleButPrimary}
              onPress={() => this.onButSave()}
            />
          </View>
        </ScrollView>
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

  onAddSession() {
  }

  onAddSessionContent() {
    // go to add session page
    this.props.navigation.push(AddSession.NAV_NAME);
  }

  onDelete(index) {
    Alert.alert(
      'Are you sure to remove this session?',
      '',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'Yes', onPress: () => this.doDeleteItem(index)},
      ],
      {cancelable: true},
    );
  }

  doDeleteItem(index) {
  }
}
