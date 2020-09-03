import React from 'react';
import PropTypes from 'prop-types';
import {styles as stylesLike} from '../../screens/tabs/likes/styles';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {styles} from './styles';
import {stylesApp, styleUtil} from '../../styles/app.style';
import {Button, Icon} from 'react-native-elements';
import {colors as colorTheme} from '../../styles/theme.style';
import {DanceHelper} from '../../helpers/dance-helper';
import {connect} from 'react-redux';

class LessonItem extends React.Component {
  static propTypes = {
    lesson: PropTypes.object,
    index: PropTypes.number,
    onTeacher: PropTypes.func,
    onPurchase: PropTypes.func,
    onLike: PropTypes.func,
    onPress: PropTypes.func,
  };

  currentUser = null;

  constructor(props) {
    super(props);

    this.currentUser = props.UserReducer.user;
  }

  render() {
    const {lesson} = this.props;

    return (
      <TouchableOpacity activeOpacity={0.8} onPress={this.props.onPress}>
        <View style={stylesLike.viewItem}>
          <View style={stylesLike.viewItemImage}>
            {/* image */}
            <Image style={stylesLike.imgItem} source={require('../../../assets/imgs/lesson_default.png')} />

            {/* length */}
            {false ?? (
              <View style={stylesLike.viewTxtLength}>
                <Text style={stylesLike.txtLength}>01:32</Text>
              </View>
            )}
          </View>

          {/* content */}
          <View style={stylesLike.viewItemContent}>
            <View style={stylesLike.viewItemHeader}>
              <Text style={stylesLike.txtLesson}>Lesson {this.props.index}</Text>
              {this.renderStatus()}
            </View>

            <View style={styles.viewItemContentBody}>
              <View style={stylesApp.flex1}>
                {/* name */}
                <TouchableOpacity onPress={this.props.onTeacher}>
                  <Text style={stylesLike.txtName}>{lesson.teacher?.getFullName()}</Text>
                </TouchableOpacity>

                {/* category */}
                <Text style={styles.txtCategory}>
                  {DanceHelper.danceNameByVal(lesson.dance, lesson.danceStyle)}
                </Text>

                {/* level */}
                <Text style={styles.txtLevel}>{DanceHelper.danceLevelNameByVal(lesson.danceLevel)}</Text>
              </View>

              <View style={styles.viewAction}>
                <View style={styleUtil.withShadow()}>
                  {this.renderAction()}
                </View>
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  renderStatus() {
    const {lesson} = this.props;

    if (this.currentUser?.isLessonPurchased(lesson.id)) {
      return (
        <Text style={styles.txtStatus}>Purchased</Text>
      );
    } else {
      return (
        <Text style={styles.txtPrice}>$35</Text>
      );
    }
  }

  renderAction() {
    const {lesson} = this.props;

    if (this.currentUser?.isLessonPurchased(lesson.id)) {
      return (
        <Button
          type="clear"
          icon={
            <Icon
              type="ionicon"
              name={this.currentUser?.isLessonLiked(lesson.id) ? 'md-heart' : 'md-heart-empty'}
              size={34}
              color={this.currentUser?.isLessonLiked(lesson.id) ? colorTheme.red : colorTheme.primary}
            />
          }
          containerStyle={styles.ctnButAction}
          buttonStyle={[styles.butAction, styles.butLike]}
          onPress={this.props.onLike}
        />
      );
    } else {
      return (
        <Button
          type="clear"
          icon={<Icon type="ionicon" name="md-add" size={24} color={colorTheme.light} />}
          containerStyle={styles.ctnButAction}
          buttonStyle={styles.butAction}
          onPress={this.props.onPurchase}
        />
      )
    }
  }
}
const mapStateToProps = (state) => state;

export default connect(mapStateToProps, null)(LessonItem);
