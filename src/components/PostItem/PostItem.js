import React from 'react';
import PropTypes from 'prop-types';
import {
  Dimensions,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
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
    showComment: PropTypes.bool,
    onPressImage: PropTypes.func,
    onPressComment: PropTypes.func,
  };

  static defaultProps = {
    showComment: true,
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
            title={this.props.post.commentCount.toString()}
            containerStyle={styles.ctnButComment}
            onPress={() => {
              if (this.props.onPressComment) {
                this.props.onPressComment();
              }
            }}
          />
        </View>

        {/* comments */}
        {this.renderComments()}
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
    if (this.props.showComment) {
      return (
        <View style={styles.viewComments}>
          {this.props.post.comments.slice(0, 5)?.map((c, i) => {
            return (
              <Text style={styles.txtComment} key={i.toString()}>
                <Text style={styles.txtCommentUser}>
                  {c.user?.getFullName()}:
                </Text>
                &nbsp;{c.text}&nbsp;&nbsp;
                <Text style={styles.txtTime}>{c.createdAt.fromNow()}</Text>
              </Text>
            );
          })}

          {/* all comments */}
          {this.props.post.comments.length >= 5 ? (
            <Button
              type="clear"
              title="View All Comments"
              // buttonStyle={styles.butClear}
              titleStyle={styles.titleButAll}
              onPress={() => this.onButAll()}
            />
          ) : null}
        </View>
      );
    }

    return null;
  }

  onButAll() {
    // go to post detail page
    this.props.onPressComment();
  }
}
