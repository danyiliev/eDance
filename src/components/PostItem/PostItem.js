import React from 'react';
import PropTypes from 'prop-types';
import {Text, View} from 'react-native';
import {styles} from './styles';
import FastImage from 'react-native-fast-image';
import PostImage from './PostImage';
import {Button, Icon} from 'react-native-elements';
import {Utils} from '../../helpers/utils';

export default class PostItem extends React.Component {
  static propTypes = {
    post: PropTypes.object,
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
            2019/03/22 11:23
          </Text>
        </View>

        <Text style={styles.txtPost}>This is the sample post.</Text>

        {this.renderImages()}

        {/* footer */}
        <View style={styles.viewFooter}>
          {/* like */}
          <Button
            type="clear"
            icon={<Icon type="font-awesome" name="heart-o" size={14} />}
            titleStyle={styles.titleButComment}
            title="12"
          />

          {/* comment */}
          <Button
            type="clear"
            icon={<Icon type="font-awesome" name="comment-o" size={14} />}
            titleStyle={styles.titleButComment}
            title="12"
            containerStyle={styles.ctnButComment}
          />
        </View>

        {/* comments */}
        {this.renderComments()}
      </View>
    );
  }

  renderImages() {
    let imgCount = 1;
    let height = 200;

    if (imgCount === 1) {
    }

    return (
      <View>
        <PostImage
          containerStyle={{height: height}} />
      </View>
    );
  }

  renderComments() {
    const comments = Utils.makeEmptyArray(5);

    return (
      <View style={styles.viewComments}>
        {
          comments.map((c, i) => {
            return (
              <Text style={styles.txtComment}>
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
