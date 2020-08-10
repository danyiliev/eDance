import React from 'react';
import {
  Dimensions,
  Image,
  Keyboard,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {styles} from './styles';
import {Button, Icon, Input} from 'react-native-elements';
import {stylesApp, styleUtil} from '../../styles/app.style';
import DismissKeyboard from '../../components/DismissKeyboard/DismissKeyboard';
import ContentWithBackground from '../../components/ContentWithBackground/ContentWithBackground';
import {colors as colorTheme} from '../../styles/theme.style';
import {Utils} from '../../helpers/utils';
import ImagePicker from 'react-native-image-picker';
import {UserHelper} from '../../helpers/user-helper';
import FastImage from 'react-native-fast-image';
import {Post} from '../../models/post.model';
import {setUserInfo} from '../../actions/user';
import {connect} from 'react-redux';
import {LoadingHUD} from 'react-native-hud-hybrid';
import {ApiService} from '../../services';
import {PostHelper} from '../../helpers/post-helper';

const {width: SCREEN_WDITH} = Dimensions.get('window');

class AddPost extends React.Component {
  static NAV_NAME = 'add-post';

  state = {
    // data
    text: '',
    photos: [],
  };

  currentUser = null;
  onAdded = null;

  constructor(props) {
    super(props);

    props.navigation.setOptions({
      title: 'Add New Post',
    });

    this.currentUser = props.UserReducer.user;
    this.onAdded = props.route.params.onAdded;

    this.loadingHUD = new LoadingHUD();
  }

  render() {
    return (
      <DismissKeyboard>
        <ContentWithBackground>
          <View style={styles.viewContainer}>
            {/* input */}
            <View style={[styles.viewItem, styles.viewInput]}>
              <Input
                containerStyle={styles.ctnInput}
                inputContainerStyle={stylesApp.input}
                inputStyle={styles.txtInput}
                placeholder="Enter text here"
                multiline
                value={this.state.text}
                onChangeText={(text) => {
                  this.setState({text});
                }}
                renderErrorMessage={false}
              />
            </View>

            {/* photos */}
            <Text style={styles.txtLabel}>Photos</Text>
            <View style={styles.viewPhotoContainer}>
              {Utils.makeEmptyArray(this.state.photos.length + 1).map(
                (p, i) => {
                  return this.renderImageHolder(i);
                },
              )}
            </View>

            {/* save */}
            <View style={[styleUtil.withShadow(), styles.viewButSave]}>
              <Button
                title="SAVE"
                buttonStyle={stylesApp.butPrimary}
                titleStyle={stylesApp.titleButPrimary}
                disabled={!this.state.text && this.state.photos.length <= 0}
                disabledStyle={[stylesApp.butPrimary, stylesApp.semiTrans]}
                onPress={() => this.onButSave()}
              />
            </View>
          </View>
        </ContentWithBackground>
      </DismissKeyboard>
    );
  }

  renderImageHolder(index) {
    const paddingScreen = 20;
    const width = (SCREEN_WDITH - paddingScreen * 2) / 3 - 2;

    return (
      <TouchableOpacity
        key={index.toString()}
        activeOpacity={0.7}
        onPress={() => this.onClickPhoto(index)}>
        {index >= this.state.photos.length ? (
          <View style={{...styles.viewPhoto, width: width, height: width}}>
            <Icon
              color={colorTheme.grey}
              type="ionicon"
              name="md-add"
              size={60}
            />
          </View>
        ) : (
          this.renderImage(this.state.photos[index], width)
        )}
      </TouchableOpacity>
    );
  }

  renderImage(img, width) {
    if (Utils.isObject(img)) {
      return (
        <Image
          style={{...styles.imgPhoto, width: width, height: width}}
          source={img}
        />
      );
    }

    return (
      <FastImage
        style={{...styles.imgPhoto, width: width, height: width}}
        source={img}
        resizeMode={FastImage.resizeMode.cover}
      />
    );
  }

  onClickPhoto(index) {
    // hide keyboard
    Keyboard.dismiss();

    const options = {
      title: 'Select Image',
      mediaType: 'photo',
      noData: true,
      maxWidth: 640,
      maxHeight: 640,
      quality: 0.5,
    };

    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        //
        // fileName: null
        // fileSize: 43644
        // height: 425
        // isVertical: false
        // origURL: "assets-library://asset/asset.JPG?id=B84E8479-475C-4727-A4A4-B77AA9980897&ext=JPG"
        // type: "image/jpeg"
        // uri: "file:///Users/highjump/Library/Developer/CoreSimulator/Devices/3E20960D-6DA1-49FE-B5AB-9FCD3852A998/data/Containers/Data/Application/90C1D4B3-E5D9-4828-99DB-4127F352DBBF/tmp/04CA8F42-80B2-43F9-BCA2-1F4E3EDBC29A.jpg"
        // width: 640
        //
        const source = {
          name: PostHelper.generateFileName(response.fileName),
          uri: response.uri,
          type: response.type,
        };
        const photos = this.state.photos;

        this.setState({photos: []});

        if (index >= photos.length) {
          photos.push(source);
        } else {
          photos[index] = source;
        }

        // update ui
        this.setState({photos});
      }
    });
  }

  async onButSave() {
    // show loading
    this.loadingHUD.show();

    const postNew = new Post();
    postNew.userId = this.currentUser.id;
    postNew.text = this.state.text;

    try {
      // upload photos
      const photos = [];
      for (let i = 0; i < this.state.photos.length; i++) {
        this.loadingHUD.show(
          `Uploading photos (${i + 1}/${this.state.photos.length}) ...`,
        );

        const data = await ApiService.uploadFile(
          this.state.photos[i],
          PostHelper.BUCKET_PATH,
        );
        photos.push(data.key);
      }

      postNew.photos = photos;

      // upload data
      await ApiService.addPost(postNew);

      if (this.onAdded) {
        this.onAdded(postNew);
      }

      // go back to prev page
      this.props.navigation.pop();
    } catch (e) {
      console.log(e);
    }

    this.loadingHUD.hideAll();
  }
}

const mapStateToProps = (state) => state;

const mapDispatchToProps = {
  setUserInfo,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddPost);
