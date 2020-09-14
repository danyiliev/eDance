import React from 'react';
import {ScrollView, Text, View} from 'react-native';
import {stylesApp} from '../../../styles/app.style';
import {styles as stylesAdd} from '../add-championship/styles';
import {DanceHelper} from '../../../helpers/dance-helper';
import {connect} from 'react-redux';
import {styles} from './styles';
import {Button} from 'react-native-elements';
import PrizeDetail from '../prize-detail/PrizeDetail';

class ChampionshipDetail extends React.Component {
  static NAV_NAME = 'championship-detail';

  event = null;
  eventSession = null;

  constructor(props) {
    super(props);

    props.navigation.setOptions({
      title: 'Championship Detail',
    });

    // get parameter
    if (props.route.params) {
      this.event = props.route.params.event;
      this.eventSession = props.route.params.session;
    }
  }

  render() {
    return (
      <View style={stylesApp.viewContainer}>
        <ScrollView bounces={false}>
          <View style={stylesAdd.viewContainer}>
            <View style={stylesAdd.viewForm}>
              {/* time */}
              <View style={stylesApp.flexRowCenter}>
                <Text style={stylesAdd.txtFormLabel}>Date & Time: </Text>
                <Text style={stylesAdd.txtFormValue}>{this.eventSession?.startAt}</Text>
              </View>

              {this.eventSession.types.map((t, i) => {
                return (
                  <View>
                    <Text style={stylesAdd.txtSessionType}>{t.type}</Text>

                    {t.danceStyles.map((s, i) => {
                      return (
                        <Text style={stylesAdd.txtSessionDanceStyle}>{DanceHelper.danceStyleNameByVal(s)}</Text>
                      );
                    })}
                  </View>
                );
              })}
            </View>

            <View style={styles.viewFooter}>
              <Text>0 Entries</Text>
            </View>

            <View style={styles.viewActions}>
              <Button
                title="Prize & Awards"
                type="clear"
                containerStyle={[styles.ctnButAction, stylesApp.mr10]}
                buttonStyle={stylesApp.butLightOutline}
                titleStyle={stylesApp.titleButLight}
                onPress={() => this.onButPrize()}
              />
              <Button
                title="Apply"
                containerStyle={[styles.ctnButAction, stylesApp.ml10]}
                buttonStyle={stylesApp.butPrimary}
                titleStyle={stylesApp.titleButPrimary}
                onPress={() => this.onButApply()}
              />
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }

  onButPrize() {
    // prize & award detail page
    this.props.navigation.push(PrizeDetail.NAV_NAME, {
      event: this.event,
    });
  }

  onButApply() {
  }
}

const mapStateToProps = (state) => state;

export default connect(mapStateToProps, null)(ChampionshipDetail);

