import React from 'react';
import {
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
  View,
} from 'react-native';
import ContentWithBackground from '../../components/ContentWithBackground/ContentWithBackground';
import {Utils} from '../../helpers/utils';
import {styles} from './styles';
import FastImage from 'react-native-fast-image';
import {Icon, Text} from 'react-native-elements';
import {connect} from 'react-redux';
import {setUserInfo} from '../../actions/user';
import PostItem from '../../components/PostItem/PostItem';
import {stylesApp} from '../../styles/app.style';
import EditProfile from './edit-profile/EditProfile';
import {colors as colorTheme} from '../../styles/theme.style';
import AddPost from '../add-post/AddPost';
import {UserHelper} from '../../helpers/user-helper';
import {ApiService} from '../../services';
import {Video} from '../../models/video.model';
import ImageView from 'react-native-image-viewing';
import {PostHelper} from '../../helpers/post-helper';
import Reviews from '../reviews/Reviews';
import PostDetail from '../post-detail/PostDetail';

class Profile extends React.Component {
  static NAV_NAME = 'profile';

  state = {
    // ui
    showLoading: true,
    showImgViewer: false,

    // data
    posts: [],
    imageUrls: [],
    imageIndex: 0,
  };

  user = null;
  pageCount = 20;

  selectedIndex = 0;

  constructor(props) {
    super(props);

    if (props.route.params) {
      this.user = props.route.params.user;
    } else {
      this.user = props.UserReducer.user;
    }

    props.navigation.setOptions({
      title: 'My Profile',
      headerRight: () => (
        this.isMine() ? (
          <TouchableOpacity
            style={stylesApp.viewHeaderRight}
            onPress={() => this.onButEdit()}>
            <Icon type="font-awesome" name="pencil-square-o" size={18} />
          </TouchableOpacity>
        ) : null
      )
    });
  }

  componentDidMount(): void {
    this.loadData(true);
  }

  render() {
    return (
      <ContentWithBackground>
        <FlatList
          keyExtractor={(item, index) => index.toString()}
          data={this.state.posts}
          renderItem={({item, index}) => this.renderItem(item, index)}
          ListHeaderComponent={() => this.renderHeader()}
          ListEmptyComponent={() => this.renderEmptyItem()}
          bounces={false}
          onEndReached={() => this.onEndReached()}
          onEndReachedThreshold={3}
        />

        <ImageView
          images={this.state.imageUrls}
          imageIndex={this.state.imageIndex}
          visible={this.state.showImgViewer}
          onRequestClose={() => this.setState({showImgViewer: false})}
        />
      </ContentWithBackground>
    );
  }

  renderHeader() {
    // user info
    return (
      <View>
        <View style={styles.viewHeader}>
          {/* photo */}
          <FastImage
            style={styles.imgUser}
            source={UserHelper.getUserImage(this.user)}
            resizeMode={FastImage.resizeMode.cover}
          />

          {/* name */}
          <Text style={styles.txtName}>{this.user?.getFullName()}</Text>
        </View>

        {/* add new */}
        {this.isMine() ? (
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => this.onNewPost()}>
            <View style={styles.viewAddNew}>
              <View style={styles.viewNewBut}>
                <Icon
                  color={colorTheme.grey}
                  type="ionicon"
                  name="md-add"
                  size={60}
                />
              </View>

              <Text style={styles.txtAddNew}>Add New Post</Text>
            </View>
          </TouchableOpacity>
        ) : null}
      </View>
    );
  }

  renderItem(item, index) {
    return (
      <PostItem
        post={item}
        onPressImage={(imgIndex) => this.onPressImage(item, imgIndex)}
        onPressComment={() => this.onPostComment(item, index)}
      />
    );
  }

  renderEmptyItem() {
    return (
      <View style={stylesApp.viewLoading}>
        {this.state.loadingData ? (
          <ActivityIndicator animating={true} />
        ) : (
          <Text style={stylesApp.txtEmptyItem}>
            {this.isMine()
              ? 'Your stories will be shown here'
              : 'This user has not added stories yet'}
          </Text>
        )}
      </View>
    );
  }

  onButEdit() {
    // go to edit profile page
    this.props.navigation.push(EditProfile.NAV_NAME);
  }

  onNewPost() {
    // go to edit profile page
    this.props.navigation.push(AddPost.NAV_NAME, {
      onAdded: this.onPostAdded.bind(this),
    });
  }

  async loadData(continued = false) {
    let indexFrom = 0;

    if (!continued) {
      // show loading mark
      this.setState({
        showLoading: true,
      });
    } else {
      indexFrom = this.state.posts.length;
    }

    try {
      let posts = await ApiService.getPosts(
        indexFrom,
        this.pageCount,
        this.user.id,
      );

      if (indexFrom > 0) {
        // attach
        posts = [...this.state.posts, ...posts];
      }

      this.setState({posts});
    } catch (e) {
      console.log(e);
    }

    this.setState({
      showLoading: false,
    });
  }

  onPostAdded(post) {
    const {posts} = this.state;
    posts.unshift(post);

    this.setState({posts});
  }

  onEndReached() {
    // smaller than one page, no need to load again
    if (this.state.posts.length < this.pageCount) {
      return;
    }

    this.loadData(true);
  }

  isMine() {
    return this.props.UserReducer.user?.equalTo(this.user);
  }

  onPressImage(item, imgIndex) {
    // show image viewer
    this.setState({
      showImgViewer: true,
      imageUrls: PostHelper.getImageUris(item),
      imageIndex: imgIndex,
    });
  }

  onPostComment(item, index) {
    this.selectedIndex = index;

    // go to post detail page
    this.props.navigation.push(PostDetail.NAV_NAME, {
      data: item.toObject(),
      onChangeItem: this.onChangeItem.bind(this),
    });
  }

  onChangeItem(post) {
    const {posts} = this.state;

    posts[this.selectedIndex] = post;

    this.setState({posts});
  }
}

const mapStateToProps = (state) => state;

const mapDispatchToProps = {
  setUserInfo,
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
