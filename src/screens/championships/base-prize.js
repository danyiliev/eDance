import React from 'react';
import {Dimensions, Text, TouchableOpacity, View} from 'react-native';
import {stylesApp} from '../../styles/app.style';
import CheckboxWithShadow from '../../components/CheckboxRound/CheckboxWithShadow';
import {PRIZE_OPTIONS} from '../../constants/dance-data';
import {styles} from './add-prize/styles';
const {width: SCREEN_WIDTH} = Dimensions.get('window');

const spacing = 14;
const padding = 12;
const widthSubItem2 = (SCREEN_WIDTH - padding * 2 - spacing * 2 - padding * 3) / 2;
const widthSubItem3 = (SCREEN_WIDTH - padding * 2 - spacing * 2) / 3;

export default class BasePrize extends React.Component {
  renderTopStudio(selectable = false, selectedSingle = false, selectedMultiple = false) {
    return (
      <>
        {/* top studio wizard */}
        <View style={styles.viewItem}>
          <View style={stylesApp.flexRowCenter}>
            {selectable ? (
              <CheckboxWithShadow
                containerStyle={stylesApp.mr10}
                checked={selectedSingle || selectedMultiple}
              />
            ) : null}

            <Text style={[styles.txtTitle, stylesApp.ml10]}>Top Studio Award</Text>
          </View>

          <View style={styles.viewForm}>
            <Text style={styles.txtFormLabel}>
              To qualify you must have at least one teacher competing Pro/Am. {'\n'}
              There will be three placements. The points will be awarded for Pro/Am and Amateur couples as
              follows:
            </Text>

            {this.renderTopSingleWrapper(selectable, selectedSingle)}
            {this.renderTopMultiWrapper(selectable, selectedMultiple)}

            <Text style={styles.txtFormLabel}>
              * If a placement is in an uncontested division, the point(s) for each entry will be eliminated. All points will then be added together resulting in the placement.
            </Text>
          </View>
        </View>
      </>
    );
  }

  renderTopSingleWrapper(selectable, selected) {
    if (selectable) {
      return (
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={() => this.doSelectOption(PRIZE_OPTIONS.TOP_STUDIO_SINGLE)}>
          {this.renderTopStudioSingle(selectable, selected)}
        </TouchableOpacity>
      );
    } else {
      if (selected) {
        return this.renderTopStudioSingle(selectable, selected);
      }
    }

    return null;
  }

  renderTopMultiWrapper(selectable, selected) {
    if (selectable) {
      return (
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={() => this.doSelectOption(PRIZE_OPTIONS.TOP_STUDIO_MULTI)}>
          {this.renderTopStudioMulti(selectable, selected)}
        </TouchableOpacity>
      );
    } else {
      if (selected) {
        return this.renderTopStudioSingle(selectable, selected);
      }
    }

    return null;
  }

  renderTopStudioSingle(selectable = false, selected = true) {
    return (
      <View style={styles.viewSubItem}>
        {/* Single, two or three dance entries */}
        <View style={stylesApp.flexRowCenter}>
          {selectable ? (
            <CheckboxWithShadow width={20} containerStyle={stylesApp.mr10} checked={selected} />
          ) : null}

          <Text style={styles.txtSubTitle}>
            Single, two or three dance entries:
          </Text>
        </View>

        <View style={styles.viewSubForm}>
          <View style={styles.viewColumns}>
            <Text style={{...styles.txtFormItem, width: widthSubItem2}}>1st place - 8 points</Text>
            <Text style={{...styles.txtFormItem, width: widthSubItem2}}>2nd place - 7 points</Text>
            <Text style={{...styles.txtFormItem, width: widthSubItem2}}>3rd place - 6 points</Text>
            <Text style={{...styles.txtFormItem, width: widthSubItem2}}>4th place - 5 points</Text>
            <Text style={{...styles.txtFormItem, width: widthSubItem2}}>5th place - 4 points</Text>
            <Text style={{...styles.txtFormItem, width: widthSubItem2}}>6th place - 3 points</Text>
            <Text style={{...styles.txtFormItem, width: widthSubItem2}}>7th place - 2 points</Text>
            <Text style={{...styles.txtFormItem, width: widthSubItem2}}>8th place - 1 points</Text>
          </View>
          <Text style={styles.txtFormItem}>1 point for each entry</Text>
          <Text style={styles.txtFormItem}>1 point for each call back</Text>
        </View>
      </View>
    );
  }

  renderTopStudioMulti(selectable = false, selected = true) {
    return (
      <View style={styles.viewSubItem}>
        {/* Multi - 4 or 5 dance entries */}
        <View style={stylesApp.flexRowCenter}>
          {selectable ? (
            <CheckboxWithShadow
              width={20}
              containerStyle={stylesApp.mr10}
              checked={selected}
            />
          ) : null}

          <Text style={styles.txtSubTitle}>
            Multi - 4 or 5 dance entries
          </Text>
        </View>

        <View style={styles.viewSubForm}>
          <View style={styles.viewColumns}>
            <Text style={{...styles.txtFormItem, width: widthSubItem2}}>1st place - 16 points</Text>
            <Text style={{...styles.txtFormItem, width: widthSubItem2}}>2nd place - 14 points</Text>
            <Text style={{...styles.txtFormItem, width: widthSubItem2}}>3rd place - 12 points</Text>
            <Text style={{...styles.txtFormItem, width: widthSubItem2}}>4th place - 10 points</Text>
            <Text style={{...styles.txtFormItem, width: widthSubItem2}}>5th place - 8 points</Text>
            <Text style={{...styles.txtFormItem, width: widthSubItem2}}>6th place - 6 points</Text>
            <Text style={{...styles.txtFormItem, width: widthSubItem2}}>7th place - 4 points</Text>
            <Text style={{...styles.txtFormItem, width: widthSubItem2}}>8th place - 2 points</Text>
          </View>
          <Text style={styles.txtFormItem}>2 point for each entry</Text>
          <Text style={styles.txtFormItem}>2 point for each call back</Text>
        </View>
      </View>
    );
  }

  renderTopTeacher(selectable = false, selected = true) {
    return (
      <View style={styles.viewItem}>
        <View style={stylesApp.flexRowCenter}>
          {selectable ? <CheckboxWithShadow containerStyle={stylesApp.mr10} checked={selected} /> : null}
          <Text style={styles.txtTitle}>Top Teacher money award for Pro/Am</Text>
        </View>

        <View style={styles.viewForm}>
          {/* date picker */}
          {selectable ? (
            <TouchableOpacity onPress={() => this.onSelectDate()}>
              <View style={stylesApp.flexRowCenter}>
                <Text style={[styles.txtFormItem, stylesApp.mr10]}>Due Date:</Text>
                {this.state.dateDue ? (
                  <Text style={styles.txtSubTitle}>{this.state.dateDue}</Text>
                ) : (
                  <Text style={styles.txtPlaceholder}>Select a Date Due</Text>
                )}
              </View>
            </TouchableOpacity>
          ) : null}

          {/* table */}
          <View style={[styles.viewColumns, selectable ? stylesApp.mt12 : {}]}>
            {/* header */}
            <View style={{...styles.viewTableItem, width: widthSubItem3}}>
              <Text style={styles.txtTableHeader}>Level</Text>
            </View>
            <View style={{...styles.viewTableItem, width: widthSubItem3}}>
              <Text style={styles.txtTableHeader}>
                Top Teacher Pro/Am Required Entries
              </Text>
            </View>
            <View style={{...styles.viewTableItem, width: widthSubItem3}}>
              <Text style={styles.txtTableHeader}>
                1st
              </Text>
            </View>

            {/* items */}
            <View style={{...styles.viewTableItem, width: widthSubItem3}}>
              <Text style={styles.txtFormItem}>1 (VIP Pro-Am)</Text>
            </View>
            <View style={{...styles.viewTableItem, width: widthSubItem3}}>
              <Text style={styles.txtFormItem}>430 and up</Text>
            </View>
            <View style={{...styles.viewTableItem, width: widthSubItem3}}>
              <Text style={styles.txtFormItem}>$10,000</Text>
            </View>

            <View style={{...styles.viewTableItem, width: widthSubItem3}}>
              <Text style={styles.txtFormItem}>2</Text>
            </View>
            <View style={{...styles.viewTableItem, width: widthSubItem3}}>
              <Text style={styles.txtFormItem}>286 to 429</Text>
            </View>
            <View style={{...styles.viewTableItem, width: widthSubItem3}}>
              <Text style={styles.txtFormItem}>$5,000</Text>
            </View>

            <View style={{...styles.viewTableItem, width: widthSubItem3}}>
              <Text style={styles.txtFormItem}>3</Text>
            </View>
            <View style={{...styles.viewTableItem, width: widthSubItem3}}>
              <Text style={styles.txtFormItem}>143 to 285</Text>
            </View>
            <View style={{...styles.viewTableItem, width: widthSubItem3}}>
              <Text style={styles.txtFormItem}>$2,500</Text>
            </View>

            <View style={{...styles.viewTableItem, width: widthSubItem3}}>
              <Text style={styles.txtFormItem}>4</Text>
            </View>
            <View style={{...styles.viewTableItem, width: widthSubItem3}}>
              <Text style={styles.txtFormItem}>72 to 142</Text>
            </View>
            <View style={{...styles.viewTableItem, width: widthSubItem3}}>
              <Text style={styles.txtFormItem}>$750</Text>
            </View>

            <View style={{...styles.viewTableItem, width: widthSubItem3}}>
            </View>
            <View style={{...styles.viewTableItem, width: widthSubItem3}}>
              <Text style={{...styles.txtFormItem, textAlign: 'center'}}>TOP STUDIO REQUIRED ENTRIES</Text>
            </View>
            <View style={{...styles.viewTableItem, width: widthSubItem3}}>
            </View>

            <View style={{...styles.viewTableItem, width: widthSubItem3}}>
              <Text style={styles.txtFormItem}>PRO-AM</Text>
            </View>
            <View style={{...styles.viewTableItem, width: widthSubItem3}}>
              <Text style={styles.txtFormItem}>1,000</Text>
            </View>
            <View style={{...styles.viewTableItem, width: widthSubItem3}}>
              <Text style={styles.txtFormItem}>$10,000USD</Text>
            </View>
          </View>

          <Text style={[styles.txtFormLabel, stylesApp.mt8]}>
            To qualify in a "level" you must have the minimum amount of Pro/Am entries for this unisex competition. There are 4 levels for top teacher money, depending on who will place 1st with the most amount of entries, 2nd, 3rd, 4th placements will then be calculated.
          </Text>
        </View>
      </View>
    );
  }

  renderSingleEntries(selectable = false, selected = false) {
    return (
      <View style={styles.viewItem}>
        <View style={stylesApp.flexRowCenter}>
          {selectable ? <CheckboxWithShadow containerStyle={stylesApp.mr10} checked={selected} /> : null}
          <Text style={styles.txtTitle}>Single, two or three dance entries:</Text>
        </View>

        <View style={styles.viewForm}>
          <View style={styles.viewColumns}>
            <Text style={{...styles.txtFormItem, width: widthSubItem2}}>1st place - 8 points</Text>
            <Text style={{...styles.txtFormItem, width: widthSubItem2}}>2nd place - 7 points</Text>
            <Text style={{...styles.txtFormItem, width: widthSubItem2}}>3rd place - 6 points</Text>
            <Text style={{...styles.txtFormItem, width: widthSubItem2}}>4th place - 5 points</Text>
            <Text style={{...styles.txtFormItem, width: widthSubItem2}}>5th place - 4 points</Text>
            <Text style={{...styles.txtFormItem, width: widthSubItem2}}>6th place - 3 points</Text>
            <Text style={{...styles.txtFormItem, width: widthSubItem2}}>7th place - 2 points</Text>
            <Text style={{...styles.txtFormItem, width: widthSubItem2}}>8th place - 1 points</Text>
          </View>
          <Text style={styles.txtFormItem}>1 point for each entry</Text>
          <Text style={styles.txtFormItem}>1 point for each call back</Text>
        </View>
      </View>
    );
  }

  renderMultiEntries(selectable = false, selected = false) {
    return (
      <View style={styles.viewItem}>
        <View style={stylesApp.flexRowCenter}>
          {selectable ? <CheckboxWithShadow containerStyle={stylesApp.mr10} checked={selected} /> : null}
          <Text style={styles.txtTitle}>Multi - 4 or 5 dance entries:</Text>
        </View>

        <View style={styles.viewForm}>
          <View style={styles.viewColumns}>
            <Text style={{...styles.txtFormItem, width: widthSubItem2}}>1st place - 16 points</Text>
            <Text style={{...styles.txtFormItem, width: widthSubItem2}}>2nd place - 14 points</Text>
            <Text style={{...styles.txtFormItem, width: widthSubItem2}}>3rd place - 12 points</Text>
            <Text style={{...styles.txtFormItem, width: widthSubItem2}}>4th place - 10 points</Text>
            <Text style={{...styles.txtFormItem, width: widthSubItem2}}>5th place - 8 points</Text>
            <Text style={{...styles.txtFormItem, width: widthSubItem2}}>6th place - 6 points</Text>
            <Text style={{...styles.txtFormItem, width: widthSubItem2}}>7th place - 4 points</Text>
            <Text style={{...styles.txtFormItem, width: widthSubItem2}}>8th place - 2 points</Text>
          </View>
          <Text style={styles.txtFormItem}>2 point for each entry</Text>
          <Text style={styles.txtFormItem}>2 point for each call back</Text>

          <Text style={[styles.txtFormLabel, stylesApp.mt8]}>
            * If a placement is in an uncontested division, the point(s) for each entry will be eliminated. All points will then be added together resulting in the placement.
          </Text>
        </View>
      </View>
    );
  }

  renderPreTeens(selectable = false, selected = false) {
    return (
      <View style={styles.viewItem}>
        <View style={stylesApp.flexRowCenter}>
          {selectable ? <CheckboxWithShadow containerStyle={stylesApp.mr10} checked={selected} /> : null}
          <Text style={styles.txtTitle}>Pre-teens, Juniors and Young Adults</Text>
        </View>

        <View style={styles.viewForm}>
          <Text style={styles.txtFormLabel}>
            Pro/Am who pay a reduced fee receive 1/2 the points as described above.
          </Text>
        </View>
      </View>
    );
  }

  renderProfessional(selectable = false, selected = false) {
    return (
      <View style={styles.viewItem}>
        <View style={stylesApp.flexRowCenter}>
          {selectable ? <CheckboxWithShadow containerStyle={stylesApp.mr10} checked={selected} /> : null}
          <Text style={styles.txtTitle}>Professional</Text>
        </View>

        <View style={styles.viewForm}>
          <Text style={styles.txtSubTitle}>Phythm & Smooth</Text>
          <View style={styles.viewColumns}>
            <Text style={{...styles.txtFormItem, width: widthSubItem2}}>1st place - $1500</Text>
            <Text style={{...styles.txtFormItem, width: widthSubItem2}}>2nd place - $1000</Text>
            <Text style={{...styles.txtFormItem, width: widthSubItem2}}>3rd place - $750</Text>
            <Text style={{...styles.txtFormItem, width: widthSubItem2}}>4th place - $500</Text>
            <Text style={{...styles.txtFormItem, width: widthSubItem2}}>5th place - $300</Text>
            <Text style={{...styles.txtFormItem, width: widthSubItem2}}>6th place - $150</Text>
          </View>

          <Text style={[styles.txtSubTitle, stylesApp.mt8]}>Latin & Standard</Text>
          <View style={styles.viewColumns}>
            <Text style={{...styles.txtFormItem, width: widthSubItem2}}>1st place - 1500</Text>
            <Text style={{...styles.txtFormItem, width: widthSubItem2}}>2nd place - 1000</Text>
            <Text style={{...styles.txtFormItem, width: widthSubItem2}}>3rd place - 750</Text>
            <Text style={{...styles.txtFormItem, width: widthSubItem2}}>4th place - 500</Text>
            <Text style={{...styles.txtFormItem, width: widthSubItem2}}>5th place - 300</Text>
            <Text style={{...styles.txtFormItem, width: widthSubItem2}}>6th place - 150</Text>
          </View>

          <Text style={[styles.txtFormLabel, stylesApp.mt8]}>
            prize money will be awarded in American Rhythm and Smooth in US Dollars, International Latin and Standard in British Pounds.
          </Text>
        </View>
      </View>
    );
  }

  renderProAmAmateur(selectable = false, selected = false) {
    return (
      <View style={styles.viewItem}>
        <View style={stylesApp.flexRowCenter}>
          {selectable ? <CheckboxWithShadow containerStyle={stylesApp.mr10} checked={selected} /> : null}
          <Text style={styles.txtTitle}>Pro-Am and Amateur Awards</Text>
        </View>

        <View style={styles.viewForm}>
          <Text style={styles.txtFormLabel}>
            Every Pro-Am student and amateur couple, who is doing 1 dance entries, will receive a student participation award.{'\n'}
            Top American and International free style students, male and female, will be presented in all levels. To be eligible for top student awards a student must enter a minimum of 8 free styles in that level, exception: Int'l Pre-Gold. Top student award will be based on the following:
          </Text>

          <View style={styles.viewColumns}>
            <Text style={{...styles.txtFormItem, width: widthSubItem2}}>1st place - 8 points</Text>
            <Text style={{...styles.txtFormItem, width: widthSubItem2}}>2nd place - 7 points</Text>
            <Text style={{...styles.txtFormItem, width: widthSubItem2}}>3rd place - 6 points</Text>
            <Text style={{...styles.txtFormItem, width: widthSubItem2}}>4th place - 5 points</Text>
            <Text style={{...styles.txtFormItem, width: widthSubItem2}}>5th place - 4 points</Text>
            <Text style={{...styles.txtFormItem, width: widthSubItem2}}>6th place - 3 points</Text>
            <Text style={{...styles.txtFormItem, width: widthSubItem2}}>7th place - 2 points</Text>
            <Text style={{...styles.txtFormItem, width: widthSubItem2}}>8th place - 1 points</Text>
          </View>
          <Text style={styles.txtFormItem}>1 point for each entry</Text>
          <Text style={styles.txtFormItem}>1 point for each call back</Text>

          <Text style={styles.txtFormLabel}>
            If a placement is in an uncontested division, the point(s) for each entry will be eliminated. All points will then be added together resulting in the placement.
          </Text>
        </View>
      </View>
    );
  }

  renderSolo(selectable = false, selected = false) {
    return (
      <View style={styles.viewItem}>
        <View style={stylesApp.flexRowCenter}>
          {selectable ? <CheckboxWithShadow containerStyle={stylesApp.mr10} checked={selected} /> : null}
          <Text style={styles.txtTitle}>Solo exhibitions</Text>
        </View>

        <View style={styles.viewForm}>
          <Text style={styles.txtFormLabel}>
            will be presented with a 1st, 2nd and 3rd. They will be given a high score in Bronze M & F, Silver M & F, Gold M & F, and Advanced M & F - Solo Exhibitions only.
          </Text>
        </View>
      </View>
    );
  }

  renderProAmScholarClosed(selectable = false, selected = false) {
    return (
      <View style={styles.viewItem}>
        <View style={stylesApp.flexRowCenter}>
          {selectable ? <CheckboxWithShadow containerStyle={stylesApp.mr10} checked={selected} /> : null}
          <Text style={styles.txtTitle}>
            Pro-Am Scholarship Championships Awards - Closed 3 Dance (Restricted Syllabus)
          </Text>
        </View>

        <View style={styles.viewForm}>
          <View style={styles.viewColumns}>
            <Text style={{...styles.txtFormItem, width: widthSubItem3}}>1st place $150</Text>
            <Text style={{...styles.txtFormItem, width: widthSubItem3}}>2nd place $100</Text>
            <Text style={{...styles.txtFormItem, width: widthSubItem3}}>3rd place $50</Text>
          </View>

          <Text style={[styles.txtFormLabel, stylesApp.mt6]}>
            Equal prize money will be awarded in American Rhythm and Ballroom, International Latin and Standard for each of the 3 age divisions and in Bronze & Silver levels.
          </Text>
        </View>
      </View>
    );
  }

  renderProAmScholarOpen(selectable = false, selected = false) {
    return (
      <View style={styles.viewItem}>
        <View style={stylesApp.flexRowCenter}>
          {selectable ? <CheckboxWithShadow containerStyle={stylesApp.mr10} checked={selected} /> : null}
          <Text style={styles.txtTitle}>
            Pro-Am Scholarship Championships Awards - Open 4 & 5 Dance (No Restricted Syllabus)
          </Text>
        </View>

        <View style={styles.viewForm}>
          <View style={styles.viewColumns}>
            <Text style={{...styles.txtFormItem, width: widthSubItem3}}>1st place $300</Text>
            <Text style={{...styles.txtFormItem, width: widthSubItem3}}>2nd place $150</Text>
            <Text style={{...styles.txtFormItem, width: widthSubItem3}}>3rd place $100</Text>
          </View>

          <Text style={[styles.txtFormLabel, stylesApp.mt6]}>
            Equal prize money will be awarded in American Rhythm and Ballroom, International Latin and Standard for each of the 3 age divisions only.
          </Text>
        </View>
      </View>
    );
  }
}
