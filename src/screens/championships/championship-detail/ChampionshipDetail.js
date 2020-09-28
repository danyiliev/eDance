import React from 'react';
import {Alert, ScrollView, Text, View} from 'react-native';
import {stylesApp} from '../../../styles/app.style';
import {styles as stylesAdd} from '../tentative-schedule/styles';
import {DanceHelper} from '../../../helpers/dance-helper';
import {connect} from 'react-redux';
import {styles} from './styles';
import {Button} from 'react-native-elements';
import PrizeDetail from '../prize-detail/PrizeDetail';
import {LoadingHUD} from 'react-native-hud-hybrid';
import {ApiService} from '../../../services';
import ApplyChampionship from '../apply-championship/ApplyChampionship';
import {styles as stylesSetting} from '../../settings/setting-profile/styles';
import FastImage from 'react-native-fast-image';
import {UserHelper} from '../../../helpers/user-helper';

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

            <View style={stylesSetting.viewForm}>
              {/* title */}
              <View style={stylesApp.flexRowCenter}>
                <Text style={styles.txtLabel}>Event Title:</Text>
                <Text style={styles.txtItem}>{this.event?.title}</Text>
              </View>

              {/* user */}
              <View style={stylesApp.flexRowCenter}>
                <Text style={styles.txtLabel}>User:</Text>

                <View style={stylesApp.flexRowCenter}>
                  <FastImage
                    style={styles.imgUser}
                    source={UserHelper.getUserImage(this.event?.user)}
                    resizeMode={FastImage.resizeMode.cover}
                  />
                  <Text style={[stylesApp.ml10]}>{this.event?.user?.getFullName()}</Text>
                </View>
              </View>

              {/* address */}
              <View style={stylesApp.flexRowCenter}>
                <Text style={styles.txtLabel}>Company Address:</Text>
                <Text style={styles.txtItem}>{this.event?.companyAddress}</Text>
              </View>

              {/* phone */}
              <View style={stylesApp.flexRowCenter}>
                <Text style={styles.txtLabel}>Phone:</Text>
                <Text style={styles.txtItem}>{this.event?.phone}</Text>
              </View>

              {/* email */}
              <View style={stylesApp.flexRowCenter}>
                <Text style={styles.txtLabel}>Email:</Text>
                <Text style={styles.txtItem}>{this.event?.email}</Text>
              </View>
            </View>

            <View style={[stylesAdd.viewForm, stylesApp.mt14]}>
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
    // go to apply page
    this.props.navigation.push(ApplyChampionship.NAV_NAME, {
      event: this.event,
      session: this.state.eventSession,
    });
  }

  isApplied() {
    for (const entry of this.state.eventSession.entries) {
      if (entry.user === this.currentUser?.id) {
        return true;
      }
    }

    return false;
  }
}

const mapStateToProps = (state) => state;

export default connect(mapStateToProps, null)(ChampionshipDetail);

