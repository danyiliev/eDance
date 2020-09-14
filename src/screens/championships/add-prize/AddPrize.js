import React from 'react';
import {Button} from 'react-native-elements';
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

class AddPrize extends BasePrize {
  static NAV_NAME = 'add-prize';

  state = {
    // ui
    showTimePicker: false,

    selectedOptions: [],
    dateDue: '',
  };

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
  }

  render() {
    return (
      <View style={stylesApp.viewContainer}>
        <ScrollView>
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
        </ScrollView>
      </View>
    );
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

    // show loading
    this.loadingHUD.show();

    this.event.prizeOptions = this.state.selectedOptions;
    this.event.user = this.currentUser;

    // create lesson
    try {
      // const result = await ApiService.addLesson(this.lesson);
      // this.event.id = result.id;

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
  }
}

const mapStateToProps = (state) => state;
const mapDispatchToProps = {
  setEvents,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddPrize);
