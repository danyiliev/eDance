import React from 'react';
import {styles as stylesMain} from '../radio/styles';
import {styles} from './styles';
import {FlatList, Text, TouchableOpacity, View} from 'react-native';
import {Utils} from '../../../helpers/utils';
import {stylesApp, styleUtil} from '../../../styles/app.style';
import {VideoHelper} from '../../../helpers/video-helper';
import FastImage from 'react-native-fast-image';
import PostImage from '../../../components/PostItem/PostImage';
import {Button, Icon, Rating} from 'react-native-elements';
import {colors as colorTheme} from '../../../styles/theme.style';
import StarRating from 'react-native-star-rating';
import AddPost from '../../add-post/AddPost';
import Cart from '../../cart/Cart';
import {ApiService} from '../../../services';
import {connect} from 'react-redux';
import {setProducts} from '../../../actions/product';
import {ProductHelper} from '../../../helpers/product-helper';
import {PostHelper} from '../../../helpers/post-helper';
import ProductDetail from '../../product-detail/ProductDetail';

class Store extends React.Component {
  static NAV_NAME = 'store';

  pageCount = 20;

  state = {
    // ui
    showLoading: true,

    // data
    products: [],
  };

  componentDidMount(): void {
    this.loadData();

    this._sub = this.props.navigation.addListener('focus', this._componentFocused);
  }

  componentWillUnmount(): void {
    this._sub();
  }

  render() {
    return (
      <View style={stylesMain.viewContainer}>
        <FlatList
          ListEmptyComponent={() => this.renderEmptyItem()}
          contentContainerStyle={stylesMain.listCtnContainer}
          keyExtractor={(item, index) => index.toString()}
          onRefresh={() => this.onRefresh()}
          refreshing={this.state.showLoading}
          data={this.state.products}
          renderItem={({item, index}) => this.renderItem(item, index)}
          numColumns={2}
          onEndReached={() => this.onEndReached()}
          onEndReachedThreshold={3}
        />

        {/* floating button */}
        <View style={[styles.viewFloating, styleUtil.withShadow()]}>
          <Button
            activeOpacity={0.6}
            buttonStyle={styles.butFloating}
            icon={
              <Icon
                type="font-awesome"
                name="shopping-cart"
                size={24}
                color={colorTheme.primary}
              />
            }
            onPress={() => this.onButCart()}
          />
        </View>
      </View>
    );
  }

  renderItem(item, index) {
    return (
      <View style={stylesMain.viewItem}>
        <TouchableOpacity style={styles.viewItemMain} activeOpacity={0.8} onPress={() => this.onItem(item)}>
          <View>
            <PostImage
              iconSize={64}
              imgUrl={PostHelper.imageUrl(item.photos[0])}
              containerStyle={styles.imgItem}
              imageStyle={styles.imgItemCore}
            />

            <View style={styles.viewItemContent}>
              {/* name */}
              <Text style={styles.txtItemTitle}>{item.name}</Text>

              <View style={styles.viewPrice}>
                <Text style={styles.txtGrey}>{item.soldCount} sold</Text>
                <Text style={styles.txtPrice}>${item.price}</Text>
              </View>

              <View style={[styles.viewPrice, stylesApp.mt4]}>
                {/* star rating */}
                <StarRating
                  activeOpacity={1}
                  rating={item.rate}
                  starSize={14}
                  starStyle={{marginRight: 2}}
                  fullStarColor={colorTheme.primary}
                  emptyStarColor={colorTheme.primary}
                />

                <Text style={styles.txtGrey}>{item.reviewCount} reviews</Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
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
        <Text style={stylesApp.txtEmptyItem}>No products available yet</Text>
      </View>
    );
  }

  onRefresh() {
    this.loadData();
  }

  async loadData(continued = false) {
    let indexFrom = 0;

    if (!continued) {
      // show loading mark
      this.setState({
        showLoading: true,
      });
    } else {
      indexFrom = this.state.products.length;
    }

    try {
      let products = await ApiService.getProductsAll(indexFrom, this.pageCount);

      if (indexFrom > 0) {
        // attach
        products = [...this.state.products, ...products];
      }

      this.props.setProducts(products);
      this.setState({products});
    } catch (e) {
      console.log(e);
    }

    // hide loading
    this.setState({
      showLoading: false,
    });
  }

  onEndReached() {
    // smaller than one page, no need to load again
    if (this.state.products.length < this.pageCount) {
      return;
    }

    this.loadData(true);
  }

  _componentFocused = () => {
    this.refreshList();
  };

  refreshList() {
    this.setState({
      products: this.props.ProductReducer.products,
    });
  }

  onItem(item) {
    // go to product detail page
    this.props.navigation.push(ProductDetail.NAV_NAME, {
      product: item,
    });
  }

  onButCart() {
    this.props.navigation.push(Cart.NAV_NAME);
  }
}

const mapStateToProps = (state) => state;

const mapDispatchToProps = {
  setProducts,
};

export default connect(mapStateToProps, mapDispatchToProps)(Store);
