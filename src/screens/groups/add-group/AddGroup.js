import React from 'react';
import {connect} from 'react-redux';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {stylesApp, styleUtil} from '../../../styles/app.style';
import {styles} from '../../championships/add-championship/styles';
import {Alert, Text, View} from 'react-native';
import {styles as stylesSetting} from '../../settings/setting-profile/styles';
import {styles as stylesSignup} from '../../signup/styles';
import {Button, Input} from 'react-native-elements';
import {colors as colorTheme} from '../../../styles/theme.style';
import BaseSettingProfile from '../../base-setting-profile';
import {Utils} from '../../../helpers/utils';

class AddGroup extends BaseSettingProfile {
  static NAV_NAME = 'add-group';

  group = null;

  constructor(props) {
    super(props);

    this.state = {
      ...this.state,

      // ui
      name: '',
    };

    // get parameter
    if (props.route.params) {
      this.group = props.route.params.group;
    }

    props.navigation.setOptions({
      title: this.group ? 'Edit Group' : 'Create New Group',
    });
  }

  render() {
    return (
      <KeyboardAwareScrollView style={stylesApp.viewContainer}>
        <View style={styles.viewContainer}>
          {/* name */}
          <View style={stylesSetting.viewForm}>
            <Text style={stylesSignup.txtItemTitle}>Group Name</Text>

            <View style={[stylesSetting.viewInput, stylesApp.mt12]}>
              <Input
                ref={(input) => {
                  this.inputName = input;
                }}
                containerStyle={stylesSetting.ctnInput}
                autoCapitalize={'none'}
                returnKeyType="done"
                placeholder="Input Name"
                placeholderTextColor={colorTheme.primary}
                inputStyle={stylesSetting.input}
                inputContainerStyle={stylesApp.input}
                onChangeText={(name) => {
                  this.setState({name});
                }}
                value={this.state.name}
                renderErrorMessage={false}
              />
            </View>
          </View>

          {/* levels */}
          <View style={[stylesSetting.viewForm, stylesApp.mt14]}>
            {/* title */}
            <Text style={[stylesSignup.txtItemTitle, stylesApp.mt6]}>Dance Level</Text>

            {this.renderLevels()}
          </View>

          {this.renderDanceStyles()}

          {/* save */}
          <View style={[styleUtil.withShadow(), stylesSetting.viewButSave]}>
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

  async onButSave() {
    // check validity
    if (!this.state.name) {
      Alert.alert('Invalid Group Name', 'Group name cannot be empty', [
        {
          text: 'OK',
          onPress: () => this.inputName.focus(),
        },
      ]);

      return;
    }

    if (this.state.danceLevels.length <= 0) {
      Alert.alert('Dance Levels Not Selected', 'Dance levels cannot be empty');
      return;
    }

    if (
      this.state.styleBallroom.length <= 0 &&
      this.state.styleRythm.length <= 0 &&
      this.state.styleRythm.length <= 0 &&
      this.state.styleLatin.length <= 0
    ) {
      Alert.alert('Dance Styles Not Selected', 'Dance styles and dances cannot be empty');
      return;
    }
  }
}

const mapStateToProps = (state) => state;
export default connect(mapStateToProps, null)(AddGroup);
