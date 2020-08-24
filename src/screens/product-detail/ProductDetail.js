import React from 'react';
import {connect} from 'react-redux';
import {FlatList, Text, TouchableOpacity, View} from 'react-native';
import {stylesApp, styleUtil} from '../../styles/app.style';
import {Utils} from '../../helpers/utils';
import Carousel, { Pagination } from 'react-native-x-carousel';
import {styles} from './styles';
import PostImage from '../../components/PostItem/PostImage';
import {Button} from 'react-native-elements';
import SplashScreen from 'react-native-splash-screen';
import FastImage from 'react-native-fast-image';
import {UserHelper} from '../../helpers/user-helper';
import StarRating from 'react-native-star-rating';
import {colors as colorTheme} from '../../styles/theme.style';

class ProductDetail extends React.Component {
  static NAV_NAME = 'product-detail';

  state = {
    quantity: 1,
  };

  constructor(props) {
    super(props);

    props.navigation.setOptions({
      title: 'Product Detail',
    });
  }

  componentDidMount(): void {
    SplashScreen.hide();
  }

  render() {
    return (
      <View style={stylesApp.viewContainer}>
        <FlatList
          keyExtractor={(item, index) => index.toString()}
          data={Utils.makeEmptyArray(7)}
          renderItem={({item, index}) => this.renderItem(item, index)}
          ListHeaderComponent={() => this.renderHeader()}
          ListEmptyComponent={() => this.renderEmptyItem()}
        />
      </View>
    );
  }

  renderHeader() {
    return (
      <View>
        {/* image */}
        <Carousel
          pagination={Pagination}
          renderItem={(img, index) => this.renderImage(img, index)}
          data={Utils.makeEmptyArray(3)}
        />

        <View style={styles.viewContent}>
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

          <Text style={styles.txtTitle}>
            Fabric Polyeste/Spandex Descripton
          </Text>
          <Text style={styles.txtDescription}>
            Qui tempor do ut Lorem voluptate elit excepteur
            consectetur. Non minim excepteur amet ut
            duis proident cupidatat proident ea.
            Consectetur do eu velit commodo sint voluptate.
            Duis dolor ad fugiat labore adipisicing eiusmod
            Lorem consectetur.
          </Text>

          <Text style={styles.txtTitle}>Reviews</Text>
        </View>
      </View>
    );
  }

  renderImage(img, index) {
    return (
      <PostImage
        key={index.toString()}
        iconSize={48}
        imgUrl=""
        containerStyle={styles.imgItem}
      />
    );
  }

  renderItem(item, index) {
    return (
      <View style={styles.viewReview} key={index.toString()}>
        {/* user */}
        <TouchableOpacity activeOpacity={0.8} onPress={this.props.onUser}>
          <FastImage
            style={styles.imgUser}
            source={UserHelper.getUserImage(this.props.user)}
            resizeMode={FastImage.resizeMode.cover}
          />
        </TouchableOpacity>

        <View style={styles.viewReviewContent}>
          <View style={styles.viewReviewHeader}>
            <View style={stylesApp.flexRowCenter}>
              {/* star rating */}
              <StarRating
                activeOpacity={1}
                rating={4}
                starSize={16}
                starStyle={{marginRight: 4}}
                fullStarColor={colorTheme.primary}
                emptyStarColor={colorTheme.primary}
              />
              <Text style={stylesApp.ml10}>4.0</Text>
            </View>

            {/* time */}
            <Text style={styles.txtTime}>2020-08-29 23:23:11</Text>
          </View>

          <Text style={styles.txtReview}>a asdlkfj i aslkdjfio pweo</Text>
        </View>
      </View>
    );
  }

  renderEmptyItem() {
    // do not show anything when loading progress
    if (this.state.showLoading) {
      return null;
    }

    return (
      <View style={stylesApp.viewLoading}>
        <Text style={stylesApp.textEmptyItem}>No reviews received yet</Text>
      </View>
    );
  }

  onIncrementQuantity(increment) {
    let {quantity} = this.state;
    quantity = Math.max(1, quantity + increment);

    this.setState({quantity});
  }

  onButAddCart() {
  }
}

const mapStateToProps = (state) => state;

export default connect(mapStateToProps, null)(ProductDetail);
