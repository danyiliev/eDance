import React from 'react';
import {setUserInfo} from '../../actions/user';
import {connect} from 'react-redux';
import {
  FlatList,
  KeyboardAvoidingView,
  NativeModules,
  Platform,
  SafeAreaView,
  StatusBarIOS,
  Text,
  TouchableOpacity,
  View,
  Keyboard,
} from 'react-native';
import {stylesApp} from '../../styles/app.style';
import ContentWithBackground from '../../components/ContentWithBackground/ContentWithBackground';
import {styles} from './styles';
import {Button, Input} from 'react-native-elements';
import {colors as colorTheme} from '../../styles/theme.style';
import {ApiService} from '../../services';
import PostItem from '../../components/PostItem/PostItem';
import {PostHelper} from '../../helpers/post-helper';
import ImageView from 'react-native-image-viewing';
import FastImage from 'react-native-fast-image';
import {Post} from '../../models/post.model';
import {Comment} from '../../models/comment.model';
import {UserHelper} from '../../helpers/user-helper';

const {StatusBarManager} = NativeModules;

class PostDetail extends React.Component {
  static NAV_NAME = 'post-detail';

  state = {
    // ui
    statusBarHeight: 0,
    showLoading: true,
    text: '',
    showImgViewer: false,

    // data
    comments: [],
    imageUrls: [],
    imageIndex: 0,
  };

  currentUser = null;
  post = null;

  pageCount = 20;

  constructor(props) {
    super(props);

    props.navigation.setOptions({
      title: 'Comments',
    });

    this.currentUser = props.UserReducer.user;
    this.post = new Post().initFromObject(props.route.params.data);
    this.onChangeItem = props.route.params.onChangeItem;

    this.state.comments = this.post.comments;
  }

  componentDidMount(): void {
    if (Platform.OS === 'ios') {
      StatusBarManager.getHeight((statusBarFrameData) => {
        this.setState({statusBarHeight: statusBarFrameData.height});
      });
      this.statusBarListener = StatusBarIOS.addListener(
        'statusBarFrameWillChange',
        (statusBarData) => {
          this.setState({statusBarHeight: statusBarData.frame.height});
        },
      );
    }

    this.loadData();
  }

  render() {
    return (
      <SafeAreaView style={stylesApp.viewContainer}>
        <ContentWithBackground>
          <KeyboardAvoidingView
            style={stylesApp.viewContainer}
            keyboardVerticalOffset={
              Platform.OS === 'ios' ? 44 + this.state.statusBarHeight : 0
            }
            behavior={Platform.OS === 'ios' ? 'padding' : null}>
            <FlatList
              data={this.state.comments}
              renderItem={({item, index}) => this.renderItem(item, index)}
              ListEmptyComponent={() => this.renderEmptyItem()}
              onEndReached={() => this.onEndReached()}
              onEndReachedThreshold={3}
              ListHeaderComponent={() => this.renderHeader()}
            />

            {/* footer */}
            <View style={styles.viewFooter}>
              {/* input */}
              <Input
                containerStyle={styles.ctnInput}
                inputContainerStyle={stylesApp.input}
                inputStyle={styles.txtInput}
                placeholder={'Type a comment…'}
                multiline
                value={this.state.text}
                onChangeText={(text) => {
                  this.setState({text});
                }}
                renderErrorMessage={false}
              />

              {/* send */}
              <Button
                type="clear"
                title="Send"
                titleStyle={styles.titleButSend}
                containerStyle={styles.ctnButSend}
                onPress={() => this.onButSend()}
              />
            </View>

            <ImageView
              images={this.state.imageUrls}
              imageIndex={0}
              visible={this.state.showImgViewer}
              onRequestClose={() => this.setState({showImgViewer: false})}
            />
          </KeyboardAvoidingView>
        </ContentWithBackground>
      </SafeAreaView>
    );
  }

  renderHeader() {
    // show post item
    return (
      <PostItem
        post={this.post}
        onPressImage={(imgIndex) => this.onPressImage(imgIndex)}
        showComment={false}
      />
    );
  }

  renderEmptyItem() {
    return (
      <View style={stylesApp.viewLoading}>
        <Text style={stylesApp.txtEmptyItem}>No comments</Text>
      </View>
    );
  }

  renderItem(item, index) {
    return (
      <View style={styles.viewComment}>
        {/* photo */}
        <TouchableOpacity>
          <FastImage
            style={styles.imgUser}
            source={UserHelper.getUserImage(item?.user)}
            resizeMode={FastImage.resizeMode.cover}
          />
        </TouchableOpacity>

        <View style={styles.viewCommentContent}>
          <View style={styles.viewCommentHeader}>
            {/* name */}
            <Text style={styles.txtUser}>{item?.user.getFullName()}</Text>
            {/* time */}
            <Text style={styles.txtTime}>{item?.createdAt.fromNow()}</Text>
          </View>

          <Text style={styles.txtComment}>{item.text}</Text>
        </View>
      </View>
    );
  }

  async loadData(continued = false) {
    let indexFrom = 0;

    if (!continued) {
      // show loading mark
      this.setState({
        showLoading: true,
      });
    } else {
      indexFrom = this.state.comments.length;
    }

    try {
      let comments = await ApiService.getComments(
        indexFrom,
        this.pageCount,
        this.post.id,
      );

      if (indexFrom > 0) {
        // attach
        comments = [...this.state.comments, ...comments];
      }

      this.setState({comments});
    } catch (e) {
      console.log(e);
    }

    this.setState({
      showLoading: false,
    });
  }

  onPressImage(imgIndex) {
    // show image viewer
    this.setState({
      showImgViewer: true,
      imageUrls: PostHelper.getImageUris(this.post),
      imageIndex: imgIndex,
    });
  }

  async onButSend() {
    if (!this.state.text) {
      return;
    }

    const commentNew = new Comment();
    commentNew.userId = this.currentUser.id;
    commentNew.user = this.currentUser;
    commentNew.text = this.state.text;
    commentNew.postId = this.post.id;

    // upload data
    ApiService.addComment(commentNew).catch((e) => {
      console.log(e);
    });

    // add to list
    const {comments} = this.state;
    comments.unshift(commentNew);

    this.post.commentCount++;
    this.post.comments = comments;

    this.setState({
      comments: comments,
      // clear input
      text: '',
    });

    // hide keyboard
    Keyboard.dismiss();

    this.onChangeItem(this.post);
  }

  onEndReached() {
    // smaller than one page, no need to load again
    if (this.state.comments.length < this.pageCount) {
      return;
    }

    this.loadData(true);
  }
}

const mapStateToProps = (state) => state;

export default connect(mapStateToProps, null)(PostDetail);
