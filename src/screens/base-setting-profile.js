import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {styles} from './settings/setting-profile/styles';
import CheckboxRound from '../components/CheckboxRound/CheckboxRound';
import {
  DANCE_LEVELS, SELECT_AGE,
  SELECT_AMERICAN_BALLROOM,
  SELECT_AMERICAN_RHYTHM,
  SELECT_LATIN,
  SELECT_STANDARD,
} from '../constants/dance-data';
import {stylesApp} from '../styles/app.style';
import {styles as stylesSignup} from './signup/styles';
import {Icon} from 'react-native-elements';
import {colors as colorTheme} from '../styles/theme.style';
import TagItem from '../components/TagItem/TagItem';
import SelectList from './settings/select-list/SelectList';
import {LoadingHUD} from 'react-native-hud-hybrid';

export default class BaseSettingProfile extends React.Component {
  currentUser = null;

  constructor(props) {
    super(props);

    this.state = {
      danceLevels: [],

      styleBallroom: [],
      styleRythm: [],
      styleStandard: [],
      styleLatin: [],
    };

    this.loadingHUD = new LoadingHUD();
  }

  renderDanceStyles() {
    return (
      <>
        <Text style={[stylesSignup.txtItemTitle, stylesApp.mt14]}>Dance Styles & Dances</Text>

        {/* american ballroom */}
        <TouchableOpacity onPress={() => this.onSelectStyle(SELECT_AMERICAN_BALLROOM)}>
          <View style={{...styles.viewListItem, ...stylesApp.mt14}}>
            <Text style={styles.txtItem}>American Ballroom</Text>

            {/* chevron */}
            <Icon type="ionicon" name="ios-arrow-forward" size={18} color={colorTheme.primary} />
          </View>
        </TouchableOpacity>

        {/* tags */}
        <View style={styles.viewTapContainer}>
          {this.state.styleBallroom.map((value, i) => {
            return <TagItem key={i.toString()} text={value} />;
          })}
        </View>

        {/* american rhythm */}
        <TouchableOpacity onPress={() => this.onSelectStyle(SELECT_AMERICAN_RHYTHM)}>
          <View style={{...styles.viewListItem, ...stylesApp.mt12}}>
            <Text style={styles.txtItem}>American Rhythm</Text>

            {/* chevron */}
            <Icon type="ionicon" name="ios-arrow-forward" size={18} color={colorTheme.primary} />
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
            <Icon type="ionicon" name="ios-arrow-forward" size={18} color={colorTheme.primary} />
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
            <Icon type="ionicon" name="ios-arrow-forward" size={18} color={colorTheme.primary} />
          </View>
        </TouchableOpacity>

        {/* tags */}
        <View style={styles.viewTapContainer}>
          {this.state.styleLatin.map((value, i) => {
            return <TagItem key={i.toString()} text={value} />;
          })}
        </View>
      </>
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
                  onPress={() => this.onSelectLevel(DANCE_LEVELS.CLOSED_BRONZE[i])}
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
                  onPress={() => this.onSelectLevel(DANCE_LEVELS.CLOSED_SILVER[i])}
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
                  onPress={() => this.onSelectLevel(DANCE_LEVELS.CLOSED_GOLD[i])}
                />
              );
            })}
          </View>

          {/* advanced */}
          <CheckboxRound
            label="Gold Advanced"
            checked={this.isLevelSelected(DANCE_LEVELS.CLOSED_GOLD_ADVANCED)}
            onPress={() => this.onSelectLevel(DANCE_LEVELS.CLOSED_GOLD_ADVANCED)}
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
              onPress={() => this.onSelectLevel(DANCE_LEVELS.OPEN_GOLD_ADVANCED)}
            />
          </View>
        </View>
      </View>
    );
  }

  isLevelSelected(level) {
    return this.state.danceLevels.findIndex((data) => data === level) >= 0;
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
    if (type === SELECT_AMERICAN_BALLROOM) {
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
}
