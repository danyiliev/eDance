import BasePrize from '../base-prize';
import {stylesApp} from '../../../styles/app.style';
import {Dimensions, ScrollView, Text, View} from 'react-native';
import React from 'react';
import {styles} from '../add-prize/styles';
import {PRIZE_OPTIONS} from '../../../constants/dance-data';
import {UiHelper} from '../../../helpers/ui-helper';

const {width: SCREEN_WIDTH} = Dimensions.get('window');

const spacing = 14;
const padding = 12;
const widthSubItem2 = (SCREEN_WIDTH - padding * 2 - spacing * 2 - padding * 3) / 2;
const widthSubItem3 = (SCREEN_WIDTH - padding * 2 - spacing * 2) / 3;

export default class PrizeDetail extends BasePrize {
  static NAV_NAME = 'prize-detail';

  event = null;

  constructor(props) {
    super(props);

    props.navigation.setOptions({
      title: 'Cash Prizes & Awards',
    });

    // get parameter
    if (props.route.params) {
      this.event = props.route.params.event;
    }
  }

  render() {
    return (
      <View style={stylesApp.viewContainer}>
        {this.renderPrizeOptions()}
      </View>
    );
  }

  renderPrizeOptions() {
    if (Object.keys(this.event?.prizeOptions).length === 0) {
      return (
        <View style={stylesApp.viewLoading}>
          <Text style={stylesApp.txtEmptyItem}>No prize options selected for this championship</Text>
        </View>
      );
    }

    return (
      <ScrollView>
        <View style={styles.viewContainer}>
          {this.isOptionSelected(PRIZE_OPTIONS.TOP_STUDIO_SINGLE) ||
          this.isOptionSelected(PRIZE_OPTIONS.TOP_STUDIO_MULTI)
            ? this.renderTopStudio(
                this.isOptionSelected(PRIZE_OPTIONS.TOP_STUDIO_SINGLE),
                this.isOptionSelected(PRIZE_OPTIONS.TOP_STUDIO_MULTI),
              )
            : null}

          {/* top teacher money */}
          {this.isOptionSelected(PRIZE_OPTIONS.TOP_TEACHER_PROAM)
            ? this.renderTopTeacher(false, true)
            : null}

          {/* Single, two or three dance entries */}
          {this.isOptionSelected(PRIZE_OPTIONS.SINGLE_ENTRIES)
            ? this.renderSingleEntries(false, true)
            : null}

          {/* Multi - 4 or 5 dance entries */}
          {this.isOptionSelected(PRIZE_OPTIONS.MULTI_ENTRIES)
            ? this.renderMultiEntries(false, true)
            : null}

          {/* Pre-teens, Juniors and Young Adults */}
          {this.isOptionSelected(PRIZE_OPTIONS.PRE_TEEN)
            ? this.renderPreTeens(false, true)
            : null}

          {/* Professional */}
          {this.isOptionSelected(PRIZE_OPTIONS.PROFESSIONAL)
            ? this.renderProfessional(false, true)
            : null}

          {/* Pro-Am and Amateur Awards */}
          {this.isOptionSelected(PRIZE_OPTIONS.PROAM_AMATEUR)
            ? this.renderProAmAmateur(false, true)
            : null}

          {/* Solo exhibitions */}
          {this.isOptionSelected(PRIZE_OPTIONS.SOLO)
            ? this.renderSolo(false, true)
            : null}

          {/* Pro-Am Scholarship Championships Awards - Closed 3 Dance (Restricted Syllabus) */}
          {this.isOptionSelected(PRIZE_OPTIONS.PROAM_SCHOLAR_CLOSED)
            ? this.renderProAmScholarClosed(false, true)
            : null}

          {/* Pro-Am Scholarship Championships Awards - Open 4 & 5 Dance (No Restricted Syllabus) */}
          {this.isOptionSelected(PRIZE_OPTIONS.PROAM_SCHOLAR_OPEN)
            ? this.renderProAmScholarOpen(false, true)
            : null}
        </View>
      </ScrollView>
    );
  }

  renderTopStudio(selectedSingle = false, selectedMultiple = false) {
    if (selectedSingle || selectedMultiple) {
      return super.renderTopStudio(false, selectedSingle, selectedMultiple);
    }

    return null;
  }

  renderTopStudioSingleCore() {
    const data = this.event.prizeOptions[PRIZE_OPTIONS.TOP_STUDIO_SINGLE];

    return (
      <View style={styles.viewSubForm}>
        <View style={styles.viewColumns}>
          {data.pointsRanking.map((point, i) => (
            <Text key={`topStudioSingle-${i}`} style={{...styles.txtFormItem, width: widthSubItem2}}>
              {UiHelper.numberToSequence(i + 1)} place - {point} points
            </Text>
          ))}
        </View>
        <Text style={styles.txtFormItem}>{data.pointEachEntry} point for each entry</Text>
        <Text style={styles.txtFormItem}>{data.pointEachCallback} point for each call back</Text>
      </View>
    );
  }

  renderTopStudioMultiCore() {
    const data = this.event.prizeOptions[PRIZE_OPTIONS.TOP_STUDIO_MULTI];

    return (
      <View style={styles.viewSubForm}>
        <View style={styles.viewColumns}>
          {data.pointsRanking.map((point, i) => (
            <Text key={`topStudioMulti-${i}`} style={{...styles.txtFormItem, width: widthSubItem2}}>
              {UiHelper.numberToSequence(i + 1)} place - {point} points
            </Text>
          ))}
        </View>
        <Text style={styles.txtFormItem}>{data.pointEachEntry} point for each entry</Text>
        <Text style={styles.txtFormItem}>{data.pointEachCallback} point for each call back</Text>
      </View>
    );
  }

  renderTopTeacherCore() {
    const data = this.event.prizeOptions[PRIZE_OPTIONS.TOP_TEACHER_PROAM];

    return (
      <>
        <View style={styles.viewRow}>
          {/* header */}
          <View style={styles.viewRowItem}>
            <Text style={styles.txtTableHeader}>Level</Text>
          </View>
          <View style={styles.viewRowItem}>
            <Text style={styles.txtTableHeader}>Top Teacher Pro/Am Required Entries</Text>
          </View>
          <View style={styles.viewRowItem}>
            <Text style={styles.txtTableHeader}>1st</Text>
          </View>
        </View>

        {/* items */}
        {data.levels.map((level, i) => (
          <View style={styles.viewRow} key={`topTeacherProAm-${i}`}>
            <View style={{...styles.viewRowItem, flex: 1}}>
              <Text style={styles.txtFormItem}>{i + 1}</Text>
            </View>
            <View style={{...styles.viewRowItem, flex: 1}}>
              <Text style={styles.txtFormItem}>
                {level.from} to {i === 0 ? `up` : `${level.to}`}
              </Text>
            </View>
            <View style={{...styles.viewRowItem, flex: 1}}>
              <Text style={styles.txtFormItem}>${level.award}</Text>
            </View>
          </View>
        ))}
      </>
    );
  }

  renderSingleEntriesCore() {
    const data = this.event.prizeOptions[PRIZE_OPTIONS.SINGLE_ENTRIES];

    return (
      <View style={styles.viewForm}>
        <View style={styles.viewColumns}>
          {data.pointsRanking.map((point, i) => (
            <Text key={`singleEntry-${i}`} style={{...styles.txtFormItem, width: widthSubItem2}}>
              {UiHelper.numberToSequence(i + 1)} place - {point} points
            </Text>
          ))}
        </View>
        <Text style={styles.txtFormItem}>{data.pointEachEntry} point for each entry</Text>
        <Text style={styles.txtFormItem}>{data.pointEachCallback} point for each call back</Text>
      </View>
    );
  }

  renderMultiEntriesCore() {
    const data = this.event.prizeOptions[PRIZE_OPTIONS.MULTI_ENTRIES];

    return (
      <View style={styles.viewForm}>
        <View style={styles.viewColumns}>
          {data.pointsRanking.map((point, i) => (
            <Text key={`multiEntry-${i}`} style={{...styles.txtFormItem, width: widthSubItem2}}>
              {UiHelper.numberToSequence(i + 1)} place - {point} points
            </Text>
          ))}
        </View>
        <Text style={styles.txtFormItem}>{data.pointEachEntry} point for each entry</Text>
        <Text style={styles.txtFormItem}>{data.pointEachCallback} point for each call back</Text>

        <Text style={[styles.txtFormLabel, stylesApp.mt8]}>
          * If a placement is in an uncontested division, the point(s) for each entry will be eliminated. All points will then be added together resulting in the placement.
        </Text>
      </View>
    );
  }

  renderProfessionalCore() {
    const data = this.event.prizeOptions[PRIZE_OPTIONS.PROFESSIONAL];

    return (
      <>
        <Text style={styles.txtSubTitle}>Rhythm & Smooth</Text>
        <View style={styles.viewColumns}>
          {data.rhythm.map((value, i) => (
            <Text key={`professional-rhythm-${i}`} style={{...styles.txtFormItem, width: widthSubItem2}}>
              {UiHelper.numberToSequence(i + 1)} place - ${value}
            </Text>
          ))}
        </View>

        <Text style={[styles.txtSubTitle, stylesApp.mt8]}>Latin & Standard</Text>
        <View style={styles.viewColumns}>
          {data.latin.map((value, i) => (
            <Text key={`professional-latin-${i}`} style={{...styles.txtFormItem, width: widthSubItem2}}>
              {UiHelper.numberToSequence(i + 1)} place - ${value}
            </Text>
          ))}
        </View>
      </>
    );
  }

  renderProAmAmateurCore() {
    const data = this.event.prizeOptions[PRIZE_OPTIONS.PROAM_AMATEUR];

    return (
      <>
        <View style={styles.viewColumns}>
          {data.pointsRanking.map((point, i) => (
            <Text key={`ProAmAmateur-${i}`} style={{...styles.txtFormItem, width: widthSubItem2}}>
              {UiHelper.numberToSequence(i + 1)} place - {point} points
            </Text>
          ))}
        </View>
        <Text style={styles.txtFormItem}>{data.pointEachEntry} point for each entry</Text>
        <Text style={styles.txtFormItem}>{data.pointEachCallback} point for each call back</Text>
      </>
    );
  }

  renderProAmScholarClosedCore() {
    const data = this.event.prizeOptions[PRIZE_OPTIONS.PROAM_SCHOLAR_CLOSED];

    return (
      <View style={styles.viewColumns}>
        {data.map((value, i) => (
          <Text key={`ProAmScholarClosed-${i}`} style={{...styles.txtFormItem, width: widthSubItem3}}>
            {UiHelper.numberToSequence(i + 1)} place - ${value}
          </Text>
        ))}
      </View>
    );
  }

  renderProAmScholarOpenCore() {
    const data = this.event.prizeOptions[PRIZE_OPTIONS.PROAM_SCHOLAR_OPEN];

    return (
      <View style={styles.viewColumns}>
        {data.map((value, i) => (
          <Text key={`ProAmScholarOpen-${i}`} style={{...styles.txtFormItem, width: widthSubItem3}}>
            {UiHelper.numberToSequence(i + 1)} place - ${value}
          </Text>
        ))}
      </View>
    );
  }

  isOptionSelected(option) {
    return option in this.event?.prizeOptions;
  }
}
