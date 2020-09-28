import React from 'react';
import {Button, Icon, Input} from 'react-native-elements';
import {stylesApp} from '../../../styles/app.style';
import {Alert, Dimensions, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {styles} from './styles';
import CheckboxWithShadow from '../../../components/CheckboxRound/CheckboxWithShadow';
import {PRIZE_OPTIONS} from '../../../constants/dance-data';
const {width: SCREEN_WIDTH} = Dimensions.get('window');
import {UiHelper} from '../../../helpers/ui-helper';
import moment from 'moment';
import {LoadingHUD} from 'react-native-hud-hybrid';
import Championships from '../Championships';
import {ApiService} from '../../../services';
import {setEvents} from '../../../actions/event';
import {connect} from 'react-redux';
import BasePrize from '../base-prize';
import Login from '../../login/Login';
import {colors as colorTheme} from '../../../styles/theme.style';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

class AddPrize extends BasePrize {
  static NAV_NAME = 'add-prize';
  static NAV_NAME_SIGNUP = 'add-prize-signup';

  event = null;
  currentUser = null;

  constructor(props) {
    super(props);

    props.navigation.setOptions({
      title: 'Select Cash Prizes & Awards',
      headerRight: () => (
        <Button
          type="clear"
          title="Save"
          titleStyle={stylesApp.butTitleNavRight}
          onPress={() => this.onButSave()}
        />
      ),
    });

    // get parameter
    if (props.route.params) {
      this.event = props.route.params.event;
    }

    this.currentUser = props.UserReducer.user;
    this.loadingHUD = new LoadingHUD();

    this.state = {
      // ui
      showTimePicker: false,
    };

    //
    // init parameters
    //
    this.state[PRIZE_OPTIONS.TOP_STUDIO_SINGLE] = {
      selected: false,

      data: {
        pointEachEntry: 1,
        pointEachCallback: 1,
        pointsRanking: [8, 7, 6, 5, 4, 3, 2, 1],
      },
    };

    this.state[PRIZE_OPTIONS.TOP_STUDIO_MULTI] = {
      selected: false,

      data: {
        pointEachEntry: 2,
        pointEachCallback: 2,
        pointsRanking: [16, 14, 12, 10, 8, 6, 4, 2],
      },
    };

    this.state[PRIZE_OPTIONS.TOP_TEACHER_PROAM] = {
      selected: false,

      data: {
        dateDue: '',
        levels: [
          {
            from: 430,
            to: -1,
            award: 10000,
          },
          {
            from: 286,
            to: 429,
            award: 5000,
          },
          {
            from: 143,
            to: 285,
            award: 2500,
          },
          {
            from: 72,
            to: 142,
            award: 750,
          },
        ],
      },
    };

    this.state[PRIZE_OPTIONS.SINGLE_ENTRIES] = {
      selected: false,

      data: {
        pointEachEntry: 1,
        pointEachCallback: 1,
        pointsRanking: [8, 7, 6, 5, 4, 3, 2, 1],
      },
    };

    this.state[PRIZE_OPTIONS.MULTI_ENTRIES] = {
      selected: false,

      data: {
        pointEachEntry: 2,
        pointEachCallback: 2,
        pointsRanking: [16, 14, 12, 10, 8, 6, 4, 2],
      },
    };

    this.state[PRIZE_OPTIONS.PRE_TEEN] = {
      selected: false,

      data: {},
    };

    this.state[PRIZE_OPTIONS.PROFESSIONAL] = {
      selected: false,

      data: {
        rhythm: [1500, 1000, 750, 500, 300, 150],
        latin: [1500, 1000, 750, 500, 300, 150],
      },
    };

    this.state[PRIZE_OPTIONS.PROAM_AMATEUR] = {
      selected: false,

      data: {
        pointEachEntry: 1,
        pointEachCallback: 1,
        pointsRanking: [8, 7, 6, 5, 4, 3, 2, 1],
      },
    };

    this.state[PRIZE_OPTIONS.SOLO] = {
      selected: false,

      data: {},
    };

    this.state[PRIZE_OPTIONS.PROAM_SCHOLAR_CLOSED] = {
      selected: false,

      data: [150, 100, 50],
    };

    this.state[PRIZE_OPTIONS.PROAM_SCHOLAR_OPEN] = {
      selected: false,

      data: [300, 150, 100],
    };
  }

  render() {
    return (
      <View style={stylesApp.viewContainer}>
        <KeyboardAwareScrollView>
          <View style={styles.viewContainer}>
            {this.renderTopStudio(
              true,
              this.isOptionSelected(PRIZE_OPTIONS.TOP_STUDIO_SINGLE),
              this.isOptionSelected(PRIZE_OPTIONS.TOP_STUDIO_MULTI),
            )}

            {/* top teacher money */}
            <TouchableOpacity
              activeOpacity={0.6}
              onPress={() => this.doSelectOption(PRIZE_OPTIONS.TOP_TEACHER_PROAM)}>
              {this.renderTopTeacher(true, this.isOptionSelected(PRIZE_OPTIONS.TOP_TEACHER_PROAM))}
            </TouchableOpacity>

            {/* Single, two or three dance entries */}
            <TouchableOpacity
              activeOpacity={0.6}
              onPress={() => this.doSelectOption(PRIZE_OPTIONS.SINGLE_ENTRIES)}>
              {this.renderSingleEntries(true, this.isOptionSelected(PRIZE_OPTIONS.SINGLE_ENTRIES))}
            </TouchableOpacity>

            {/* Multi - 4 or 5 dance entries */}
            <TouchableOpacity
              activeOpacity={0.6}
              onPress={() => this.doSelectOption(PRIZE_OPTIONS.MULTI_ENTRIES)}>
              {this.renderMultiEntries(true, this.isOptionSelected(PRIZE_OPTIONS.MULTI_ENTRIES))}
            </TouchableOpacity>

            {/* Pre-teens, Juniors and Young Adults */}
            <TouchableOpacity
              activeOpacity={0.6}
              onPress={() => this.doSelectOption(PRIZE_OPTIONS.PRE_TEEN)}>
              {this.renderPreTeens(true, this.isOptionSelected(PRIZE_OPTIONS.PRE_TEEN))}
            </TouchableOpacity>

            {/* Professional */}
            <TouchableOpacity
              activeOpacity={0.6}
              onPress={() => this.doSelectOption(PRIZE_OPTIONS.PROFESSIONAL)}>
              {this.renderProfessional(true, this.isOptionSelected(PRIZE_OPTIONS.PROFESSIONAL))}
            </TouchableOpacity>

            {/* Pro-Am and Amateur Awards */}
            <TouchableOpacity
              activeOpacity={0.6}
              onPress={() => this.doSelectOption(PRIZE_OPTIONS.PROAM_AMATEUR)}>
              {this.renderProAmAmateur(true, this.isOptionSelected(PRIZE_OPTIONS.PROAM_AMATEUR))}
            </TouchableOpacity>

            {/* Solo exhibitions */}
            <TouchableOpacity
              activeOpacity={0.6}
              onPress={() => this.doSelectOption(PRIZE_OPTIONS.SOLO)}>
              {this.renderSolo(true, this.isOptionSelected(PRIZE_OPTIONS.SOLO))}
            </TouchableOpacity>

            {/* Pro-Am Scholarship Championships Awards - Closed 3 Dance (Restricted Syllabus) */}
            <TouchableOpacity
              activeOpacity={0.6}
              onPress={() => this.doSelectOption(PRIZE_OPTIONS.PROAM_SCHOLAR_CLOSED)}>
              {this.renderProAmScholarClosed(true, this.isOptionSelected(PRIZE_OPTIONS.PROAM_SCHOLAR_CLOSED))}
            </TouchableOpacity>

            {/* Pro-Am Scholarship Championships Awards - Open 4 & 5 Dance (No Restricted Syllabus) */}
            <TouchableOpacity
              activeOpacity={0.6}
              onPress={() => this.doSelectOption(PRIZE_OPTIONS.PROAM_SCHOLAR_OPEN)}>
              {this.renderProAmScholarOpen(true, this.isOptionSelected(PRIZE_OPTIONS.PROAM_SCHOLAR_OPEN))}
            </TouchableOpacity>

            {/* time picker */}
            {UiHelper.getInstance().renderDateTimePicker(this, 'date', (dateDue) => {
              this.setState({dateDue: moment(dateDue).format('YYYY-MM-DD')});
            })}
          </View>
        </KeyboardAwareScrollView>
      </View>
    );
  }

  renderTopStudioSingleCore() {
    const valueData = this.state[PRIZE_OPTIONS.TOP_STUDIO_SINGLE].data;

    return (
      <View style={styles.viewSubForm}>
        <View style={stylesApp.flexRowCenter}>
          <Input
            containerStyle={{...styles.ctnInputNumber, width: 36}}
            inputStyle={styles.inputNumber}
            keyboardType="number-pad"
            placeholder="0"
            inputContainerStyle={stylesApp.input}
            onChangeText={(value) => {
              valueData.pointEachEntry = Number(value);
              this.setState(this.state);
            }}
            value={valueData.pointEachEntry.toString()}
            renderErrorMessage={false}
          />
          <Text style={styles.txtFormItem}>point for each entry</Text>
        </View>

        <View style={stylesApp.flexRowCenter}>
          <Input
            containerStyle={{...styles.ctnInputNumber, width: 36}}
            inputStyle={styles.inputNumber}
            keyboardType="number-pad"
            placeholder="0"
            inputContainerStyle={stylesApp.input}
            onChangeText={(value) => {
              valueData.pointEachCallback = Number(value);
              this.setState(this.state);
            }}
            value={valueData.pointEachCallback.toString()}
            renderErrorMessage={false}
          />
          <Text style={styles.txtFormItem}>point for each call back</Text>
        </View>

        <View style={stylesApp.mt4}>
          {valueData.pointsRanking.map((p, i) => (
            <View style={stylesApp.flexRowCenter} key={`topStudioSingle-${i}`}>
              <Text style={{...styles.txtFormItem, width: 80}}>
                {UiHelper.numberToSequence(i + 1)} place -
              </Text>
              <Input
                containerStyle={{...styles.ctnInputNumber, width: 36}}
                inputStyle={styles.inputNumber}
                keyboardType="number-pad"
                placeholder="0"
                inputContainerStyle={stylesApp.input}
                onChangeText={(value) => {
                  valueData.pointsRanking[i] = Number(value);
                  this.setState(this.state);
                }}
                value={valueData.pointsRanking[i].toString()}
                renderErrorMessage={false}
              />
              <Text style={{...styles.txtFormItem, marginRight: 14}}>points</Text>

              {i === 0 ? (
                <Button
                  type="clear"
                  icon={<Icon type="ionicon" name="md-add-circle" size={18} />}
                  onPress={() => this.onAddValue(valueData.pointsRanking)}
                />
              ) : (
                <Button
                  type="clear"
                  icon={<Icon type="ionicon" name="md-remove-circle" size={18} />}
                  onPress={() => this.onRemoveValue(valueData.pointsRanking, i)}
                />
              )}
            </View>
          ))}
        </View>
      </View>
    );
  }

  renderTopStudioMultiCore() {
    const valueData = this.state[PRIZE_OPTIONS.TOP_STUDIO_MULTI].data;

    return (
      <View style={styles.viewSubForm}>
        <View style={stylesApp.flexRowCenter}>
          <Input
            containerStyle={{...styles.ctnInputNumber, width: 36}}
            inputStyle={styles.inputNumber}
            keyboardType="number-pad"
            placeholder="0"
            inputContainerStyle={stylesApp.input}
            onChangeText={(value) => {
              valueData.pointEachEntry = Number(value);
              this.setState(this.state);
            }}
            value={valueData.pointEachEntry.toString()}
            renderErrorMessage={false}
          />
          <Text style={styles.txtFormItem}>point for each entry</Text>
        </View>

        <View style={stylesApp.flexRowCenter}>
          <Input
            containerStyle={{...styles.ctnInputNumber, width: 36}}
            inputStyle={styles.inputNumber}
            keyboardType="number-pad"
            placeholder="0"
            inputContainerStyle={stylesApp.input}
            onChangeText={(value) => {
              valueData.pointEachCallback = Number(value);
              this.setState(this.state);
            }}
            value={valueData.pointEachCallback.toString()}
            renderErrorMessage={false}
          />
          <Text style={styles.txtFormItem}>point for each call back</Text>
        </View>

        <View style={stylesApp.mt4}>
          {valueData.pointsRanking.map((p, i) => (
            <View style={stylesApp.flexRowCenter} key={`topStudioMulti-${i}`}>
              <Text style={{...styles.txtFormItem, width: 80}}>
                {UiHelper.numberToSequence(i + 1)} place -
              </Text>
              <Input
                containerStyle={{...styles.ctnInputNumber, width: 36}}
                inputStyle={styles.inputNumber}
                keyboardType="number-pad"
                placeholder="0"
                inputContainerStyle={stylesApp.input}
                onChangeText={(value) => {
                  valueData.pointsRanking[i] = Number(value);
                  this.setState(this.state);
                }}
                value={valueData.pointsRanking[i].toString()}
                renderErrorMessage={false}
              />
              <Text style={{...styles.txtFormItem, marginRight: 14}}>points</Text>

              {/* add/remove */}
              {i === 0 ? (
                <Button
                  type="clear"
                  icon={<Icon type="ionicon" name="md-add-circle" size={18} />}
                  onPress={() => this.onAddValue(valueData.pointsRanking)}
                />
              ) : (
                <Button
                  type="clear"
                  icon={<Icon type="ionicon" name="md-remove-circle" size={18} />}
                  onPress={() => this.onRemoveValue(valueData.pointsRanking, i)}
                />
              )}
            </View>
          ))}
        </View>
      </View>
    );
  }

  renderTopTeacherCore() {
    const valueData = this.state[PRIZE_OPTIONS.TOP_TEACHER_PROAM].data;

    return (
      <>
        <View style={{...styles.viewRow, paddingRight: 36}}>
          {/* header */}
          <View style={{...styles.viewRowItem, flex: 1}}>
            <Text style={styles.txtTableHeader}>Level</Text>
          </View>
          <View style={{...styles.viewRowItem, flex: 2}}>
            <Text style={styles.txtTableHeader}>Top Teacher Pro/Am Required Entries</Text>
          </View>
          <View style={{...styles.viewRowItem, flex: 2}}>
            <Text style={styles.txtTableHeader}>1st</Text>
          </View>
        </View>

        {valueData.levels.map((level, i) => (
          <View style={styles.viewRow} key={`topTeacherProAm-${i}`}>
            <View style={{...styles.viewRowItem, flex: 1}}>
              <Text style={styles.txtFormItem}>{i + 1}</Text>
            </View>
            <View style={{...styles.viewRowItem, flex: 2}}>
              <View style={stylesApp.flexRowCenter}>
                {/* from */}
                <Input
                  containerStyle={{...styles.ctnInputNumber, width: 48}}
                  inputStyle={styles.inputNumber}
                  keyboardType="number-pad"
                  placeholder="0"
                  inputContainerStyle={stylesApp.input}
                  onChangeText={(value) => {
                    level.from = Number(value);
                    this.setState(this.state);
                  }}
                  value={level.from?.toString()}
                  renderErrorMessage={false}
                />
                <Text style={styles.txtFormItem}>and</Text>
                {i === 0 ? (
                  <Text style={styles.txtFormItem}> up</Text>
                ) : (
                  // to
                  <Input
                    containerStyle={{...styles.ctnInputNumber, width: 48}}
                    inputStyle={styles.inputNumber}
                    keyboardType="number-pad"
                    placeholder="0"
                    inputContainerStyle={stylesApp.input}
                    onChangeText={(value) => {
                      level.to = Number(value);
                      this.setState(this.state);
                    }}
                    value={level.to?.toString()}
                    renderErrorMessage={false}
                  />
                )}
              </View>
            </View>
            <View style={{...styles.viewRowItem, flex: 2}}>
              {/* award */}
              <View style={stylesApp.flexRowCenter}>
                <Text style={styles.txtFormItem}>$</Text>
                <Input
                  containerStyle={{...styles.ctnInputNumber, width: 60}}
                  inputStyle={styles.inputNumber}
                  keyboardType="number-pad"
                  placeholder="0"
                  inputContainerStyle={stylesApp.input}
                  onChangeText={(value) => {
                    level.award = Number(value);
                    this.setState(this.state);
                  }}
                  value={level.award?.toString()}
                  renderErrorMessage={false}
                />
              </View>
            </View>

            {/* add/remove */}
            {i === 0 ? (
              <Button
                type="clear"
                icon={<Icon type="ionicon" name="md-add-circle" size={18} />}
                onPress={() => this.onAddValue(valueData.levels, {})}
              />
            ) : (
              <Button
                type="clear"
                icon={<Icon type="ionicon" name="md-remove-circle" size={18} />}
                onPress={() => this.onRemoveValue(valueData.levels, i)}
              />
            )}
          </View>
        ))}
      </>
    );
  }

  renderSingleEntriesCore() {
    const valueData = this.state[PRIZE_OPTIONS.SINGLE_ENTRIES].data;

    return (
      <View style={styles.viewForm}>
        <View style={stylesApp.flexRowCenter}>
          <Input
            containerStyle={{...styles.ctnInputNumber, width: 36}}
            inputStyle={styles.inputNumber}
            keyboardType="number-pad"
            placeholder="0"
            inputContainerStyle={stylesApp.input}
            onChangeText={(value) => {
              valueData.pointEachEntry = Number(value);
              this.setState(this.state);
            }}
            value={valueData.pointEachEntry.toString()}
            renderErrorMessage={false}
          />
          <Text style={styles.txtFormItem}>point for each entry</Text>
        </View>

        <View style={stylesApp.flexRowCenter}>
          <Input
            containerStyle={{...styles.ctnInputNumber, width: 36}}
            inputStyle={styles.inputNumber}
            keyboardType="number-pad"
            placeholder="0"
            inputContainerStyle={stylesApp.input}
            onChangeText={(value) => {
              valueData.pointEachCallback = Number(value);
              this.setState(this.state);
            }}
            value={valueData.pointEachCallback.toString()}
            renderErrorMessage={false}
          />
          <Text style={styles.txtFormItem}>point for each call back</Text>
        </View>

        <View style={stylesApp.mt4}>
          {valueData.pointsRanking.map((p, i) => (
            <View style={stylesApp.flexRowCenter} key={`topStudioSingle-${i}`}>
              <Text style={{...styles.txtFormItem, width: 80}}>
                {UiHelper.numberToSequence(i + 1)} place -
              </Text>
              <Input
                containerStyle={{...styles.ctnInputNumber, width: 36}}
                inputStyle={styles.inputNumber}
                keyboardType="number-pad"
                placeholder="0"
                inputContainerStyle={stylesApp.input}
                onChangeText={(value) => {
                  valueData.pointsRanking[i] = Number(value);
                  this.setState(this.state);
                }}
                value={valueData.pointsRanking[i].toString()}
                renderErrorMessage={false}
              />
              <Text style={{...styles.txtFormItem, marginRight: 14}}>points</Text>

              {i === 0 ? (
                <Button
                  type="clear"
                  icon={<Icon type="ionicon" name="md-add-circle" size={18} />}
                  onPress={() => this.onAddValue(valueData.pointsRanking)}
                />
              ) : (
                <Button
                  type="clear"
                  icon={<Icon type="ionicon" name="md-remove-circle" size={18} />}
                  onPress={() => this.onRemoveValue(valueData.pointsRanking, i)}
                />
              )}
            </View>
          ))}
        </View>
      </View>
    );
  }

  renderMultiEntriesCore() {
    const valueData = this.state[PRIZE_OPTIONS.MULTI_ENTRIES].data;

    return (
      <View style={styles.viewForm}>
        <View style={stylesApp.flexRowCenter}>
          <Input
            containerStyle={{...styles.ctnInputNumber, width: 36}}
            inputStyle={styles.inputNumber}
            keyboardType="number-pad"
            placeholder="0"
            inputContainerStyle={stylesApp.input}
            onChangeText={(value) => {
              valueData.pointEachEntry = Number(value);
              this.setState(this.state);
            }}
            value={valueData.pointEachEntry.toString()}
            renderErrorMessage={false}
          />
          <Text style={styles.txtFormItem}>point for each entry</Text>
        </View>

        <View style={stylesApp.flexRowCenter}>
          <Input
            containerStyle={{...styles.ctnInputNumber, width: 36}}
            inputStyle={styles.inputNumber}
            keyboardType="number-pad"
            placeholder="0"
            inputContainerStyle={stylesApp.input}
            onChangeText={(value) => {
              valueData.pointEachCallback = Number(value);
              this.setState(this.state);
            }}
            value={valueData.pointEachCallback.toString()}
            renderErrorMessage={false}
          />
          <Text style={styles.txtFormItem}>point for each call back</Text>
        </View>

        <View style={stylesApp.mt4}>
          {valueData.pointsRanking.map((p, i) => (
            <View style={stylesApp.flexRowCenter} key={`topStudioSingle-${i}`}>
              <Text style={{...styles.txtFormItem, width: 80}}>
                {UiHelper.numberToSequence(i + 1)} place -
              </Text>
              <Input
                containerStyle={{...styles.ctnInputNumber, width: 36}}
                inputStyle={styles.inputNumber}
                keyboardType="number-pad"
                placeholder="0"
                inputContainerStyle={stylesApp.input}
                onChangeText={(value) => {
                  valueData.pointsRanking[i] = Number(value);
                  this.setState(this.state);
                }}
                value={valueData.pointsRanking[i].toString()}
                renderErrorMessage={false}
              />
              <Text style={{...styles.txtFormItem, marginRight: 14}}>points</Text>

              {i === 0 ? (
                <Button
                  type="clear"
                  icon={<Icon type="ionicon" name="md-add-circle" size={18} />}
                  onPress={() => this.onAddValue(valueData.pointsRanking)}
                />
              ) : (
                <Button
                  type="clear"
                  icon={<Icon type="ionicon" name="md-remove-circle" size={18} />}
                  onPress={() => this.onRemoveValue(valueData.pointsRanking, i)}
                />
              )}
            </View>
          ))}
        </View>
      </View>
    );
  }

  renderProfessionalCore() {
    const valueData = this.state[PRIZE_OPTIONS.PROFESSIONAL].data;

    return (
      <>
        <Text style={styles.txtSubTitle}>Rhythm & Smooth</Text>
        <View style={stylesApp.mt4}>
          {valueData.rhythm.map((p, i) => (
            <View style={stylesApp.flexRowCenter} key={`Professional-Rhytm-${i}`}>
              <Text style={{...styles.txtFormItem, width: 80}}>
                {UiHelper.numberToSequence(i + 1)} place -
              </Text>
              <Text style={styles.txtFormItem}>$</Text>
              <Input
                containerStyle={{...styles.ctnInputNumber, width: 60}}
                inputStyle={styles.inputNumber}
                keyboardType="number-pad"
                placeholder="0"
                inputContainerStyle={stylesApp.input}
                onChangeText={(value) => {
                  valueData.rhythm[i] = Number(value);
                  this.setState(this.state);
                }}
                value={valueData.rhythm[i].toString()}
                renderErrorMessage={false}
              />

              {i === 0 ? (
                <Button
                  type="clear"
                  icon={<Icon type="ionicon" name="md-add-circle" size={18} />}
                  onPress={() => this.onAddValue(valueData.rhythm)}
                />
              ) : (
                <Button
                  type="clear"
                  icon={<Icon type="ionicon" name="md-remove-circle" size={18} />}
                  onPress={() => this.onRemoveValue(valueData.rhythm, i)}
                />
              )}
            </View>
          ))}
        </View>

        <Text style={[styles.txtSubTitle, stylesApp.mt8]}>Latin & Standard</Text>
        <View style={stylesApp.mt4}>
          {valueData.latin.map((p, i) => (
            <View style={stylesApp.flexRowCenter} key={`Professional-Latin-${i}`}>
              <Text style={{...styles.txtFormItem, width: 80}}>
                {UiHelper.numberToSequence(i + 1)} place -
              </Text>
              <Text style={styles.txtFormItem}>$</Text>
              <Input
                containerStyle={{...styles.ctnInputNumber, width: 60}}
                inputStyle={styles.inputNumber}
                keyboardType="number-pad"
                placeholder="0"
                inputContainerStyle={stylesApp.input}
                onChangeText={(value) => {
                  valueData.latin[i] = Number(value);
                  this.setState(this.state);
                }}
                value={valueData.latin[i].toString()}
                renderErrorMessage={false}
              />

              {i === 0 ? (
                <Button
                  type="clear"
                  icon={<Icon type="ionicon" name="md-add-circle" size={18} />}
                  onPress={() => this.onAddValue(valueData.latin)}
                />
              ) : (
                <Button
                  type="clear"
                  icon={<Icon type="ionicon" name="md-remove-circle" size={18} />}
                  onPress={() => this.onRemoveValue(valueData.latin, i)}
                />
              )}
            </View>
          ))}
        </View>
      </>
    );
  }

  renderProAmAmateurCore() {
    const valueData = this.state[PRIZE_OPTIONS.PROAM_AMATEUR].data;

    return (
      <>
        <View style={stylesApp.flexRowCenter}>
          <Input
            containerStyle={{...styles.ctnInputNumber, width: 36}}
            inputStyle={styles.inputNumber}
            keyboardType="number-pad"
            placeholder="0"
            inputContainerStyle={stylesApp.input}
            onChangeText={(value) => {
              valueData.pointEachEntry = Number(value);
              this.setState(this.state);
            }}
            value={valueData.pointEachEntry.toString()}
            renderErrorMessage={false}
          />
          <Text style={styles.txtFormItem}>point for each entry</Text>
        </View>

        <View style={stylesApp.flexRowCenter}>
          <Input
            containerStyle={{...styles.ctnInputNumber, width: 36}}
            inputStyle={styles.inputNumber}
            keyboardType="number-pad"
            placeholder="0"
            inputContainerStyle={stylesApp.input}
            onChangeText={(value) => {
              valueData.pointEachCallback = Number(value);
              this.setState(this.state);
            }}
            value={valueData.pointEachCallback.toString()}
            renderErrorMessage={false}
          />
          <Text style={styles.txtFormItem}>point for each call back</Text>
        </View>

        <View style={stylesApp.mt4}>
          {valueData.pointsRanking.map((p, i) => (
            <View style={stylesApp.flexRowCenter} key={`proAmAmateur-${i}`}>
              <Text style={{...styles.txtFormItem, width: 80}}>
                {UiHelper.numberToSequence(i + 1)} place -
              </Text>
              <Input
                containerStyle={{...styles.ctnInputNumber, width: 36}}
                inputStyle={styles.inputNumber}
                keyboardType="number-pad"
                placeholder="0"
                inputContainerStyle={stylesApp.input}
                onChangeText={(value) => {
                  valueData.pointsRanking[i] = Number(value);
                  this.setState(this.state);
                }}
                value={valueData.pointsRanking[i].toString()}
                renderErrorMessage={false}
              />
              <Text style={{...styles.txtFormItem, marginRight: 14}}>points</Text>

              {i === 0 ? (
                <Button
                  type="clear"
                  icon={<Icon type="ionicon" name="md-add-circle" size={18} />}
                  onPress={() => this.onAddValue(valueData.pointsRanking)}
                />
              ) : (
                <Button
                  type="clear"
                  icon={<Icon type="ionicon" name="md-remove-circle" size={18} />}
                  onPress={() => this.onRemoveValue(valueData.pointsRanking, i)}
                />
              )}
            </View>
          ))}
        </View>
      </>
    );
  }

  renderProAmScholarClosedCore() {
    const valueData = this.state[PRIZE_OPTIONS.PROAM_SCHOLAR_CLOSED].data;

    return (
      <View style={stylesApp.mt4}>
        {valueData.map((p, i) => (
          <View style={stylesApp.flexRowCenter} key={`proAmScholarClosed-${i}`}>
            <Text style={{...styles.txtFormItem, width: 80}}>
              {UiHelper.numberToSequence(i + 1)} place -
            </Text>
            <Text style={styles.txtFormItem}>$</Text>
            <Input
              containerStyle={{...styles.ctnInputNumber, width: 60}}
              inputStyle={styles.inputNumber}
              keyboardType="number-pad"
              placeholder="0"
              inputContainerStyle={stylesApp.input}
              onChangeText={(value) => {
                valueData[i] = Number(value);
                this.setState(this.state);
              }}
              value={valueData[i].toString()}
              renderErrorMessage={false}
            />

            {i === 0 ? (
              <Button
                type="clear"
                icon={<Icon type="ionicon" name="md-add-circle" size={18} />}
                onPress={() => this.onAddValue(valueData)}
              />
            ) : (
              <Button
                type="clear"
                icon={<Icon type="ionicon" name="md-remove-circle" size={18} />}
                onPress={() => this.onRemoveValue(valueData, i)}
              />
            )}
          </View>
        ))}
      </View>
    );
  }

  renderProAmScholarOpenCore() {
    const valueData = this.state[PRIZE_OPTIONS.PROAM_SCHOLAR_OPEN].data;

    return (
      <View style={stylesApp.mt4}>
        {valueData.map((p, i) => (
          <View style={stylesApp.flexRowCenter} key={`proAmScholarClosed-${i}`}>
            <Text style={{...styles.txtFormItem, width: 80}}>
              {UiHelper.numberToSequence(i + 1)} place -
            </Text>
            <Text style={styles.txtFormItem}>$</Text>
            <Input
              containerStyle={{...styles.ctnInputNumber, width: 60}}
              inputStyle={styles.inputNumber}
              keyboardType="number-pad"
              placeholder="0"
              inputContainerStyle={stylesApp.input}
              onChangeText={(value) => {
                valueData[i] = Number(value);
                this.setState(this.state);
              }}
              value={valueData[i].toString()}
              renderErrorMessage={false}
            />

            {i === 0 ? (
              <Button
                type="clear"
                icon={<Icon type="ionicon" name="md-add-circle" size={18}/>}
                onPress={() => this.onAddValue(valueData)}
              />
            ) : (
              <Button
                type="clear"
                icon={<Icon type="ionicon" name="md-remove-circle" size={18} />}
                onPress={() => this.onRemoveValue(valueData, i)}
              />
            )}
          </View>
        ))}
      </View>
    );
  }

  onAddValue(object, value = 1) {
    object.push(value);

    this.setState(this.state);
  }
  onRemoveValue(object, index) {
    object.splice(index, 1);

    this.setState(this.state);
  }

  doSelectOption(option) {
    this.state[option].selected = !this.state[option].selected;

    this.setState(this.state);
  }

  isOptionSelected(option) {
    return this.state[option].selected;
  }

  onSelectDate() {
    if (this.state.dateDue) {
      UiHelper.getInstance().timeSelected = moment(this.state.dateDue, 'YYYY-MM-DD').toDate();
    }

    // show time picker
    this.setState({
      showTimePicker: true,
    });
  }

  async onButSave() {
    if (!this.event) {
      return;
    }

    //
    // set prize options data
    //
    if (this.state[PRIZE_OPTIONS.TOP_STUDIO_SINGLE].selected) {
      this.event.prizeOptions[PRIZE_OPTIONS.TOP_STUDIO_SINGLE] = this.state[PRIZE_OPTIONS.TOP_STUDIO_SINGLE].data;
    }
    if (this.state[PRIZE_OPTIONS.TOP_STUDIO_MULTI].selected) {
      this.event.prizeOptions[PRIZE_OPTIONS.TOP_STUDIO_MULTI] = this.state[PRIZE_OPTIONS.TOP_STUDIO_MULTI].data;
    }
    if (this.state[PRIZE_OPTIONS.TOP_TEACHER_PROAM].selected) {
      this.event.prizeOptions[PRIZE_OPTIONS.TOP_TEACHER_PROAM] = this.state[PRIZE_OPTIONS.TOP_TEACHER_PROAM].data;
    }
    if (this.state[PRIZE_OPTIONS.SINGLE_ENTRIES].selected) {
      this.event.prizeOptions[PRIZE_OPTIONS.SINGLE_ENTRIES] = this.state[PRIZE_OPTIONS.SINGLE_ENTRIES].data;
    }
    if (this.state[PRIZE_OPTIONS.MULTI_ENTRIES].selected) {
      this.event.prizeOptions[PRIZE_OPTIONS.MULTI_ENTRIES] = this.state[PRIZE_OPTIONS.MULTI_ENTRIES].data;
    }
    if (this.state[PRIZE_OPTIONS.PRE_TEEN].selected) {
      this.event.prizeOptions[PRIZE_OPTIONS.PRE_TEEN] = this.state[PRIZE_OPTIONS.PRE_TEEN].data;
    }
    if (this.state[PRIZE_OPTIONS.PROFESSIONAL].selected) {
      this.event.prizeOptions[PRIZE_OPTIONS.PROFESSIONAL] = this.state[PRIZE_OPTIONS.PROFESSIONAL].data;
    }
    if (this.state[PRIZE_OPTIONS.PROAM_AMATEUR].selected) {
      this.event.prizeOptions[PRIZE_OPTIONS.PROAM_AMATEUR] = this.state[PRIZE_OPTIONS.PROAM_AMATEUR].data;
    }
    if (this.state[PRIZE_OPTIONS.SOLO].selected) {
      this.event.prizeOptions[PRIZE_OPTIONS.SOLO] = this.state[PRIZE_OPTIONS.SOLO].data;
    }
    if (this.state[PRIZE_OPTIONS.PROAM_SCHOLAR_CLOSED].selected) {
      this.event.prizeOptions[PRIZE_OPTIONS.PROAM_SCHOLAR_CLOSED] = this.state[PRIZE_OPTIONS.PROAM_SCHOLAR_CLOSED].data;
    }
    if (this.state[PRIZE_OPTIONS.PROAM_SCHOLAR_OPEN].selected) {
      this.event.prizeOptions[PRIZE_OPTIONS.PROAM_SCHOLAR_OPEN] = this.state[PRIZE_OPTIONS.PROAM_SCHOLAR_OPEN].data;
    }

    if (this.currentUser && this.currentUser.id) {
      // show loading
      this.loadingHUD.show();

      // this.event.prizeOptions = this.state.selectedOptions;
      this.event.user = this.currentUser;

      // create event
      try {
        const result = await ApiService.addEvent(this.event);
        this.event.id = result._id;

        // add to reducers
        let {events} = this.props.EventReducer;
        events.unshift(this.event);

        // go to events page
        this.props.navigation.navigate(Championships.NAV_NAME);
      } catch (e) {
        console.log(e);

        Alert.alert('Failed to Create Event', e.message);
      }

      // hide loading
      this.loadingHUD.hideAll();
    } else {
      // go to log in page
      this.props.navigation.push(Login.NAV_NAME, {
        event: this.event,
      });
    }
  }
}

const mapStateToProps = (state) => state;
const mapDispatchToProps = {
  setEvents,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddPrize);
