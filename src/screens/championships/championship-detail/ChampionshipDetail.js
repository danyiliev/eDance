import React from 'react';
import {Alert, ScrollView, Text, View} from 'react-native';
import {stylesApp} from '../../../styles/app.style';
import {styles as stylesAdd} from '../add-championship/styles';
import {DanceHelper} from '../../../helpers/dance-helper';
import {connect} from 'react-redux';
import {styles} from './styles';
import {Button} from 'react-native-elements';
import PrizeDetail from '../prize-detail/PrizeDetail';
import {LoadingHUD} from 'react-native-hud-hybrid';
import {ApiService} from '../../../services';

class ChampionshipDetail extends React.Component {
  static NAV_NAME = 'championship-detail';

  event = null;
  currentUser = null;

  state = {
    eventSession: null,
  };

  constructor(props) {
    super(props);

    props.navigation.setOptions({
      title: 'Championship Detail',
    });

    // get parameter
    if (props.route.params) {
      this.event = props.route.params.event;
      this.state.eventSession = props.route.params.session;
    }

    this.currentUser = props.UserReducer.user;

    this.loadingHUD = new LoadingHUD();
  }

  async componentDidMount(): void {
    try {
      const eventSession = await ApiService.getEventSessionById(this.event.id, this.state.eventSession.id);

      this.setState({eventSession});
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    return (
      <View style={stylesApp.viewContainer}>
        <ScrollView bounces={false}>
          <View style={stylesAdd.viewContainer}>
            {this.renderNotice()}

            <View style={stylesAdd.viewForm}>
              {/* time */}
              <View style={stylesApp.flexRowCenter}>
                <Text style={stylesAdd.txtFormLabel}>Date & Time: </Text>
                <Text style={stylesAdd.txtFormValue}>{this.state.eventSession?.startAt}</Text>
              </View>

              {this.state.eventSession?.types.map((t, idxKey) => {
                return (
                  <View key={`type${idxKey}`}>
                    <Text style={stylesAdd.txtSessionType}>{t.type}</Text>

                    {t.danceStyles.map((s, idxStyle) => {
                      return (
                        <Text key={`style${idxStyle}`} style={stylesAdd.txtSessionDanceStyle}>
                          {DanceHelper.danceStyleNameByVal(s)}
                        </Text>
                      );
                    })}
                  </View>
                );
              })}
            </View>

            <View style={styles.viewFooter}>
              <Text>{this.state.eventSession.entryCount} Entries</Text>
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
                disabled={this.isApplied()}
                disabledStyle={[stylesApp.butPrimary, stylesApp.semiTrans]}
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

  renderNotice() {
    if (this.isApplied()) {
      return (
        <View style={styles.viewNotice}>
          <Text style={styles.txtNotice}>You already applied to this championship.</Text>
        </View>
      );
    }

    return null;
  }

  onButPrize() {
    // prize & award detail page
    this.props.navigation.push(PrizeDetail.NAV_NAME, {
      event: this.event,
    });
  }

  async onButApply() {
    this.loadingHUD.show();

    try {
      await ApiService.applyEventSession(this.event.id, this.state.eventSession.id);

      const {eventSession} = this.state;
      eventSession.entryCount++;
      eventSession.joinedUsers.push(this.currentUser);

      this.setState({eventSession});
    } catch (e) {
      console.log(e);

      Alert.alert('Failed to Apply Championship', e.message);
    }

    this.loadingHUD.hideAll();
  }

  isApplied() {
    return !!this.state.eventSession.joinedUsers.find((u) => this.currentUser?.equalTo(u));
  }
}

const mapStateToProps = (state) => state;

export default connect(mapStateToProps, null)(ChampionshipDetail);

