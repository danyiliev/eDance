import BasePrize from '../base-prize';
import {stylesApp} from '../../../styles/app.style';
import {ScrollView, Text, View} from 'react-native';
import React from 'react';
import {styles} from '../add-prize/styles';
import {PRIZE_OPTIONS} from '../../../constants/dance-data';

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
    if (this.event?.prizeOptions.length <= 0) {
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
                false,
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

  isOptionSelected(option) {
    return this.event?.prizeOptions.indexOf(option) >= 0;
  }
}
