import React from 'react';
import Modal from 'react-native-modal';
import {styles} from './styles';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {colors as colorTheme} from '../../styles/theme.style';
import ImageScale from 'react-native-scalable-image';
import {Button, Divider, Icon} from 'react-native-elements';
import PropTypes from 'prop-types';
import {setUserInfo} from '../../actions/user';
import {connect} from 'react-redux';
import Home from '../../screens/home/Home';
import ScheduleSelect from '../../screens/schedule/ScheduleSelect';
import Messaging from '../../screens/messaging/Messaging';
import SettingProfile from '../../screens/settings/setting-profile/SettingProfile';
import Championships from '../../screens/championships/Championships';
import {UserHelper} from '../../helpers/user-helper';
import FastImage from 'react-native-fast-image';
import {User} from '../../models/user.model';

class MenuModal extends React.Component {
  static propTypes = {
    visible: PropTypes.bool,
    onMenuItem: PropTypes.func,
  };

  currentUser = null;

  constructor(props) {
    super(props);

    this.currentUser = props.UserReducer.user;
  }

  render() {
    return (
      <Modal
        isVisible={this.props.visible}
        onBackdropPress={this.props.onDismiss}>
        <View style={styles.viewMain}>
          {/* close */}
          <Button
            type="clear"
            icon={
              <Icon
                type="ionicon"
                name="md-close"
                size={24}
                color={colorTheme.primary}
              />
            }
            containerStyle={styles.ctnButClose}
            onPress={this.props.onDismiss}
          />

          {/* photo */}
          <View style={styles.viewPhoto}>
            <FastImage
              style={styles.imgPhoto}
              source={UserHelper.getUserImage(this.props.UserReducer.user)}
            />
          </View>

          {/* name */}
          <View style={styles.viewName}>
            <Text style={styles.txtName}>{this.currentUser.getFullName()}</Text>
          </View>

          {/* menu */}
          <View style={styles.viewMenu}>
            {/* schedule */}
            <TouchableOpacity
              onPress={() => this.props.onMenuItem(ScheduleSelect.NAV_NAME)}>
              <View style={styles.viewMenuItem}>
                {/* icon */}
                <View style={styles.viewMenuIcon}>
                  <ImageScale
                    width={14}
                    source={require('../../../assets/imgs/menu_schedule.png')}
                  />
                </View>

                <Text style={styles.txtMenuItem}>Shedule</Text>
              </View>
            </TouchableOpacity>
            <Divider style={styles.viewDivider} />

            {/* setting */}
            {this.currentUser.type === User.TYPE_TEACHER ? (
              <View>
                <TouchableOpacity
                  onPress={() =>
                    this.props.onMenuItem(SettingProfile.NAV_NAME)
                  }>
                  <View style={styles.viewMenuItem}>
                    {/* icon */}
                    <View style={styles.viewMenuIcon}>
                      <ImageScale
                        width={16}
                        source={require('../../../assets/imgs/menu_setting.png')}
                      />
                    </View>

                    <Text style={styles.txtMenuItem}>Settings</Text>
                  </View>
                </TouchableOpacity>
                <Divider style={styles.viewDivider} />
              </View>
            ) : null}

            {/* championship */}
            <TouchableOpacity
              onPress={() => this.props.onMenuItem(Championships.NAV_NAME)}>
              <View style={styles.viewMenuItem}>
                {/* icon */}
                <View style={styles.viewMenuIcon}>
                  <ImageScale
                    width={15}
                    source={require('../../../assets/imgs/menu_champion.png')}
                  />
                </View>

                <Text style={styles.txtMenuItem}>World ChampionShips</Text>
              </View>
            </TouchableOpacity>
            <Divider style={styles.viewDivider} />

            {/* logout */}
            <TouchableOpacity onPress={() => this.onLogout()}>
              <View style={styles.viewMenuItem}>
                {/* icon */}
                <View style={styles.viewMenuIcon}>
                  <ImageScale
                    width={12}
                    source={require('../../../assets/imgs/menu_logout.png')}
                  />
                </View>

                <Text style={styles.txtMenuItem}>Logout</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  }

  onLogout() {
    UserHelper.getInstance().onLogout(() => {
      this.props.setUserInfo(null);
      this.props.onDismiss();
    });
  }
}

const mapStateToProps = (state) => state;

const mapDispatchToProps = {
  setUserInfo,
};

export default connect(mapStateToProps, mapDispatchToProps)(MenuModal);
