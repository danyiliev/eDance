import React from 'react';
import PropTypes from 'prop-types';
import {Dimensions, Text, TouchableOpacity, TouchableWithoutFeedback, View} from 'react-native';
import {styles} from './styles';
import FastImage from 'react-native-fast-image';
import PostImage from './PostImage';
import {Button, Icon} from 'react-native-elements';
import {Utils} from '../../helpers/utils';
import {PostHelper} from '../../helpers/post-helper';
import {stylesApp} from '../../styles/app.style';

const {width: SCREEN_WIDTH} = Dimensions.get('window');

export default class PostItem extends React.Component {
  static propTypes = {
    post: PropTypes.object,
    onPressImage: PropTypes.func,
    onPressComment: PropTypes.func,
  };

  render() {
    return (
      <View style={styles.viewContainer}>
        {/* header */}
        <View style={styles.viewHeader}>
          <View>
            {/* user */}
          </View>

          <Text style={styles.txtTime}>
            {this.props.post?.createdAt.fromNow()}
          </Text>
        </View>

        <Text style={styles.txtPost}>{this.props.post?.text}</Text>

        {this.renderImages()}

        {/* footer */}
        <View style={styles.viewFooter}>
          {/* like */}
          <Button
            type="clear"
            icon={<Icon type="font-awesome" name="heart-o" size={14} />}
            titleStyle={styles.titleButComment}
            title="0"
          />

          {/* comment */}
          <Button
            type="clear"
            icon={<Icon type="font-awesome" name="comment-o" size={14} />}
            titleStyle={styles.titleButComment}
            title="0"
            containerStyle={styles.ctnButComment}
            onPress={() => {
              if (this.props.onPressComment) {
                this.props.onPressComment();
              }
            }}
          />
        </View>

        {/* comments */}
        {/*{this.renderComments()}*/}
      </View>
    );
  }

  renderImages() {
    const {photos} = this.props.post;

    if (photos.length <= 0) {
      return null;
    }

    const paddingScreen = 18;
    const margin = 2;
    const width = (SCREEN_WIDTH - paddingScreen * 2) / 3 - margin;
    let maxHeight = 200;

    const styleImg = {
      width: width,
      height: width,
      marginBottom: margin,
      marginRight: margin,
    };

    if (photos.length === 1) {
      return (
        <View>
          {this.renderImage(
            PostHelper.imageUrl(photos[0]),
            0,
            {height: maxHeight}
          )}
        </View>
      );
    } else if (photos.length === 4) {
      return (
        <View>
          <View style={stylesApp.flexRow}>
            {this.renderImage(PostHelper.imageUrl(photos[0]), 0, styleImg)}
            {this.renderImage(PostHelper.imageUrl(photos[1]), 1, styleImg)}
          </View>
          <View style={stylesApp.flexRow}>
            {this.renderImage(PostHelper.imageUrl(photos[2]), 2, styleImg)}
            {this.renderImage(PostHelper.imageUrl(photos[3]), 3, styleImg)}
          </View>
        </View>
      );
    }

    return (
      <View style={styles.viewImageContainer}>
        {photos.map((p, i) => {
          return this.renderImage(PostHelper.imageUrl(p), i, styleImg);
        })}
      </View>
    );
  }

  renderImage(imgUrl, index, style) {
    return (
      <TouchableOpacity
        key={index.toString()}
        activeOpacity={0.9}
        onPress={() => this.props.onPressImage(index)}>
        <PostImage imgUrl={imgUrl} containerStyle={style} />
      </TouchableOpacity>
    );
  }

  renderComments() {
    const comments = Utils.makeEmptyArray(5);

    return (
      <View style={styles.viewComments}>
        {
          comments.map((c, i) => {
            return (
              <Text
                style={styles.txtComment}
                key={i.toString()}>
                <Text style={styles.txtCommentUser}>First Last:</Text>
                &nbsp;This is sample comment with multiple lines I love you.&nbsp;&nbsp;
                <Text style={styles.txtTime}>2019/03/22 11:23</Text>
              </Text>
            );
          })
        }

        {/* all comments */}
        <Button
          type="clear"
          title="View All Comments"
          // buttonStyle={styles.butClear}
          titleStyle={styles.titleButAll}
          onPress={() => this.onButAll()}
        />
      </View>
    );
  }

  onButAll() {
    // go to post detail page
  }
}
