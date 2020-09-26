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

      selectedOptions: [],

      //
      // init parameters
      //
      topStudioSingle: {
        pointEachEntry: 1,
        pointEachCallback: 1,
        pointsRanking: [8, 7, 6, 5, 4, 3, 2, 1],
      },
      topStudioMultiple: {
        pointEachEntry: 2,
        pointEachCallback: 2,
        pointsRanking: [16, 14, 12, 10, 8, 6, 4, 2],
      },
      topTeacherProAm: {
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
      singleEntry: {
        pointEachEntry: 1,
        pointEachCallback: 1,
        pointsRanking: [8, 7, 6, 5, 4, 3, 2, 1],
      },
      multiEntry: {
        pointEachEntry: 2,
        pointEachCallback: 2,
        pointsRanking: [16, 14, 12, 10, 8, 6, 4, 2],
      },
      preTeens: false,
      professional: {
        rhythm: [1500, 1000, 750, 500, 300, 150],
        latin: [1500, 1000, 750, 500, 300, 150],
      },
      proAmAmateur: {
        pointEachEntry: 1,
        pointEachCallback: 1,
        pointsRanking: [8, 7, 6, 5, 4, 3, 2, 1],
      },
      solo: false,
      proAmScholarClosed: [150, 100, 50],
      proAmScholarOpen: [300, 150, 100],
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
              this.state.topStudioSingle.pointEachEntry = Number(value);
              this.setState(this.state);
            }}
            value={this.state.topStudioSingle.pointEachEntry.toString()}
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
              this.state.topStudioSingle.pointEachCallback = Number(value);
              this.setState(this.state);
            }}
            value={this.state.topStudioSingle.pointEachCallback.toString()}
            renderErrorMessage={false}
          />
          <Text style={styles.txtFormItem}>point for each call back</Text>
        </View>

        <View style={stylesApp.mt4}>
          {this.state.topStudioSingle.pointsRanking.map((p, i) => (
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
                  this.state.topStudioSingle.pointsRanking[i] = Number(value);
                  this.setState(this.state);
                }}
                value={this.state.topStudioSingle.pointsRanking[i].toString()}
                renderErrorMessage={false}
              />
              <Text style={{...styles.txtFormItem, marginRight: 14}}>points</Text>

              {i === 0 ? (
                <Button
                  type="clear"
                  icon={<Icon type="ionicon" name="md-add-circle" size={18} />}
                  onPress={() => this.onAddValue(this.state.topStudioSingle.pointsRanking)}
                />
              ) : (
                <Button
                  type="clear"
                  icon={<Icon type="ionicon" name="md-remove-circle" size={18} />}
                  onPress={() => this.onRemoveValue(this.state.topStudioSingle.pointsRanking, i)}
                />
              )}
            </View>
          ))}
        </View>
      </View>
    );
  }

  renderTopStudioMultiCore() {
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
              this.state.topStudioMultiple.pointEachEntry = Number(value);
              this.setState(this.state);
            }}
            value={this.state.topStudioMultiple.pointEachEntry.toString()}
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
              this.state.topStudioMultiple.pointEachCallback = Number(value);
              this.setState(this.state);
            }}
            value={this.state.topStudioMultiple.pointEachCallback.toString()}
            renderErrorMessage={false}
          />
          <Text style={styles.txtFormItem}>point for each call back</Text>
        </View>

        <View style={stylesApp.mt4}>
          {this.state.topStudioMultiple.pointsRanking.map((p, i) => (
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
                  this.state.topStudioMultiple.pointsRanking[i] = Number(value);
                  this.setState(this.state);
                }}
                value={this.state.topStudioMultiple.pointsRanking[i].toString()}
                renderErrorMessage={false}
              />
              <Text style={{...styles.txtFormItem, marginRight: 14}}>points</Text>

              {/* add/remove */}
              {i === 0 ? (
                <Button
                  type="clear"
                  icon={<Icon type="ionicon" name="md-add-circle" size={18} />}
                  onPress={() => this.onAddValue(this.state.topStudioMultiple.pointsRanking)}
                />
              ) : (
                <Button
                  type="clear"
                  icon={<Icon type="ionicon" name="md-remove-circle" size={18} />}
                  onPress={() => this.onRemoveValue(this.state.topStudioMultiple.pointsRanking, i)}
                />
              )}
            </View>
          ))}
        </View>
      </View>
    );
  }

  renderTopTeacherCore() {
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

        {this.state.topTeacherProAm.levels.map((level, i) => (
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
                onPress={() => this.onAddValue(this.state.topTeacherProAm.levels, {})}
              />
            ) : (
              <Button
                type="clear"
                icon={<Icon type="ionicon" name="md-remove-circle" size={18} />}
                onPress={() => this.onRemoveValue(this.state.topTeacherProAm.levels, i)}
              />
            )}
          </View>
        ))}
      </>
    );
  }

  renderSingleEntriesCore() {
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
              this.state.singleEntry.pointEachEntry = Number(value);
              this.setState(this.state);
            }}
            value={this.state.singleEntry.pointEachEntry.toString()}
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
              this.state.singleEntry.pointEachCallback = Number(value);
              this.setState(this.state);
            }}
            value={this.state.singleEntry.pointEachCallback.toString()}
            renderErrorMessage={false}
          />
          <Text style={styles.txtFormItem}>point for each call back</Text>
        </View>

        <View style={stylesApp.mt4}>
          {this.state.singleEntry.pointsRanking.map((p, i) => (
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
                  this.state.singleEntry.pointsRanking[i] = Number(value);
                  this.setState(this.state);
                }}
                value={this.state.singleEntry.pointsRanking[i].toString()}
                renderErrorMessage={false}
              />
              <Text style={{...styles.txtFormItem, marginRight: 14}}>points</Text>

              {i === 0 ? (
                <Button
                  type="clear"
                  icon={<Icon type="ionicon" name="md-add-circle" size={18} />}
                  onPress={() => this.onAddValue(this.state.singleEntry.pointsRanking)}
                />
              ) : (
                <Button
                  type="clear"
                  icon={<Icon type="ionicon" name="md-remove-circle" size={18} />}
                  onPress={() => this.onRemoveValue(this.state.singleEntry.pointsRanking, i)}
                />
              )}
            </View>
          ))}
        </View>
      </View>
    );
  }

  renderMultiEntriesCore() {
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
              this.state.multiEntry.pointEachEntry = Number(value);
              this.setState(this.state);
            }}
            value={this.state.multiEntry.pointEachEntry.toString()}
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
              this.state.multiEntry.pointEachCallback = Number(value);
              this.setState(this.state);
            }}
            value={this.state.multiEntry.pointEachCallback.toString()}
            renderErrorMessage={false}
          />
          <Text style={styles.txtFormItem}>point for each call back</Text>
        </View>

        <View style={stylesApp.mt4}>
          {this.state.multiEntry.pointsRanking.map((p, i) => (
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
                  this.state.multiEntry.pointsRanking[i] = Number(value);
                  this.setState(this.state);
                }}
                value={this.state.multiEntry.pointsRanking[i].toString()}
                renderErrorMessage={false}
              />
              <Text style={{...styles.txtFormItem, marginRight: 14}}>points</Text>

              {i === 0 ? (
                <Button
                  type="clear"
                  icon={<Icon type="ionicon" name="md-add-circle" size={18} />}
                  onPress={() => this.onAddValue(this.state.multiEntry.pointsRanking)}
                />
              ) : (
                <Button
                  type="clear"
                  icon={<Icon type="ionicon" name="md-remove-circle" size={18} />}
                  onPress={() => this.onRemoveValue(this.state.multiEntry.pointsRanking, i)}
                />
              )}
            </View>
          ))}
        </View>
      </View>
    );
  }

  renderProfessionalCore() {
    return (
      <>
        <Text style={styles.txtSubTitle}>Rhythm & Smooth</Text>
        <View style={stylesApp.mt4}>
          {this.state.professional.rhythm.map((p, i) => (
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
                  this.state.professional.rhythm[i] = Number(value);
                  this.setState(this.state);
                }}
                value={this.state.professional.rhythm[i].toString()}
                renderErrorMessage={false}
              />

              {i === 0 ? (
                <Button
                  type="clear"
                  icon={<Icon type="ionicon" name="md-add-circle" size={18} />}
                  onPress={() => this.onAddValue(this.state.professional.rhythm)}
                />
              ) : (
                <Button
                  type="clear"
                  icon={<Icon type="ionicon" name="md-remove-circle" size={18} />}
                  onPress={() => this.onRemoveValue(this.state.professional.rhythm, i)}
                />
              )}
            </View>
          ))}
        </View>

        <Text style={[styles.txtSubTitle, stylesApp.mt8]}>Latin & Standard</Text>
        <View style={stylesApp.mt4}>
          {this.state.professional.latin.map((p, i) => (
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
                  this.state.professional.latin[i] = Number(value);
                  this.setState(this.state);
                }}
                value={this.state.professional.latin[i].toString()}
                renderErrorMessage={false}
              />

              {i === 0 ? (
                <Button
                  type="clear"
                  icon={<Icon type="ionicon" name="md-add-circle" size={18} />}
                  onPress={() => this.onAddValue(this.state.professional.latin)}
                />
              ) : (
                <Button
                  type="clear"
                  icon={<Icon type="ionicon" name="md-remove-circle" size={18} />}
                  onPress={() => this.onRemoveValue(this.state.professional.latin, i)}
                />
              )}
            </View>
          ))}
        </View>
      </>
    );
  }

  renderProAmAmateurCore() {
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
              this.state.proAmAmateur.pointEachEntry = Number(value);
              this.setState(this.state);
            }}
            value={this.state.proAmAmateur.pointEachEntry.toString()}
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
              this.state.proAmAmateur.pointEachCallback = Number(value);
              this.setState(this.state);
            }}
            value={this.state.proAmAmateur.pointEachCallback.toString()}
            renderErrorMessage={false}
          />
          <Text style={styles.txtFormItem}>point for each call back</Text>
        </View>

        <View style={stylesApp.mt4}>
          {this.state.proAmAmateur.pointsRanking.map((p, i) => (
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
                  this.state.proAmAmateur.pointsRanking[i] = Number(value);
                  this.setState(this.state);
                }}
                value={this.state.proAmAmateur.pointsRanking[i].toString()}
                renderErrorMessage={false}
              />
              <Text style={{...styles.txtFormItem, marginRight: 14}}>points</Text>

              {i === 0 ? (
                <Button
                  type="clear"
                  icon={<Icon type="ionicon" name="md-add-circle" size={18} />}
                  onPress={() => this.onAddValue(this.state.proAmAmateur.pointsRanking)}
                />
              ) : (
                <Button
                  type="clear"
                  icon={<Icon type="ionicon" name="md-remove-circle" size={18} />}
                  onPress={() => this.onRemoveValue(this.state.proAmAmateur.pointsRanking, i)}
                />
              )}
            </View>
          ))}
        </View>
      </>
    );
  }

  renderProAmScholarClosedCore() {
    return (
      <View style={stylesApp.mt4}>
        {this.state.proAmScholarClosed.map((p, i) => (
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
                this.state.proAmScholarClosed[i] = Number(value);
                this.setState(this.state);
              }}
              value={this.state.proAmScholarClosed[i].toString()}
              renderErrorMessage={false}
            />

            {i === 0 ? (
              <Button
                type="clear"
                icon={<Icon type="ionicon" name="md-add-circle" size={18} />}
                onPress={() => this.onAddValue(this.state.proAmScholarClosed)}
              />
            ) : (
              <Button
                type="clear"
                icon={<Icon type="ionicon" name="md-remove-circle" size={18} />}
                onPress={() => this.onRemoveValue(this.state.proAmScholarClosed, i)}
              />
            )}
          </View>
        ))}
      </View>
    );
  }

  renderProAmScholarOpenCore() {
    return (
      <View style={stylesApp.mt4}>
        {this.state.proAmScholarOpen.map((p, i) => (
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
                this.state.proAmScholarOpen[i] = Number(value);
                this.setState(this.state);
              }}
              value={this.state.proAmScholarOpen[i].toString()}
              renderErrorMessage={false}
            />

            {i === 0 ? (
              <Button
                type="clear"
                icon={<Icon type="ionicon" name="md-add-circle" size={18} />}
                onPress={() => this.onAddValue(this.state.proAmScholarOpen)}
              />
            ) : (
              <Button
                type="clear"
                icon={<Icon type="ionicon" name="md-remove-circle" size={18} />}
                onPress={() => this.onRemoveValue(this.state.proAmScholarOpen, i)}
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
    const {selectedOptions} = this.state;

    const index = selectedOptions.indexOf(option);
    if (index < 0) {
      selectedOptions.push(option);
    } else {
      selectedOptions.splice(index, 1);
    }

    this.setState({selectedOptions});
  }

  isOptionSelected(option) {
    return this.state.selectedOptions.indexOf(option) >= 0;
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

    if (this.currentUser && this.currentUser.id) {
      // show loading
      this.loadingHUD.show();

      this.event.prizeOptions = this.state.selectedOptions;
      this.event.user = this.currentUser;

      // create event
      try {
        const result = await ApiService.addEvent(this.event);
        this.event.id = result.id;

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
