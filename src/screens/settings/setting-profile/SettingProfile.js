import React from 'react';
import DismissKeyboard from '../../../components/DismissKeyboard/DismissKeyboard';
import {styles} from './styles';
import {styles as stylesSignup} from '../../signup/styles';
import {
  Dimensions,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Platform,
  Alert,
} from 'react-native';
import {stylesApp, styleUtil} from '../../../styles/app.style';
import {Button, ButtonGroup, Icon, Input} from 'react-native-elements';
import {styles as stylesLogin} from '../../login/styles';
import {colors as colorTheme} from '../../../styles/theme.style';
import ImageScale from 'react-native-scalable-image';
import CheckboxRound from '../../../components/CheckboxRound/CheckboxRound';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import SelectPicker from '../../../components/SelectPicker/SelectPicker';
import {Picker} from '@react-native-community/picker';
import {STATES} from '../../../constants/constant-data';
import TagItem from '../../../components/TagItem/TagItem';
import ScheduleSelect from '../../schedule/ScheduleSelect';
import SelectList from '../select-list/SelectList';
import {
  AGE_GROUPS,
  DANCE_LEVELS,
  SELECT_AGE,
  SELECT_AMERICAN_BALLROOM,
  SELECT_AMERICAN_RHYTHM,
  SELECT_LATIN,
  SELECT_STANDARD,
} from '../../../constants/dance-data';
import {setUserInfo} from '../../../actions/user';
import {connect} from 'react-redux';
import {ApiService} from '../../../services';
import {UserHelper} from '../../../helpers/user-helper';

const {width: SCREEN_WDITH} = Dimensions.get('window');

class SettingProfile extends React.Component {
  static NAV_NAME = 'setting-profile';

  state = {
    // data
    ageGroups: [],
    styleBallroom: [],
    styleRythm: [],
    styleStandard: [],
    styleLatin: [],
    danceLevels: [],
    price: '',
  };

  currentUser = null;

  constructor(props) {
    super(props);

    props.navigation.setOptions({
      title: 'Settings',
    });

    this.currentUser = props.UserReducer.user;

    // init data
    this.state.ageGroups = this.currentUser.ageGroups;
    this.state.styleBallroom = this.currentUser.styleBallroom;
    this.state.styleRythm = this.currentUser.styleRythm;
    this.state.styleStandard = this.currentUser.styleStandard;
    this.state.styleLatin = this.currentUser.styleLatin;
    this.state.danceLevels = this.currentUser.danceLevels;
    this.state.price = this.currentUser.price?.toString();
  }

  render() {
    return (
      <KeyboardAwareScrollView style={stylesApp.viewContainer}>
        <View style={styles.viewContent}>
          {this.renderTeacherSetting()}

          {/* save */}
          <View style={[styleUtil.withShadow(), styles.viewButSave]}>
            <Button
              title="SAVE"
              buttonStyle={stylesApp.butPrimary}
              titleStyle={stylesApp.titleButPrimary}
              onPress={() => this.onButSave()}
            />
          </View>
        </View>
      </KeyboardAwareScrollView>
    );
  }

  renderTeacherSetting() {
    return (
      <View>
        <Text style={styles.txtLabel}>Lesson Options You Teach:</Text>

        {/* age groups */}
        <TouchableOpacity onPress={() => this.onSelectAge()}>
          <View style={styles.viewListItem}>
            <Text style={styles.txtItem}>Select Age Groups</Text>

            {/* chevron */}
            <Icon
              type="ionicon"
              name="ios-arrow-forward"
              size={18}
              color={colorTheme.primary}
            />
          </View>
        </TouchableOpacity>

        {/*tags of age group */}
        <View style={styles.viewTapContainer}>
          {this.state.ageGroups.map((value, i) => {
            return <TagItem key={i.toString()} text={value} />;
          })}
        </View>

        {/* levels */}
        <View style={[styles.viewForm, stylesApp.mt14]}>
          {/* title */}
          <Text style={[stylesSignup.txtItemTitle, stylesApp.mt6]}>
            Dance Level
          </Text>

          {this.renderLevels()}
        </View>

        <Text style={[stylesSignup.txtItemTitle, stylesApp.mt14]}>
          Dance Styles & Dances
        </Text>

        {/* american ballroom */}
        <TouchableOpacity
          onPress={() => this.onSelectStyle(SELECT_AMERICAN_BALLROOM)}>
          <View style={{...styles.viewListItem, ...stylesApp.mt14}}>
            <Text style={styles.txtItem}>American Ballroom</Text>

            {/* chevron */}
            <Icon
              type="ionicon"
              name="ios-arrow-forward"
              size={18}
              color={colorTheme.primary}
            />
          </View>
        </TouchableOpacity>

        {/* tags */}
        <View style={styles.viewTapContainer}>
          {this.state.styleBallroom.map((value, i) => {
            return <TagItem key={i.toString()} text={value} />;
          })}
        </View>

        {/* american rhythm */}
        <TouchableOpacity
          onPress={() => this.onSelectStyle(SELECT_AMERICAN_RHYTHM)}>
          <View style={{...styles.viewListItem, ...stylesApp.mt12}}>
            <Text style={styles.txtItem}>American Rhythm</Text>

            {/* chevron */}
            <Icon
              type="ionicon"
              name="ios-arrow-forward"
              size={18}
              color={colorTheme.primary}
            />
          </View>
        </TouchableOpacity>

        {/* tags */}
        <View style={styles.viewTapContainer}>
          {this.state.styleRythm.map((value, i) => {
            return <TagItem key={i.toString()} text={value} />;
          })}
        </View>

        {/* standard */}
        <TouchableOpacity onPress={() => this.onSelectStyle(SELECT_STANDARD)}>
          <View style={{...styles.viewListItem, ...stylesApp.mt12}}>
            <Text style={styles.txtItem}>Standard</Text>

            {/* chevron */}
            <Icon
              type="ionicon"
              name="ios-arrow-forward"
              size={18}
              color={colorTheme.primary}
            />
          </View>
        </TouchableOpacity>

        {/* tags */}
        <View style={styles.viewTapContainer}>
          {this.state.styleStandard.map((value, i) => {
            return <TagItem key={i.toString()} text={value} />;
          })}
        </View>

        {/* latin */}
        <TouchableOpacity onPress={() => this.onSelectStyle(SELECT_LATIN)}>
          <View style={{...styles.viewListItem, ...stylesApp.mt12}}>
            <Text style={styles.txtItem}>Latin</Text>

            {/* chevron */}
            <Icon
              type="ionicon"
              name="ios-arrow-forward"
              size={18}
              color={colorTheme.primary}
            />
          </View>
        </TouchableOpacity>

        {/* tags */}
        <View style={styles.viewTapContainer}>
          {this.state.styleLatin.map((value, i) => {
            return <TagItem key={i.toString()} text={value} />;
          })}
        </View>

        {/* price */}
        <View style={[styles.viewForm, stylesApp.mt14]}>
          <Text style={[stylesSignup.txtItemTitle, stylesApp.mt6]}>Price</Text>

          {/* phone */}
          <View style={[styles.viewInput, stylesApp.mt12]}>
            <Input
              containerStyle={styles.ctnInput}
              autoCapitalize={'none'}
              keyboardType="numeric"
              returnKeyType="done"
              placeholder="Input Price"
              placeholderTextColor={colorTheme.primary}
              inputStyle={styles.input}
              inputContainerStyle={stylesApp.input}
              onChangeText={(price) => {
                this.setState({price});
              }}
              value={this.state.phone}
              renderErrorMessage={false}
            />
            {/* right icon */}
            <Icon color={'#cecece'} type="font-awesome" name="usd" size={16} />
          </View>
        </View>
      </View>
    );
  }

  renderTypes() {
    return (
      <View style={stylesApp.mt24}>
        {this.types.map((s, i) => {
          return (
            <View key={i.toString()}>
              <CheckboxRound
                label={s}
                checked={this.state.typeIndex === i}
                onPress={() => this.onSelectType(i)}
              />
              {/* divider */}
              {i < this.types.length ? (
                <View style={styles.viewDivider} />
              ) : null}
            </View>
          );
        })}
      </View>
    );
  }

  renderLevels() {
    const spacing = 14;

    return (
      <View>
        <Text style={styles.txtFormLabel}>Closed</Text>
        <View style={styles.viewLevels}>
          {/* beginner */}
          <CheckboxRound
            label="Newcomer"
            checked={this.isLevelSelected(DANCE_LEVELS.CLOSED_NEWCOMER)}
            onPress={() => this.onSelectLevel(DANCE_LEVELS.CLOSED_NEWCOMER)}
          />

          <View style={stylesApp.flexRow}>
            {[1, 2, 3].map((s, i) => {
              return (
                <CheckboxRound
                  key={i.toString()}
                  containerStyle={{
                    flex: 1,
                    paddingLeft: i % 3 !== 0 ? spacing / 2 : 0,
                    paddingRight: i % 3 !== 2 ? spacing / 2 : 0,
                  }}
                  label={`Bronze ${s}`}
                  checked={this.isLevelSelected(DANCE_LEVELS.CLOSED_BRONZE[i])}
                  onPress={() =>
                    this.onSelectLevel(DANCE_LEVELS.CLOSED_BRONZE[i])
                  }
                />
              );
            })}
          </View>

          <View style={stylesApp.flexRow}>
            {[1, 2, 3].map((s, i) => {
              return (
                <CheckboxRound
                  key={i.toString()}
                  containerStyle={{
                    flex: 1,
                    paddingLeft: i % 3 !== 0 ? spacing / 2 : 0,
                    paddingRight: i % 3 !== 2 ? spacing / 2 : 0,
                  }}
                  label={`Silver ${s}`}
                  checked={this.isLevelSelected(DANCE_LEVELS.CLOSED_SILVER[i])}
                  onPress={() =>
                    this.onSelectLevel(DANCE_LEVELS.CLOSED_SILVER[i])
                  }
                />
              );
            })}
          </View>

          <View style={stylesApp.flexRow}>
            {[1, 2, 3].map((s, i) => {
              return (
                <CheckboxRound
                  key={i.toString()}
                  containerStyle={{
                    flex: 1,
                    paddingLeft: i % 3 !== 0 ? spacing / 2 : 0,
                    paddingRight: i % 3 !== 2 ? spacing / 2 : 0,
                  }}
                  label={`Gold ${s}`}
                  checked={this.isLevelSelected(DANCE_LEVELS.CLOSED_GOLD[i])}
                  onPress={() =>
                    this.onSelectLevel(DANCE_LEVELS.CLOSED_GOLD[i])
                  }
                />
              );
            })}
          </View>

          {/* advanced */}
          <CheckboxRound
            label="Gold Advanced"
            checked={this.isLevelSelected(DANCE_LEVELS.CLOSED_GOLD_ADVANCED)}
            onPress={() =>
              this.onSelectLevel(DANCE_LEVELS.CLOSED_GOLD_ADVANCED)
            }
          />
        </View>

        <Text style={styles.txtFormLabel}>Open</Text>
        <View style={styles.viewLevels}>
          <View style={stylesApp.flexRow}>
            {/* pre-bronze */}
            <CheckboxRound
              label="Pre-Bronze"
              checked={this.isLevelSelected(DANCE_LEVELS.OPEN_PREBRONZE)}
              containerStyle={{
                flex: 1,
                paddingRight: spacing,
              }}
              onPress={() => this.onSelectLevel(DANCE_LEVELS.OPEN_PREBRONZE)}
            />
            {/* bronze */}
            <CheckboxRound
              label="Bronze"
              checked={this.isLevelSelected(DANCE_LEVELS.OPEN_BRONZE)}
              containerStyle={{
                flex: 1,
                paddingLeft: spacing,
              }}
              onPress={() => this.onSelectLevel(DANCE_LEVELS.OPEN_BRONZE)}
            />
          </View>

          <View style={stylesApp.flexRow}>
            {/* pre-silver */}
            <CheckboxRound
              label="Pre-Silver"
              checked={this.isLevelSelected(DANCE_LEVELS.OPEN_PRESILVER)}
              containerStyle={{
                flex: 1,
                paddingRight: spacing,
              }}
              onPress={() => this.onSelectLevel(DANCE_LEVELS.OPEN_PRESILVER)}
            />
            {/* silver */}
            <CheckboxRound
              label="Silver"
              checked={this.isLevelSelected(DANCE_LEVELS.OPEN_SILVER)}
              containerStyle={{
                flex: 1,
                paddingLeft: spacing,
              }}
              onPress={() => this.onSelectLevel(DANCE_LEVELS.OPEN_SILVER)}
            />
          </View>

          <View style={stylesApp.flexRow}>
            {/* gold */}
            <CheckboxRound
              label="Gold"
              checked={this.isLevelSelected(DANCE_LEVELS.OPEN_GOLD)}
              containerStyle={{
                flex: 1,
                paddingRight: spacing,
              }}
              onPress={() => this.onSelectLevel(DANCE_LEVELS.OPEN_GOLD)}
            />
            {/* gold advanced */}
            <CheckboxRound
              label="Gold Advanced"
              checked={this.isLevelSelected(DANCE_LEVELS.OPEN_GOLD_ADVANCED)}
              containerStyle={{
                flex: 1,
                paddingLeft: spacing,
              }}
              onPress={() =>
                this.onSelectLevel(DANCE_LEVELS.OPEN_GOLD_ADVANCED)
              }
            />
          </View>
        </View>
      </View>
    );
  }

  onSelectType(index) {
    this.setState({
      typeIndex: index,
    });
  }
  onSelectLevel(level) {
    const {danceLevels} = this.state;
    const index = danceLevels.findIndex((data) => data === level);

    if (index >= 0) {
      // remove if exist
      danceLevels.splice(index, 1);
    } else {
      // add if not exist
      danceLevels.push(level);
    }

    this.setState({danceLevels});
  }

  isLevelSelected(level) {
    return this.state.danceLevels.findIndex((data) => data === level) >= 0;
  }

  onButNext() {}

  onSelectAge() {
    this.props.navigation.push(SelectList.NAV_NAME, {
      type: SELECT_AGE,
      values: this.state.ageGroups,
      onSave: this.onSaveItems.bind(this),
    });
  }

  onSelectStyle(type) {
    let values = [];

    if (type === SELECT_AMERICAN_BALLROOM) {
      values = this.state.styleBallroom;
    } else if (type === SELECT_AMERICAN_RHYTHM) {
      values = this.state.styleRythm;
    } else if (type === SELECT_STANDARD) {
      values = this.state.styleStandard;
    } else if (type === SELECT_LATIN) {
      values = this.state.styleLatin;
    }

    this.props.navigation.push(SelectList.NAV_NAME, {
      type: type,
      values: values,
      onSave: this.onSaveItems.bind(this),
    });
  }

  onSaveItems(type, values) {
    if (type === SELECT_AGE) {
      this.setState({
        ageGroups: values,
      });
    } else if (type === SELECT_AMERICAN_BALLROOM) {
      this.setState({
        styleBallroom: values,
      });
    } else if (type === SELECT_AMERICAN_RHYTHM) {
      this.setState({
        styleRythm: values,
      });
    } else if (type === SELECT_STANDARD) {
      this.setState({
        styleStandard: values,
      });
    } else if (type === SELECT_LATIN) {
      this.setState({
        styleLatin: values,
      });
    }
  }

  async onButSave() {
    try {
      await ApiService.updateTeacherInfo(
        this.state.ageGroups,
        this.state.danceLevels,
        this.state.styleBallroom,
        this.state.styleRythm,
        this.state.styleStandard,
        this.state.styleLatin,
        Number(this.state.price) ?? 0,
      );

      // set data
      this.currentUser.ageGroups = this.state.ageGroups;
      this.currentUser.danceLevels = this.state.danceLevels;
      this.currentUser.styleBallroom = this.state.styleBallroom;
      this.currentUser.styleRythm = this.state.styleRythm;
      this.currentUser.styleStandard = this.state.styleStandard;
      this.currentUser.styleLatin = this.state.styleLatin;
      this.currentUser.price = Number(this.state.price);

      UserHelper.saveUserToLocalStorage(this.currentUser, this.props);

      // go back to prev page
      this.props.navigation.pop();
    } catch (e) {
      console.log(e);

      Alert.alert('Failed to save settings', e.message);
    }
  }
}

const mapStateToProps = (state) => state;

const mapDispatchToProps = {
  setUserInfo,
};

export default connect(mapStateToProps, mapDispatchToProps)(SettingProfile);
