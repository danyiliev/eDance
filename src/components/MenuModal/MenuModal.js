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
import Lessons from '../../screens/lessons/Lessons';
import Championships from '../../screens/championships/Championships';
import {UserHelper} from '../../helpers/user-helper';
import FastImage from 'react-native-fast-image';
import {User} from '../../models/user.model';
import {clearProducts} from '../../actions/product';
import {clearEvents} from '../../actions/event';
import SettingMain from '../../screens/settings/setting-main/SettingMain';
import Groups from '../../screens/groups/Groups';

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
      <Modal isVisible={this.props.visible} onBackdropPress={this.props.onDismiss}>
        <View style={styles.viewMain}>
          {/* close */}
          <Button
            type="clear"
            icon={<Icon type="ionicon" name="md-close" size={24} color={colorTheme.primary} />}
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
            {/* my lessons */}
            <TouchableOpacity onPress={() => this.props.onMenuItem(Lessons.NAV_NAME)}>
              <View style={styles.viewMenuItem}>
                {/* icon */}
                <View style={styles.viewMenuIcon}>
                  <ImageScale width={14} source={require('../../../assets/imgs/menu_lesson.png')} />
                </View>

                <Text style={styles.txtMenuItem}>My Lessons</Text>
              </View>
            </TouchableOpacity>
            <Divider style={styles.viewDivider} />

            {/* my groups */}
            {this.currentUser.type === User.TYPE_TEACHER ? (
              <>
                <TouchableOpacity onPress={() => this.props.onMenuItem(Groups.NAV_NAME)}>
                  <View style={styles.viewMenuItem}>
                    {/* icon */}
                    <View style={styles.viewMenuIcon}>
                      <Icon color={colorTheme.darkGrey} type="ionicon" name={'ios-contacts'} size={18} />
                    </View>

                    <Text style={styles.txtMenuItem}>Dance Groups</Text>
                  </View>
                </TouchableOpacity>
                <Divider style={styles.viewDivider} />
              </>
            ) : null}

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

            {/* setting */}
            <View>
              <TouchableOpacity onPress={() => this.props.onMenuItem(SettingMain.NAV_NAME)}>
                <View style={styles.viewMenuItem}>
                  {/* icon */}
                  <View style={styles.viewMenuIcon}>
                    <ImageScale width={16} source={require('../../../assets/imgs/menu_setting.png')} />
                  </View>

                  <Text style={styles.txtMenuItem}>Settings</Text>
                </View>
              </TouchableOpacity>
              <Divider style={styles.viewDivider} />
            </View>

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

      // clear data
      this.props.clearProducts();
      this.props.clearEvents();

      this.props.onDismiss();
    });
  }
}

const mapStateToProps = (state) => state;

const mapDispatchToProps = {
  setUserInfo,
  clearProducts,
  clearEvents,
};

export default connect(mapStateToProps, mapDispatchToProps)(MenuModal);
