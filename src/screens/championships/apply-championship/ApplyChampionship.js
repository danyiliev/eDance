import React from 'react';
import {connect} from 'react-redux';
import {Dimensions, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {stylesApp, styleUtil} from '../../../styles/app.style';
import {styles} from './styles';
import {Button, ButtonGroup, Icon, Input} from 'react-native-elements';
import {User} from '../../../models/user.model';
import {styles as stylesSignup} from '../../signup/styles';
import {colors as colorTheme} from '../../../styles/theme.style';
import {SELECT_AMERICAN_RHYTHM, SELECT_LATIN} from '../../../constants/dance-data';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {DanceHelper} from '../../../helpers/dance-helper';
import CheckboxRound from '../../../components/CheckboxRound/CheckboxRound';
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

  constructor(props) {
    super(props);

    props.navigation.setOptions({
      title: 'Apply Championship',
    });

    // todo: init test data
    for (let i = 0; i < 2; i++) {
      let sessionApply = {
        type: 'aaa',
        danceStyle: [SELECT_AMERICAN_RHYTHM, SELECT_LATIN],

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
        dancesWithStyle: [
          {
            style: '',
            dances: [],
          },
        ],
      };
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

                <TouchableOpacity style={stylesApp.flex1}>
                  <View style={styles.viewTeacher}>
                    {this.state.teacher ? (
                      <View>
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
                  />
                </View>
              </View>

              {/* email */}
              <View style={styles.viewFormRow}>
                <Text style={styles.txtFormLabel}>Email</Text>
                <View style={styles.viewInput}>
                  <Input
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
                  />
                </View>
              </View>

              {/* phone */}
              <View style={styles.viewFormRow}>
                <Text style={styles.txtFormLabel}>Telephone</Text>
                <View style={styles.viewInput}>
                  <Input
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
                  />
                </View>
              </View>

              {/* fax */}
              <View style={styles.viewFormRow}>
                <Text style={styles.txtFormLabel}>Fax</Text>
                <View style={styles.viewInput}>
                  <Input
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
                  />
                </View>
              </View>

              {/* address */}
              <View style={styles.viewFormRow}>
                <Text style={styles.txtFormLabel}>Address</Text>
                <View style={styles.viewInput}>
                  <Input
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
                  />
                </View>
              </View>

              {/* city */}
              <View style={styles.viewFormRow}>
                <Text style={styles.txtFormLabel}>City</Text>
                <View style={styles.viewInput}>
                  <Input
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
                  />
                </View>
              </View>

              {/* state */}
              <View style={{...styles.viewFormRow, marginBottom: 0}}>
                <Text style={styles.txtFormLabel}>State</Text>
                <View style={styles.viewInput}>
                  <Input
                    containerStyle={styles.ctnInput}
                    autoCapitalize={'none'}
                    returnKeyType="next"
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

          <TouchableOpacity style={stylesApp.flex1}>
            {sessionApply.ageGroup ? (
              <Text style={styles.input}>{sessionApply.ageGroup}</Text>
            ) : (
              <Text style={{...styles.input, color: colorTheme.grey}}>Select Age</Text>
            )}
          </TouchableOpacity>
        </View>

        {sessionApply.levels.map((applyLevel, i) => (
          <View style={styles.viewSubForm}>
            {/* dance level */}
            <View style={[styles.viewFormRow, stylesApp.mb4]}>
              <Text style={styles.txtFormLabel}>Dance Level</Text>

              <TouchableOpacity style={stylesApp.flex1}>
                {applyLevel.level ? (
                  <Text style={styles.input}>{applyLevel.level}</Text>
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

            {this.renderApplyLevel(applyLevel, sessionIndex)}

            {i === 0 ? (
              <Button
                containerStyle={styles.ctnButAdd}
                type="clear"
                icon={<Icon type="ionicon" name="md-add-circle" size={24} />}
                onPress={() => this.onAddPrice()}
              />
            ) : (
              <Button
                containerStyle={styles.ctnButAdd}
                type="clear"
                icon={<Icon type="ionicon" name="md-remove-circle" size={24} />}
                onPress={() => this.onRemovePrice(i)}
              />
            )}
          </View>
        ))}
      </>
    );
  }

  renderApplyLevel(applyLevel, sessionIndex) {
    const itemWidth = (SCREEN_WDITH - 14 * 6 - 30) / 4;

    return (
      <View>
        {this.state.sessionsApply[sessionIndex].danceStyle.map((style, styleIndex) => (
          <View>
            <Text style={styles.txtSubTitle}>{DanceHelper.danceStyleNameByVal(style)}</Text>

            <View style={{...styles.viewColumns, marginTop: 6, marginBottom: 14}}>
              {DanceHelper.dancesByStyle(style).map((d, i) => (
                <CheckboxRound
                  key={`session${sessionIndex}-style${styleIndex}-dance${i}`}
                  label={d.value}
                  onPress={() => this.onSelectTimeSlot(i)}
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
}

const mapStateToProps = (state) => state;

export default connect(mapStateToProps, null)(ApplyChampionship);
