import React from 'react';
import {styles} from './styles';
import {Text, TouchableOpacity, View} from 'react-native';
import {Button, Rating} from 'react-native-elements';
import {stylesApp, styleUtil} from '../../styles/app.style';
import FastImage from 'react-native-fast-image';
import {colors as colorTheme} from '../../styles/theme.style';
import PropTypes from 'prop-types';
import {UserHelper} from '../../helpers/user-helper';
import {User} from '../../models/user.model';
import {connect} from 'react-redux';

class TeacherCard extends React.Component {
  static propTypes = {
    user: PropTypes.object,
    onUser: PropTypes.func,
    onReview: PropTypes.func,
    onSchedule: PropTypes.func,
  };

  currentUser = null;

  constructor(props) {
    super(props);

    this.currentUser = props.UserReducer.user;
  }

  render() {
    const {user} = this.props;

    return (
      <View style={[styleUtil.withShadow(14, 0.6), styles.viewContainer]}>
        {/* photo */}
        <TouchableOpacity activeOpacity={0.8} onPress={this.props.onUser}>
          <FastImage
            style={styles.imgUser}
            source={UserHelper.getUserImage(user)}
            resizeMode={FastImage.resizeMode.cover}
          />
        </TouchableOpacity>

        {/* name */}
        <Text style={styles.txtName}>{user.getFullName()}</Text>

        {user.type === User.TYPE_TEACHER && !user.equalTo(this.currentUser) ? (
          <View>
            {/* star rating */}
            <Rating
              imageSize={24}
              readonly
              startingValue={user.rate}
              style={styles.rating}
              tintColor={colorTheme.primary}
            />

            {/* buttons */}
            <View style={styles.viewButtons}>
              {/* reviews */}
              <Button
                title="REVIEWS"
                containerStyle={[stylesApp.flex1, stylesApp.mr10]}
                buttonStyle={styles.butLightOutline}
                titleStyle={styles.titleButton}
                onPress={this.props.onReview}
              />

              {/* schedule */}
              <Button
                title="SCHEDULE"
                containerStyle={[stylesApp.flex1, stylesApp.ml10]}
                buttonStyle={styles.butLightOutline}
                titleStyle={styles.titleButton}
                onPress={this.props.onSchedule}
              />
            </View>
          </View>
        ) : null}
      </View>
    );
  }
}

const mapStateToProps = (state) => state;

export default connect(mapStateToProps, null)(TeacherCard);
