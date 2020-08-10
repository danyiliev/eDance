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

const {width: SCREEN_WDITH} = Dimensions.get('window');

export default class SettingProfile extends React.Component {
  static NAV_NAME = 'setting-profile';

  state = {
    // data
    levelIndex: 0,

    price: '',
  };

  genders = ['Male', 'Female'];
  types = ['Student', 'Professional', 'Cyber Championship Aujudicator'];
  singles = ['Single', 'Couple'];
  levels = [
    'Beginner',
    'Silver',
    'Gold',
    'Bronze',
    'Silver 1',
    'Gold 1',
    'Bronze 1',
    'Silver 2',
    'Gold 2',
    'Bronze 2',
    'Silver 3',
    'Gold 3',
  ];

  constructor(props) {
    super(props);

    props.navigation.setOptions({
      title: 'Settings',
    });
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
          <TagItem text={'sample'}></TagItem>
          <TagItem text={'sample'}></TagItem>
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
        <TouchableOpacity onPress={() => this.onSelectStyle()}>
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
          <TagItem text={'sample'}></TagItem>
          <TagItem text={'sample'}></TagItem>
        </View>

        {/* american rhythm */}
        <TouchableOpacity onPress={() => this.onSelectStyle()}>
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
          <TagItem text={'sample'}></TagItem>
          <TagItem text={'sample'}></TagItem>
        </View>

        {/* standard */}
        <TouchableOpacity onPress={() => this.onSelectStyle()}>
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
          <TagItem text={'sample'}></TagItem>
          <TagItem text={'sample'}></TagItem>
        </View>

        {/* latin */}
        <TouchableOpacity onPress={() => this.onSelectStyle()}>
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
          <TagItem text={'sample'}></TagItem>
          <TagItem text={'sample'}></TagItem>
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
            checked={false}
            onPress={() => this.onSelectLevel()}
          />

          <View style={stylesApp.flexRow}>
            {[1, 2, 3].map((s, i) => {
              return (
                <CheckboxRound
                  containerStyle={{
                    flex: 1,
                    paddingLeft: i % 3 !== 0 ? spacing / 2 : 0,
                    paddingRight: i % 3 !== 2 ? spacing / 2 : 0,
                  }}
                  label={`Bronze ${s}`}
                  checked={false}
                  onPress={() => this.onSelectLevel()}
                />
              );
            })}
          </View>

          <View style={stylesApp.flexRow}>
            {[1, 2, 3].map((s, i) => {
              return (
                <CheckboxRound
                  containerStyle={{
                    flex: 1,
                    paddingLeft: i % 3 !== 0 ? spacing / 2 : 0,
                    paddingRight: i % 3 !== 2 ? spacing / 2 : 0,
                  }}
                  label={`Silver ${s}`}
                  checked={false}
                  onPress={() => this.onSelectLevel()}
                />
              );
            })}
          </View>

          <View style={stylesApp.flexRow}>
            {[1, 2, 3].map((s, i) => {
              return (
                <CheckboxRound
                  containerStyle={{
                    flex: 1,
                    paddingLeft: i % 3 !== 0 ? spacing / 2 : 0,
                    paddingRight: i % 3 !== 2 ? spacing / 2 : 0,
                  }}
                  label={`Gold ${s}`}
                  checked={false}
                  onPress={() => this.onSelectLevel()}
                />
              );
            })}
          </View>

          {/* advanced */}
          <CheckboxRound
            label="Gold Advanced"
            checked={false}
            onPress={() => this.onSelectLevel()}
          />
        </View>

        <Text style={styles.txtFormLabel}>Open</Text>
        <View style={styles.viewLevels}>
          <View style={stylesApp.flexRow}>
            {/* pre-bronze */}
            <CheckboxRound
              label="Pre-Bronze"
              checked={false}
              containerStyle={{
                flex: 1,
                paddingRight: spacing,
              }}
              onPress={() => this.onSelectLevel()}
            />
            {/* bronze */}
            <CheckboxRound
              label="Bronze"
              checked={false}
              containerStyle={{
                flex: 1,
                paddingLeft: spacing,
              }}
              onPress={() => this.onSelectLevel()}
            />
          </View>

          <View style={stylesApp.flexRow}>
            {/* pre-silver */}
            <CheckboxRound
              label="Pre-Silver"
              checked={false}
              containerStyle={{
                flex: 1,
                paddingRight: spacing,
              }}
              onPress={() => this.onSelectLevel()}
            />
            {/* silver */}
            <CheckboxRound
              label="Silver"
              checked={false}
              containerStyle={{
                flex: 1,
                paddingLeft: spacing,
              }}
              onPress={() => this.onSelectLevel()}
            />
          </View>

          <View style={stylesApp.flexRow}>
            {/* gold */}
            <CheckboxRound
              label="Gold"
              checked={false}
              containerStyle={{
                flex: 1,
                paddingRight: spacing,
              }}
              onPress={() => this.onSelectLevel()}
            />
            {/* gold advanced */}
            <CheckboxRound
              label="Gold Advanced"
              checked={false}
              containerStyle={{
                flex: 1,
                paddingLeft: spacing,
              }}
              onPress={() => this.onSelectLevel()}
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
  onSelectLevel(index) {
    this.setState({
      levelIndex: index,
    });
  }

  onButNext() {}

  onSelectAge() {
  }

  onSelectStyle() {
  }

  onButSave() {
  }
}
