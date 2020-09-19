import React from 'react';
import {ScrollView, View} from 'react-native';
import {stylesApp} from '../../../styles/app.style';
import {SELECT_AGE} from '../../../constants/dance-data';
import {styles as stylesSelect} from '../../settings/select-list/styles';
import {styles} from './styles';
import {Button, Icon, ListItem} from 'react-native-elements';
import Collapsible from 'react-native-collapsible';
import {DanceHelper} from '../../../helpers/dance-helper';
import {SessionType} from '../../../models/event.model';
import {connect} from 'react-redux';

class AddSession extends React.Component {
  static NAV_NAME = 'add-session';
  static NAV_NAME_SIGNUP = 'add-session-signup';

  sessionTypes = [
    'SOLO EXHIBITIONS',
    'PRO-AM & AMATEUR',
    'PRO-AM CLOSED 3-DANCE SCHOLARSHIP CHAMPIONSHIPS',
    'PRO-AM OPEN 4 & 5-DANCE SCHOLARSHIP CHAMPIONSHIPS',
    'Pre-Teen, Junior & Youth - Pro-Am & Amateur',
    'ADULT AMATEUR EVENTS',
    'OPEN PROFESSIONAL CHAMPIONSHIPS',
  ];

  state = {
    sessionTypes: [],
    expandedIndex: [],
  };

  session = null;
  onSave = null;

  constructor(props) {
    super(props);

    props.navigation.setOptions({
      title: 'Edit Session',
      headerRight: () => (
        <Button
          type="clear"
          title="Save"
          titleStyle={stylesApp.butTitleNavRight}
          onPress={() => this.onButSave()}
        />
      ),
    });

    // get params
    this.session = props.route.params.session;
    this.onSave = props.route.params.onSave;

    this.state.sessionTypes = this.session?.types;
  }

  render() {
    return (
      <View style={stylesApp.viewContainer}>
        <ScrollView>
          <View style={stylesApp.viewContainer}>
            {this.sessionTypes.map((t, i) => {
              return this.renderType(t, i);
            })}
          </View>
        </ScrollView>
      </View>
    );
  }

  renderType(type, index) {
    const isCollapsed = this.state.expandedIndex.indexOf(index) < 0;

    return (
      <View key={`type${index}`}>
        <ListItem
          title={type}
          titleStyle={styles.titleTypeListItem}
          checkmark={this.isTypeSelected(type)}
          bottomDivider
          leftIcon={
            <Icon
              style={styles.iconCollapse}
              type="ionicon"
              name={isCollapsed ? 'ios-arrow-forward' : 'ios-arrow-down'}
              size={18}
            />
          }
          containerStyle={styles.contentTypeListItem}
          contentContainerStyle={styles.ctnListItem}
          onPress={() => this.onItem(index)}
        />

        <Collapsible collapsed={isCollapsed}>
          {DanceHelper.danceStylesAll().map((style, i) => {
            return (
              <ListItem
                key={`type${index}-style${i}`}
                title={style.name}
                titleStyle={styles.titleTypeListItem}
                bottomDivider
                checkmark={this.isStyleSelected(type, style)}
                containerStyle={styles.ctnListItem}
                contentContainerStyle={styles.contentStyleListItem}
                onPress={() => this.onStyleItem(type, style)}
              />
            );
          })}
        </Collapsible>
      </View>
    );
  }

  isTypeSelected(type) {
    const sessionType = this.getSelectedType(type);
    return sessionType && sessionType.danceStyles.length > 0;
  }

  onItem(index) {
    // expand / collapse item
    const {expandedIndex} = this.state;
    const i = expandedIndex.indexOf(index);
    if (i >= 0) {
      expandedIndex.splice(i, 1);
    } else {
      expandedIndex.push(index);
    }

    this.setState({expandedIndex});
  }

  onStyleItem(type, style) {
    const {sessionTypes} = this.state;

    let sessionType = this.getSelectedType(type);
    if (!sessionType) {
      sessionType = new SessionType();
      sessionType.type = type;

      sessionTypes.push(sessionType);
    }

    // add or remove style
    const i = sessionType.danceStyles.indexOf(style.value);
    if (i >= 0) {
      sessionType.danceStyles.splice(i, 1);
    } else {
      sessionType.danceStyles.push(style.value);
    }

    this.setState({sessionTypes});
  }

  getSelectedType(type) {
    return this.state.sessionTypes.find((st) => st.type === type);
  }

  isStyleSelected(type, style) {
    let sessionType = this.getSelectedType(type);
    return sessionType?.danceStyles.indexOf(style.value) >= 0;
  }

  onButSave() {
    this.onSave(this.state.sessionTypes);

    // go back to prev page
    this.props.navigation.pop();
  }
}

const mapStateToProps = (state) => state;

export default connect(mapStateToProps, null)(AddSession);
