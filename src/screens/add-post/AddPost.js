import React from 'react';
import {Dimensions, Image, Keyboard, Text, TouchableOpacity, View} from 'react-native';
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

const {width: SCREEN_WDITH} = Dimensions.get('window');

export default class AddPost extends React.Component {
  static NAV_NAME = 'add-post';

  state = {
    // data
    text: '',
    photos: [],
  };

  constructor(props) {
    super(props);

    props.navigation.setOptions({
      title: 'Add New Post',
    });
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
        const source = {uri: response.uri};
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

  onButSave() {
  }
}
