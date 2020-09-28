import React from 'react';
import {connect} from 'react-redux';
import {Dimensions, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {stylesApp, styleUtil} from '../../../styles/app.style';
import {styles} from './styles';
import {Button, ButtonGroup, Icon, Input} from 'react-native-elements';
import {User} from '../../../models/user.model';
import {styles as stylesSignup} from '../../signup/styles';
import {colors as colorTheme} from '../../../styles/theme.style';
import {
  SELECT_AGE,
  SELECT_AMERICAN_RHYTHM,
  SELECT_DANCE_LEVEL,
  SELECT_LATIN,
} from '../../../constants/dance-data';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {DanceHelper} from '../../../helpers/dance-helper';
import CheckboxRound from '../../../components/CheckboxRound/CheckboxRound';
import AddStripeAccount from '../../settings/add-stripe-account/AddStripeAccount';
import SelectTeacher from '../select-teacher/SelectTeacher';
import FastImage from 'react-native-fast-image';
import {UserHelper} from '../../../helpers/user-helper';
import SelectList from '../../settings/select-list/SelectList';
const {width: SCREEN_WDITH} = Dimensions.get('window');

class ApplyChampionship extends React.Component {
  static NAV_NAME = 'apply';

  state = {
    teacher: null,
    genderIndex: 0,

    studio: '',
    email: '',
    phone: '',
    fax: '',
    address: '',
    city: '',
    state: '',
    zip: '',

    sessionsApply: [],
  };

  event = null;
  eventSession = null;

  currentIndex = 0;
  currentLevelIndex = 0;

  constructor(props) {
    super(props);

    props.navigation.setOptions({
      title: 'Apply Championship',
    });

    // get parameter
    if (props.route.params) {
      this.event = props.route.params.event;
      this.eventSession = props.route.params.session;
    }

    // init data
    for (const st of this.eventSession.types) {
      let sessionApply = {
        type: st.type,
        danceStyle: st.danceStyles,

        //   ageGroup,
        //   levels: [
        //     level,
        //     dances: {
        //       style,
        //       dances: []
        //     }
        //   ]
        ageGroup: '',
        levels: [],
      };

      const applyLevel = {
        level: '',
        dancesWithStyle: [],
      };

      for (const s of st.danceStyles) {
        applyLevel.dancesWithStyle.push({
          style: s,
          dances: [],
        });
      }
      sessionApply.levels.push(applyLevel);

      this.state.sessionsApply.push(sessionApply);
    }
  }

  render() {
    return (
      <View style={stylesApp.viewContainer}>
        <KeyboardAwareScrollView>
          <View style={styles.viewContainer}>
            <View style={styles.viewForm}>
              {/* teacher */}
              <View style={styles.viewFormRow}>
                <Text style={styles.txtFormLabel}>Teacher</Text>

                <TouchableOpacity style={stylesApp.flex1} onPress={() => this.onSelectTeacher()}>
                  <View style={styles.viewTeacher}>
                    {this.state.teacher ? (
                      <View style={stylesApp.flexRowCenter}>
                        <FastImage
                          style={styles.imgUser}
                          source={UserHelper.getUserImage(this.state.teacher)}
                          resizeMode={FastImage.resizeMode.cover}
                        />
                        <Text style={[stylesApp.ml10]}>{this.state.teacher?.getFullName()}</Text>
                      </View>
                    ) : (
                      <Text style={styles.txtPlaceholder}>Select Teacher</Text>
                    )}
                  </View>
                </TouchableOpacity>
              </View>

              <View style={styles.viewFormRow}>
                <Text style={styles.txtFormLabel}>Student</Text>
                {/* gender */}
                <ButtonGroup
                  containerStyle={styles.ctnSegmentGender}
                  buttons={User.GENDERS}
                  textStyle={stylesSignup.txtSegment}
                  innerBorderStyle={stylesSignup.borderSegment}
                  selectedButtonStyle={stylesSignup.butSegmentSelected}
                  selectedTextStyle={stylesSignup.SegmentSelected}
                  selectedIndex={this.state.genderIndex}
                  onPress={(index) => this.setState({genderIndex: index})}
                />
              </View>

              {/* studio */}
              <View style={styles.viewFormRow}>
                <Text style={styles.txtFormLabel}>Studio</Text>
                <View style={styles.viewInput}>
                  <Input
                    containerStyle={styles.ctnInput}
                    autoCapitalize={'none'}
                    returnKeyType="next"
                    placeholder="Input Studio"
                    placeholderTextColor={colorTheme.grey}
                    inputStyle={styles.input}
                    inputContainerStyle={stylesApp.input}
                    onChangeText={(studio) => {
                      this.setState({studio});
                    }}
                    value={this.state.studio}
                    renderErrorMessage={false}
                    blurOnSubmit={false}
                    onSubmitEditing={() => {
                      this.inputEmail.focus();
                    }}
                  />
                </View>
              </View>

              {/* email */}
              <View style={styles.viewFormRow}>
                <Text style={styles.txtFormLabel}>Email</Text>
                <View style={styles.viewInput}>
                  <Input
                    ref={(input) => {
                      this.inputEmail = input;
                    }}
                    containerStyle={styles.ctnInput}
                    autoCapitalize={'none'}
                    returnKeyType="next"
                    placeholder="Input Email Address"
                    placeholderTextColor={colorTheme.grey}
                    inputStyle={styles.input}
                    inputContainerStyle={stylesApp.input}
                    onChangeText={(email) => {
                      this.setState({email});
                    }}
                    value={this.state.email}
                    renderErrorMessage={false}
                    blurOnSubmit={false}
                    onSubmitEditing={() => {
                      this.inputPhone.focus();
                    }}
                  />
                </View>
              </View>

              {/* phone */}
              <View style={styles.viewFormRow}>
                <Text style={styles.txtFormLabel}>Telephone</Text>
                <View style={styles.viewInput}>
                  <Input
                    ref={(input) => {
                      this.inputPhone = input;
                    }}
                    containerStyle={styles.ctnInput}
                    autoCapitalize={'none'}
                    keyboardType="number-pad"
                    returnKeyType="next"
                    placeholder="Input Phone Number"
                    placeholderTextColor={colorTheme.grey}
                    inputStyle={styles.input}
                    inputContainerStyle={stylesApp.input}
                    onChangeText={(phone) => {
                      this.setState({phone});
                    }}
                    value={this.state.phone}
                    renderErrorMessage={false}
                    blurOnSubmit={false}
                    onSubmitEditing={() => {
                      this.inputFax.focus();
                    }}
                  />
                </View>
              </View>

              {/* fax */}
              <View style={styles.viewFormRow}>
                <Text style={styles.txtFormLabel}>Fax</Text>
                <View style={styles.viewInput}>
                  <Input
                    ref={(input) => {
                      this.inputFax = input;
                    }}
                    containerStyle={styles.ctnInput}
                    autoCapitalize={'none'}
                    keyboardType="number-pad"
                    returnKeyType="next"
                    placeholder="Input Fax Number"
                    placeholderTextColor={colorTheme.grey}
                    inputStyle={styles.input}
                    inputContainerStyle={stylesApp.input}
                    onChangeText={(fax) => {
                      this.setState({fax});
                    }}
                    value={this.state.fax}
                    renderErrorMessage={false}
                    blurOnSubmit={false}
                    onSubmitEditing={() => {
                      this.inputAddress.focus();
                    }}
                  />
                </View>
              </View>

              {/* address */}
              <View style={styles.viewFormRow}>
                <Text style={styles.txtFormLabel}>Address</Text>
                <View style={styles.viewInput}>
                  <Input
                    ref={(input) => {
                      this.inputAddress = input;
                    }}
                    containerStyle={styles.ctnInput}
                    autoCapitalize={'none'}
                    returnKeyType="next"
                    placeholder="Input Address"
                    placeholderTextColor={colorTheme.grey}
                    inputStyle={styles.input}
                    inputContainerStyle={stylesApp.input}
                    onChangeText={(address) => {
                      this.setState({address});
                    }}
                    value={this.state.address}
                    renderErrorMessage={false}
                    blurOnSubmit={false}
                    onSubmitEditing={() => {
                      this.inputCity.focus();
                    }}
                  />
                </View>
              </View>

              {/* city */}
              <View style={styles.viewFormRow}>
                <Text style={styles.txtFormLabel}>City</Text>
                <View style={styles.viewInput}>
                  <Input
                    ref={(input) => {
                      this.inputCity = input;
                    }}
                    containerStyle={styles.ctnInput}
                    autoCapitalize={'none'}
                    returnKeyType="next"
                    placeholder="Input City"
                    placeholderTextColor={colorTheme.grey}
                    inputStyle={styles.input}
                    inputContainerStyle={stylesApp.input}
                    onChangeText={(city) => {
                      this.setState({city});
                    }}
                    value={this.state.city}
                    renderErrorMessage={false}
                    blurOnSubmit={false}
                    onSubmitEditing={() => {
                      this.inputState.focus();
                    }}
                  />
                </View>
              </View>

              {/* state */}
              <View style={{...styles.viewFormRow, marginBottom: 0}}>
                <Text style={styles.txtFormLabel}>State</Text>
                <View style={styles.viewInput}>
                  <Input
                    ref={(input) => {
                      this.inputState = input;
                    }}
                    containerStyle={styles.ctnInput}
                    autoCapitalize={'none'}
                    returnKeyType="done"
                    placeholder="Input State"
                    placeholderTextColor={colorTheme.grey}
                    inputStyle={styles.input}
                    inputContainerStyle={stylesApp.input}
                    onChangeText={(state) => {
                      this.setState({state});
                    }}
                    value={this.state.state}
                    renderErrorMessage={false}
                  />
                </View>
              </View>
            </View>

            {this.state.sessionsApply.map((sa, i) => (
              <View style={styles.viewForm} key={`sessionApply-${i}`}>
                <Text style={styles.txtFormTitle}>Pro/Am and Student/Student Single-Dance Events</Text>
                {this.renderSessionApply(sa, i)}
              </View>
            ))}

            {/* save */}
            <View style={[styleUtil.withShadow(), styles.viewButSave]}>
              <Button
                title="Apply"
                buttonStyle={stylesApp.butPrimary}
                titleStyle={stylesApp.titleButPrimary}
                onPress={() => this.onButSave()}
              />
            </View>
          </View>
        </KeyboardAwareScrollView>
      </View>
    );
  }

  renderSessionApply(sessionApply, sessionIndex) {
    return (
      <>
        {/* age group */}
        <View style={[styles.viewFormRow, stylesApp.mt14]}>
          <Text style={styles.txtFormLabel}>Age Group</Text>

          <TouchableOpacity style={stylesApp.flex1} onPress={() => this.onSelectAge(sessionIndex)}>
            {sessionApply.ageGroup ? (
              <Text style={styles.input}>{DanceHelper.ageGroupNameByVal(sessionApply.ageGroup)}</Text>
            ) : (
              <Text style={{...styles.input, color: colorTheme.grey}}>Select Age</Text>
            )}
          </TouchableOpacity>
        </View>

        {sessionApply.levels.map((applyLevel, i) => (
          <View style={styles.viewSubForm} key={`sessionApply${sessionIndex}-level${i}`}>
            {/* dance level */}
            <View style={[styles.viewFormRow, stylesApp.mb4]}>
              <Text style={styles.txtFormLabel}>Dance Level</Text>

              <TouchableOpacity style={stylesApp.flex1} onPress={() => this.onSelectLevel(sessionIndex, i)}>
                {applyLevel.level ? (
                  <Text style={styles.input}>
                    {DanceHelper.danceLevelNameByVal(applyLevel.level)}
                  </Text>
                ) : (
                  <Text style={{...styles.input, color: colorTheme.grey}}>Select Level</Text>
                )}
              </TouchableOpacity>
            </View>

            {/* entry fee */}
            <View style={styles.viewFormRow}>
              <Text style={styles.txtFormLabel}>Entry Fee</Text>
              <Text style={styles.input}>$40</Text>
            </View>

            {this.renderApplyLevel(sessionIndex, i)}

            {i === 0 ? (
              <Button
                containerStyle={styles.ctnButAdd}
                type="clear"
                icon={<Icon type="ionicon" name="md-add-circle" size={24} />}
                onPress={() => this.onAddApplyLevel(sessionIndex)}
              />
            ) : (
              <Button
                containerStyle={styles.ctnButAdd}
                type="clear"
                icon={<Icon type="ionicon" name="md-remove-circle" size={24} />}
                onPress={() => this.onRemoveApplyLevel(sessionIndex, i)}
              />
            )}
          </View>
        ))}
      </>
    );
  }

  renderApplyLevel(sessionIndex, levelIndex) {
    const itemWidth = (SCREEN_WDITH - 14 * 6 - 30) / 4;

    const {sessionsApply} = this.state;
    const applyLevel = sessionsApply[sessionIndex].levels[levelIndex];

    return (
      <View>
        {this.state.sessionsApply[sessionIndex].danceStyle.map((style, styleIndex) => (
          <View key={`sessionApply${sessionIndex}-level${levelIndex}-style${styleIndex}`}>
            <Text style={styles.txtSubTitle}>{DanceHelper.danceStyleNameByVal(style)}</Text>

            <View style={{...styles.viewColumns, marginTop: 6, marginBottom: 14}}>
              {DanceHelper.dancesByStyle(style).map((d, i) => (
                <CheckboxRound
                  key={`sessionApply${sessionIndex}-level${levelIndex}-style${styleIndex}-dance${i}`}
                  label={d.value}
                  checked={applyLevel.dancesWithStyle[styleIndex]?.dances.indexOf(d.value) >= 0}
                  onPress={() => this.onSelectDance(d.value, sessionIndex, levelIndex, styleIndex)}
                  checkboxWidth={18}
                  textSize={14}
                  containerStyle={{
                    width: itemWidth,
                  }}
                />
              ))}
            </View>
          </View>
        ))}
      </View>
    );
  }

  onSelectTeacher() {
    // go to select teacher page
    this.props.navigation.push(SelectTeacher.NAV_NAME, {
      onSave: this.onSelectedTeacher.bind(this),
    });
  }
  onSelectedTeacher(teacher) {
    this.setState({teacher});
  }

  onSelectAge(sessionIndex) {
    const {sessionsApply} = this.state;
    this.currentIndex = sessionIndex;

    this.props.navigation.push(SelectList.NAV_NAME, {
      type: SELECT_AGE,
      multipleSelect: false,
      values: [sessionsApply[this.currentIndex].ageGroup],
      onSave: this.onSelectedAge.bind(this),
    });
  }
  onSelectedAge(type, values) {
    const {sessionsApply} = this.state;

    sessionsApply[this.currentIndex].ageGroup = values[0];
    this.setState({sessionsApply});
  }

  onSelectLevel(sessionIndex, levelIndex) {
    const {sessionsApply} = this.state;
    this.currentIndex = sessionIndex;
    this.currentLevelIndex = levelIndex;

    this.props.navigation.push(SelectList.NAV_NAME, {
      type: SELECT_DANCE_LEVEL,
      multipleSelect: false,
      values: [sessionsApply[this.currentIndex].levels[levelIndex].level],
      onSave: this.onSelectedLevel.bind(this),
    });
  }
  onSelectedLevel(type, values) {
    const {sessionsApply} = this.state;

    sessionsApply[this.currentIndex].levels[this.currentLevelIndex].level = values[0];
    this.setState({sessionsApply});
  }

  onSelectDance(dance, sessionIndex, levelIndex, styleIndex) {
    const {sessionsApply} = this.state;
    const applyStyle = sessionsApply[sessionIndex].levels[levelIndex].dancesWithStyle[styleIndex];
    const index = applyStyle.dances.indexOf(dance);

    if (index < 0) {
      applyStyle.dances.push(dance);
    } else {
      applyStyle.dances.splice(index, 1);
    }

    this.setState({sessionsApply});
  }

  onAddApplyLevel(sessionIndex) {
    const {sessionsApply} = this.state;

    const applyLevel = {
      level: '',
      dancesWithStyle: [],
    };

    for (const s of this.eventSession.types[sessionIndex].danceStyles) {
      applyLevel.dancesWithStyle.push({
        style: s,
        dances: [],
      });
    }
    sessionsApply[sessionIndex].levels.push(applyLevel);

    this.setState({sessionsApply});
  }

  onRemoveApplyLevel(sessionIndex, levelIndex) {
    const {sessionsApply} = this.state;
    sessionsApply[sessionIndex].levels.splice(levelIndex, 1);

    this.setState({sessionsApply});
  }
}

const mapStateToProps = (state) => state;

export default connect(mapStateToProps, null)(ApplyChampionship);
