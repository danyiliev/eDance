import React from 'react';
import {ActivityIndicator, FlatList, TouchableOpacity, View} from 'react-native';
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

class Profile extends React.Component {
  static NAV_NAME = 'profile';

  state = {
    // ui
    showLoading: true,

    // data
    posts: [],
  };

  currentUser = null;
  pageCount = 20;

  constructor(props) {
    super(props);

    props.navigation.setOptions({
      title: 'My Profile',
      headerRight: () => (
        <TouchableOpacity
          style={stylesApp.viewHeaderRight}
          onPress={() => this.onButEdit()}>
          <Icon type="font-awesome" name="pencil-square-o" size={18} />
        </TouchableOpacity>
      ),
    });

    this.currentUser = props.UserReducer.user;
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
            source={UserHelper.getUserImage(this.currentUser)}
            resizeMode={FastImage.resizeMode.cover}
          />

          {/* name */}
          <Text style={styles.txtName}>{this.currentUser?.getFullName()}</Text>
        </View>

        {/* add new */}
        <TouchableOpacity activeOpacity={0.7} onPress={() => this.onNewPost()}>
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
      </View>
    );
  }

  renderItem(item, index) {
    return (
      <PostItem />
    );
  }

  renderEmptyItem() {
    return (
      <View style={stylesApp.viewLoading}>
        {this.state.loadingData ? (
          <ActivityIndicator animating={true} />
        ) : (
          <Text style={stylesApp.textEmptyItem}>
            Your posts will be shown here
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
    this.props.navigation.push(AddPost.NAV_NAME);
  }

  async loadData(continued = false) {
    let indexFrom = 0;

    if (!continued) {
      // show loading mark
      this.setState({
        showLoading: true,
      });

      indexFrom = this.state.channels.length;
    }

    try {
      let posts = await ApiService.getPosts(indexFrom, this.pageCount);

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
}

const mapStateToProps = (state) => state;

const mapDispatchToProps = {
  setUserInfo,
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
