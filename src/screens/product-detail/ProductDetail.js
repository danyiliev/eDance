import React from 'react';
import {connect} from 'react-redux';
import {
  ActivityIndicator,
  FlatList,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {stylesApp, styleUtil} from '../../styles/app.style';
import {Utils} from '../../helpers/utils';
import Carousel, {Pagination} from 'react-native-x-carousel';
import {styles} from './styles';
import PostImage from '../../components/PostItem/PostImage';
import {Button} from 'react-native-elements';
import SplashScreen from 'react-native-splash-screen';
import FastImage from 'react-native-fast-image';
import {UserHelper} from '../../helpers/user-helper';
import StarRating from 'react-native-star-rating';
import {colors as colorTheme} from '../../styles/theme.style';
import {PostHelper} from '../../helpers/post-helper';
import ImageView from 'react-native-image-viewing';
import {ProductHelper} from '../../helpers/product-helper';
import {ApiService} from '../../services';
import Toast from 'react-native-simple-toast';
import {setUserInfo} from '../../actions/user';
import Profile from '../profile/Profile';

class ProductDetail extends React.Component {
  static NAV_NAME = 'product-detail';

  state = {
    showLoading: true,

    // ui for image viewer
    imageIndex: 0,
    showImgViewer: false,

    // data
    quantity: 1,
    reviews: [],
  };

  product = null;
  fromCart = false;

  currentUser = null;

  constructor(props) {
    super(props);

    props.navigation.setOptions({
      title: 'Product Detail',
    });

    this.currentUser = props.UserReducer.user;

    // get parameter
    if (props.route.params) {
      this.product = props.route.params.product;
      this.fromCart = props.route.params.fromCart || false;
    }
  }

  componentDidMount(): void {
    SplashScreen.hide();

    this.loadData();
  }

  render() {
    return (
      <View style={stylesApp.viewContainer}>
        <FlatList
          bounces={false}
          keyExtractor={(item, index) => index.toString()}
          data={this.state.reviews}
          renderItem={({item, index}) => this.renderItem(item, index)}
          ListHeaderComponent={() => this.renderHeader()}
          ListEmptyComponent={() => this.renderEmptyItem()}
        />
      </View>
    );
  }

  renderHeader() {
    const imgData = this.product?.photos.map((p) => {
      return {path: p};
    });

    return (
      <View>
        {/* image */}
        <Carousel
          pagination={Pagination}
          renderItem={(img, index) => this.renderImage(img, index)}
          data={imgData}
        />

        <View style={styles.viewContent}>
          {this.fromCart ? null : (
            <View>
              {/* quantity */}
              <View style={styles.viewQuantity}>
                <Text style={styles.txtQuantityLabel}>Quantity</Text>
                {/* minus */}
                <TouchableOpacity onPress={() => this.onIncrementQuantity(-1)}>
                  <View style={[styles.butQuantity, styles.butMinus]}>
                    <Text style={styles.titleButMinus}>-</Text>
                  </View>
                </TouchableOpacity>

                <Text style={styles.txtQuantity}>{this.state.quantity}</Text>

                {/* plus */}
                <TouchableOpacity onPress={() => this.onIncrementQuantity(1)}>
                  <View style={[styles.butQuantity, styles.butPlus]}>
                    <Text style={styles.titleButPlus}>+</Text>
                  </View>
                </TouchableOpacity>
              </View>

              {/* add cart */}
              <View style={styleUtil.withShadow()}>
                <Button
                  title="ADD TO CART"
                  buttonStyle={styles.butAddCart}
                  titleStyle={stylesApp.titleButPrimary}
                  onPress={() => this.onButAddCart()}
                />
              </View>
            </View>
          )}
          <Text style={styles.txtTitle}>{this.product?.name}</Text>
          {this.product?.description ? (
            <Text style={styles.txtDescription}>{this.product?.description}</Text>
          ) : (
            <View style={styles.viewLoading}>
              <Text style={styles.txtEmptyItem}>No Description</Text>
            </View>
          )}

          <Text style={styles.txtTitle}>Reviews</Text>
        </View>

        <ImageView
          images={ProductHelper.getImageUris(this.product)}
          imageIndex={this.state.imageIndex}
          visible={this.state.showImgViewer}
          onRequestClose={() => this.setState({showImgViewer: false})}
        />
      </View>
    );
  }

  renderImage(img, index) {
    return (
      <TouchableWithoutFeedback onPress={() => this.onImage(index)}>
        <View>
          <PostImage
            key={index.toString()}
            iconSize={48}
            imgUrl={PostHelper.imageUrl(img.path)}
            containerStyle={styles.imgItem}
          />
        </View>
      </TouchableWithoutFeedback>
    );
  }

  renderItem(item, index) {
    return (
      <View style={styles.viewReview} key={index.toString()}>
        {/* user */}
        <TouchableOpacity activeOpacity={0.8} onPress={() => this.onUser(item.user)}>
          <FastImage
            style={styles.imgUser}
            source={UserHelper.getUserImage(item.user)}
            resizeMode={FastImage.resizeMode.cover}
          />
        </TouchableOpacity>

        <View style={styles.viewReviewContent}>
          <View style={styles.viewReviewHeader}>
            <View style={stylesApp.flexRowCenter}>
              {/* star rating */}
              <StarRating
                activeOpacity={1}
                rating={item.rating}
                starSize={16}
                starStyle={{marginRight: 4}}
                fullStarColor={colorTheme.primary}
                emptyStarColor={colorTheme.primary}
              />
              <Text style={stylesApp.ml10}>{item.rating.toFixed(1)}</Text>
            </View>

            {/* time */}
            <Text style={styles.txtTime}>{item.createdAtStr()}</Text>
          </View>

          <Text style={styles.txtReview}>{item.review}</Text>
        </View>
      </View>
    );
  }

  renderEmptyItem() {
    return (
      <View style={stylesApp.viewLoading}>
        {this.state.showLoading ? (
          <ActivityIndicator animating={true} />
        ) : (
          <Text style={stylesApp.txtEmptyItem}>No reviews received yet</Text>
        )}
      </View>
    );
  }

  onIncrementQuantity(increment) {
    let {quantity} = this.state;
    quantity = Math.max(1, quantity + increment);

    this.setState({quantity});
  }

  onButAddCart() {
    this.product.quantity = this.state.quantity;

    if (this.currentUser?.addProductToCart(this.product)) {
      ApiService.addProductToCart(this.product);

      UserHelper.saveUserToLocalStorage(this.currentUser, this.props);
      Toast.show('Added to Cart successfully');
    } else {
      Toast.show('Already added in Cart');
    }
  }

  onImage(index) {
    // show image viewer
    this.setState({
      showImgViewer: true,
      imageIndex: index,
    });
  }

  async loadData(continued = false) {
    try {
      const reviews = await ApiService.getProductReviews(this.product?.id);
      // sort descending based on time
      reviews.sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));

      this.setState({reviews});
    } catch (e) {
      console.log(e);
    }

    // hide loading
    this.setState({
      showLoading: false,
    });
  }

  onUser(user) {
    // go to profile page
    this.props.navigation.push(Profile.NAV_NAME, {
      user: user,
    });
  }
}

const mapStateToProps = (state) => state;
const mapDispatchToProps = {
  setUserInfo,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetail);
