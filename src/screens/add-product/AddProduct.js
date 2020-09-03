import React from 'react';
import {setUserInfo} from '../../actions/user';
import {connect} from 'react-redux';
import {LoadingHUD} from 'react-native-hud-hybrid';
import ContentWithBackground from '../../components/ContentWithBackground/ContentWithBackground';
import {Dimensions, Image, Keyboard, SafeAreaView, Text, TouchableOpacity, View} from 'react-native';
import {styles} from './styles';
import {styles as stylesAdd} from '../add-post/styles';
import DismissKeyboard from '../../components/DismissKeyboard/DismissKeyboard';
import {stylesApp, styleUtil} from '../../styles/app.style';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Button, Icon, Input} from 'react-native-elements';
import {Utils} from '../../helpers/utils';
import {colors as colorTheme} from '../../styles/theme.style';
import FastImage from 'react-native-fast-image';
import ImagePicker from 'react-native-image-picker';
import {PostHelper} from '../../helpers/post-helper';
import {setMyProducts, setProducts} from '../../actions/product';
import {Product} from '../../models/product.model';
import {ApiService} from '../../services';
import {ProductHelper} from '../../helpers/product-helper';

const {width: SCREEN_WDITH} = Dimensions.get('window');

class AddProduct extends React.Component {
  static NAV_NAME = 'add-product';

  state = {
    // data
    name: '',
    desc: '',
    price: '',
    photos: [],
  };

  currentUser = null;
  onAdded = null;

  constructor(props) {
    super(props);

    props.navigation.setOptions({
      title: 'Add New Product',
    });

    this.currentUser = props.UserReducer.user;
    if (props.route.params) {
      this.onAdded = props.route.params.onAdded;
    }

    this.loadingHUD = new LoadingHUD();
  }

  render() {
    return (
      <SafeAreaView style={stylesApp.viewContainer}>
        <ContentWithBackground>
          <KeyboardAwareScrollView style={stylesApp.viewContainer} bounces={false}>
            <View style={stylesAdd.viewContainer}>
              {/* name */}
              <View style={styles.viewFormItem}>
                <Text style={styles.txtLabel}>Name </Text>
                <View style={[styles.viewItem, stylesAdd.viewInput]}>
                  <Input
                    containerStyle={stylesAdd.ctnInput}
                    inputContainerStyle={stylesApp.input}
                    inputStyle={stylesAdd.txtInput}
                    placeholder="Enter name here"
                    value={this.state.name}
                    onChangeText={(name) => {
                      this.setState({name});
                    }}
                    renderErrorMessage={false}
                    returnKeyType="next"
                    blurOnSubmit={false}
                    onSubmitEditing={() => {
                      this.inputDesc.focus();
                    }}
                  />
                </View>
              </View>

              {/* description */}
              <View style={styles.viewFormItem}>
                <Text style={styles.txtLabel}>Description </Text>
                <View style={[styles.viewItem, stylesAdd.viewInput]}>
                  <Input
                    ref={(input) => {
                      this.inputDesc = input;
                    }}
                    containerStyle={stylesAdd.ctnInput}
                    inputContainerStyle={stylesApp.input}
                    inputStyle={stylesAdd.txtInput}
                    placeholder="Enter description here"
                    multiline
                    value={this.state.desc}
                    onChangeText={(desc) => {
                      this.setState({desc});
                    }}
                    renderErrorMessage={false}
                  />
                </View>
              </View>

              {/* price */}
              <View style={styles.viewFormItem}>
                <Text style={styles.txtLabel}>Price ($) </Text>
                <View style={[styles.viewItem, stylesAdd.viewInput]}>
                  <Input
                    containerStyle={stylesAdd.ctnInput}
                    inputContainerStyle={stylesApp.input}
                    inputStyle={stylesAdd.txtInput}
                    placeholder="Enter price here"
                    value={this.state.price}
                    onChangeText={(price) => {
                      this.setState({price});
                    }}
                    renderErrorMessage={false}
                    keyboardType="numeric"
                  />
                </View>
              </View>

              {/* photos */}
              <Text style={styles.txtLabel}>Photos</Text>
              <View style={stylesAdd.viewPhotoContainer}>
                {Utils.makeEmptyArray(this.state.photos.length + 1).map((p, i) => {
                  return this.renderImageHolder(i);
                })}
              </View>

              {/* save */}
              <View style={[styleUtil.withShadow(), stylesAdd.viewButSave]}>
                <Button
                  title="SAVE"
                  buttonStyle={stylesApp.butPrimary}
                  titleStyle={stylesApp.titleButPrimary}
                  disabled={!this.availableToSave()}
                  disabledStyle={[stylesApp.butPrimary, stylesApp.semiTrans]}
                  onPress={() => this.onButSave()}
                />
              </View>
            </View>
          </KeyboardAwareScrollView>
        </ContentWithBackground>
      </SafeAreaView>
    );
  }

  renderImageHolder(index) {
    const paddingScreen = 20;
    const width = (SCREEN_WDITH - paddingScreen * 2) / 3 - 2;

    return (
      <TouchableOpacity key={index.toString()} activeOpacity={0.7} onPress={() => this.onClickPhoto(index)}>
        {index >= this.state.photos.length ? (
          <View style={{...stylesAdd.viewPhoto, width: width, height: width}}>
            <Icon color={colorTheme.grey} type="ionicon" name="md-add" size={60} />
          </View>
        ) : (
          this.renderImage(this.state.photos[index], width)
        )}
      </TouchableOpacity>
    );
  }

  renderImage(img, width) {
    if (Utils.isObject(img)) {
      return <Image style={{...stylesAdd.imgPhoto, width: width, height: width}} source={img} />;
    }

    return (
      <FastImage
        style={{...stylesAdd.imgPhoto, width: width, height: width}}
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

  availableToSave() {
    return this.state.name && this.state.price && this.state.photos.length > 0;
  }

  async onButSave() {
    // show loading
    this.loadingHUD.show();

    const productNew = new Product();
    productNew.userId = this.currentUser?.id;
    productNew.name = this.state.name;
    productNew.description = this.state.desc;
    productNew.price = Number(this.state.price);

    try {
      // upload photos
      const photos = [];
      for (let i = 0; i < this.state.photos.length; i++) {
        this.loadingHUD.show(`Uploading photos (${i + 1}/${this.state.photos.length}) ...`);

        const data = await ApiService.uploadFile(this.state.photos[i], ProductHelper.BUCKET_PATH);
        photos.push(data.key);
      }

      productNew.photos = photos;

      // upload data
      await ApiService.addProduct(productNew);

      // add to reducers
      let {products} = this.props.ProductReducer;
      products.unshift(productNew);

      const {myProducts} = this.props.ProductReducer;
      myProducts.unshift(productNew);

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
  setProducts,
  setMyProducts,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddProduct);
