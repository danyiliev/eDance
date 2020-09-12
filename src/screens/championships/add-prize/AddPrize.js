import React from 'react';
import {Button} from 'react-native-elements';
import {stylesApp} from '../../../styles/app.style';
import {Dimensions, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {styles} from './styles';
import CheckboxWithShadow from '../../../components/CheckboxRound/CheckboxWithShadow';
import {PRIZE_OPTIONS} from '../../../constants/dance-data';
const {width: SCREEN_WIDTH} = Dimensions.get('window');

export default class AddPrize extends React.Component {
  static NAV_NAME = 'add-prize';

  state = {
    selectedOptions: [],
  };

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
  }

  render() {
    const spacing = 14;
    const padding = 12;
    const widthSubItem2 = (SCREEN_WIDTH - padding * 2 - spacing * 2 - padding * 3) / 2;
    const widthSubItem3 = (SCREEN_WIDTH - padding * 2 - spacing * 2) / 3;

    return (
      <View style={stylesApp.viewContainer}>
        <ScrollView>
          <View style={styles.viewContainer}>
            {/* top studio wizard */}
            <View style={styles.viewItem}>
              <View style={stylesApp.flexRowCenter}>
                <CheckboxWithShadow
                  checked={
                    this.isOptionSelected(PRIZE_OPTIONS.TOP_STUDIO_SINGLE) ||
                    this.isOptionSelected(PRIZE_OPTIONS.TOP_STUDIO_MULTI)
                  }
                />
                <Text style={[styles.txtTitle, stylesApp.ml10]}>Top Studio Award</Text>
              </View>

              <View style={styles.viewForm}>
                <Text style={styles.txtFormLabel}>
                  To qualify you must have at least one teacher competing Pro/Am. {'\n'}
                  There will be three placements. The points will be awarded for Pro/Am and Amateur couples as
                  follows:
                </Text>

                <TouchableOpacity
                  activeOpacity={0.6}
                  onPress={() => this.doSelectOption(PRIZE_OPTIONS.TOP_STUDIO_SINGLE)}>
                  <View style={styles.viewSubItem}>
                    {/* Single, two or three dance entries */}
                    <View style={stylesApp.flexRowCenter}>
                      <CheckboxWithShadow
                        width={20}
                        checked={this.isOptionSelected(PRIZE_OPTIONS.TOP_STUDIO_SINGLE)}
                      />
                      <Text style={[styles.txtSubTitle, stylesApp.ml10]}>
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
                </TouchableOpacity>

                <TouchableOpacity
                  activeOpacity={0.6}
                  onPress={() => this.doSelectOption(PRIZE_OPTIONS.TOP_STUDIO_MULTI)}>
                  <View style={styles.viewSubItem}>
                    {/* Multi - 4 or 5 dance entries */}
                    <View style={stylesApp.flexRowCenter}>
                      <CheckboxWithShadow
                        width={20}
                        checked={this.isOptionSelected(PRIZE_OPTIONS.TOP_STUDIO_MULTI)}
                      />
                      <Text style={[styles.txtSubTitle, stylesApp.ml10]}>
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
                </TouchableOpacity>

                <Text style={styles.txtFormLabel}>
                  * If a placement is in an uncontested division, the point(s) for each entry will be eliminated. All points will then be added together resulting in the placement.
                </Text>
              </View>
            </View>

            {/* top teacher money */}
            <TouchableOpacity
              activeOpacity={0.6}
              onPress={() => this.doSelectOption(PRIZE_OPTIONS.TOP_TEACHER_PROAM)}>
              <View style={styles.viewItem}>
                <View style={stylesApp.flexRowCenter}>
                  <CheckboxWithShadow checked={this.isOptionSelected(PRIZE_OPTIONS.TOP_TEACHER_PROAM)} />
                  <Text style={[styles.txtTitle, stylesApp.ml10]}>Top Teacher money award for Pro/Am</Text>
                </View>

                <View style={styles.viewForm}>
                  {/* date picker */}

                  {/* table */}
                  <View style={styles.viewColumns}>
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
            </TouchableOpacity>

            {/* Single, two or three dance entries */}
            <TouchableOpacity
              activeOpacity={0.6}
              onPress={() => this.doSelectOption(PRIZE_OPTIONS.SINGLE_ENTRIES)}>
              <View style={styles.viewItem}>
                <View style={stylesApp.flexRowCenter}>
                  <CheckboxWithShadow checked={this.isOptionSelected(PRIZE_OPTIONS.SINGLE_ENTRIES)} />
                  <Text style={[styles.txtTitle, stylesApp.ml10]}>Single, two or three dance entries:</Text>
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
            </TouchableOpacity>

            {/* Multi - 4 or 5 dance entries */}
            <TouchableOpacity
              activeOpacity={0.6}
              onPress={() => this.doSelectOption(PRIZE_OPTIONS.MULTI_ENTRIES)}>
              <View style={styles.viewItem}>
                <View style={stylesApp.flexRowCenter}>
                  <CheckboxWithShadow checked={this.isOptionSelected(PRIZE_OPTIONS.MULTI_ENTRIES)} />
                  <Text style={[styles.txtTitle, stylesApp.ml10]}>Multi - 4 or 5 dance entries:</Text>
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
            </TouchableOpacity>

            {/* Pre-teens, Juniors and Young Adults */}
            <TouchableOpacity
              activeOpacity={0.6}
              onPress={() => this.doSelectOption(PRIZE_OPTIONS.PRE_TEEN)}>
              <View style={styles.viewItem}>
                <View style={stylesApp.flexRowCenter}>
                  <CheckboxWithShadow checked={this.isOptionSelected(PRIZE_OPTIONS.PRE_TEEN)} />
                  <Text style={[styles.txtTitle, stylesApp.ml10]}>Pre-teens, Juniors and Young Adults</Text>
                </View>

                <View style={styles.viewForm}>
                  <Text style={styles.txtFormLabel}>
                    Pro/Am who pay a reduced fee receive 1/2 the points as described above.
                  </Text>
                </View>
              </View>
            </TouchableOpacity>

            {/* Professional */}
            <TouchableOpacity
              activeOpacity={0.6}
              onPress={() => this.doSelectOption(PRIZE_OPTIONS.PROFESSIONAL)}>
              <View style={styles.viewItem}>
                <View style={stylesApp.flexRowCenter}>
                  <CheckboxWithShadow checked={this.isOptionSelected(PRIZE_OPTIONS.PROFESSIONAL)} />
                  <Text style={[styles.txtTitle, stylesApp.ml10]}>Professional</Text>
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
            </TouchableOpacity>

            {/* Pro-Am and Amateur Awards */}
            <TouchableOpacity
              activeOpacity={0.6}
              onPress={() => this.doSelectOption(PRIZE_OPTIONS.PROAM_AMATEUR)}>
              <View style={styles.viewItem}>
                <View style={stylesApp.flexRowCenter}>
                  <CheckboxWithShadow checked={this.isOptionSelected(PRIZE_OPTIONS.PROAM_AMATEUR)} />
                  <Text style={[styles.txtTitle, stylesApp.ml10]}>Pro-Am and Amateur Awards</Text>
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
            </TouchableOpacity>

            {/* Solo exhibitions */}
            <TouchableOpacity
              activeOpacity={0.6}
              onPress={() => this.doSelectOption(PRIZE_OPTIONS.SOLO)}>
              <View style={styles.viewItem}>
                <View style={stylesApp.flexRowCenter}>
                  <CheckboxWithShadow checked={this.isOptionSelected(PRIZE_OPTIONS.SOLO)} />
                  <Text style={[styles.txtTitle, stylesApp.ml10]}>Solo exhibitions</Text>
                </View>

                <View style={styles.viewForm}>
                  <Text style={styles.txtFormLabel}>
                    will be presented with a 1st, 2nd and 3rd. They will be given a high score in Bronze M & F, Silver M & F, Gold M & F, and Advanced M & F - Solo Exhibitions only.
                  </Text>
                </View>
              </View>
            </TouchableOpacity>

            {/* Pro-Am Scholarship Championships Awards - Closed 3 Dance (Restricted Syllabus) */}
            <TouchableOpacity
              activeOpacity={0.6}
              onPress={() => this.doSelectOption(PRIZE_OPTIONS.PROAM_SCHOLAR_CLOSED)}>
              <View style={styles.viewItem}>
                <View style={stylesApp.flexRowCenter}>
                  <CheckboxWithShadow checked={this.isOptionSelected(PRIZE_OPTIONS.PROAM_SCHOLAR_CLOSED)} />
                  <Text style={[styles.txtTitle, stylesApp.ml10]}>
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
            </TouchableOpacity>

            {/* Pro-Am Scholarship Championships Awards - Open 4 & 5 Dance (No Restricted Syllabus) */}
            <TouchableOpacity
              activeOpacity={0.6}
              onPress={() => this.doSelectOption(PRIZE_OPTIONS.PROAM_SCHOLAR_OPEN)}>
              <View style={styles.viewItem}>
                <View style={stylesApp.flexRowCenter}>
                  <CheckboxWithShadow checked={this.isOptionSelected(PRIZE_OPTIONS.PROAM_SCHOLAR_OPEN)} />
                  <Text style={[styles.txtTitle, stylesApp.ml10]}>
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
            </TouchableOpacity>
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

  onButSave() {
  }
}
