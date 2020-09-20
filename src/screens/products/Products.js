import React from 'react';
import {Alert, FlatList, Text, TouchableOpacity, View} from 'react-native';
import {stylesApp} from '../../styles/app.style';
import {styles} from './styles';
import {Utils} from '../../helpers/utils';
import {styles as stylesCart} from '../cart/styles';
import PostImage from '../../components/PostItem/PostImage';
import SplashScreen from 'react-native-splash-screen';
import StarRating from 'react-native-star-rating';
import {colors as colorTheme} from '../../styles/theme.style';
import {Button, Icon} from 'react-native-elements';
import AddProduct from '../add-product/AddProduct';
import {connect} from 'react-redux';
import {setMyProducts} from '../../actions/product';
import {ApiService} from '../../services';
import {PostHelper} from '../../helpers/post-helper';
import Toast from 'react-native-simple-toast';

class Products extends React.Component {
  static NAV_NAME = 'products';

  state = {
    // ui
    showLoading: false,

    // data
    products: [],
  };

  pageCount = 20;

  constructor(props) {
    super(props);

    props.navigation.setOptions({
      title: 'My Products',
      headerRight: () => (
        <TouchableOpacity
          style={stylesApp.viewHeaderRight}
          onPress={() => this.onButAdd()}>
          <Icon type="ionicon" name="md-add" size={24} />
        </TouchableOpacity>
      ),
    });
  }

  componentDidMount(): void {
    this._sub = this.props.navigation.addListener('focus', this._componentFocused);

    if (!this.props.ProductReducer.myProducts) {
      this.loadData();
    }
  }

  componentWillUnmount(): void {
    this._sub();
  }

  render() {
    return (
      <View style={stylesApp.viewContainer}>
        <FlatList
          contentContainerStyle={styles.listCtnContainer}
          keyExtractor={(item, index) => index.toString()}
          data={this.state.products}
          ListEmptyComponent={() => this.renderEmptyItem()}
          renderItem={({item, index}) => this.renderItem(item, index)}
          refreshing={this.state.showLoading}
        />
      </View>
    );
  }

  renderItem(item, index) {
    return (
      <TouchableOpacity activeOpacity={0.7} onPress={() => this.onItem(index)}>
        <View style={stylesCart.viewItem}>
          {/* photo */}
          <PostImage
            iconSize={48}
            imgUrl={PostHelper.imageUrl(item.photos[0])}
            containerStyle={stylesCart.imgItem}
          />

          <View style={stylesCart.viewItemContent}>
            <Text style={styles.txtTitle}>{item.name}</Text>
            <Text style={styles.txtPrice}>${item.price}</Text>

            <View style={[stylesApp.flexRowCenter, stylesApp.mt4]}>
              {/* star rating */}
              <StarRating
                activeOpacity={1}
                rating={item.rate}
                starSize={14}
                starStyle={{marginRight: 2}}
                fullStarColor={colorTheme.primary}
                emptyStarColor={colorTheme.primary}
              />

              <Text style={styles.txtGrey}>{item.rate}</Text>
            </View>
          </View>

          {/* delete */}
          <Button
            type="clear"
            icon={<Icon type="font-awesome" name="trash" size={18} color={colorTheme.primary} />}
            containerStyle={styles.ctnButAction}
            onPress={() => this.onDelete(item)}
          />
        </View>
      </TouchableOpacity>
    );
  }

  renderEmptyItem() {
    // do not show anything when loading progress
    if (this.state.showLoading) {
      return null;
    }

    return (
      <View style={stylesApp.viewLoading}>
        <Text style={stylesApp.txtEmptyItem}>No products added yet</Text>
      </View>
    );
  }

  onItem(index) {
  }

  onDelete(product) {
    Alert.alert(
      'Are you sure you want to delete this product?',
      '',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'Yes', onPress: () => this.doDeleteProduct(product)},
      ],
      {cancelable: true},
    );
  }

  async doDeleteProduct(product) {
    try {
      await ApiService.deleteProduct(product.id);

      // remove product
      let products = this.state.products;

      let index = products.findIndex((p) => p.equalTo(product));
      if (index >= 0) {
        products.splice(index, 1);
        this.setState({products});
      }

      // remove from reducers
      index = this.props.ProductReducer.products.findIndex((p) => p.equalTo(product));
      if (index >= 0) {
        this.props.ProductReducer.products.splice(index, 1);
      }

      index = this.props.ProductReducer.myProducts.findIndex((p) => p.equalTo(product));
      if (index >= 0) {
        this.props.ProductReducer.myProducts.splice(index, 1);
      }

      Toast.show('Deleted the product successfully');
    } catch (e) {
      Alert.alert('Failed to Delete Product', e.message);
    }
  }

  onButAdd() {
    // go to add product page
    this.props.navigation.push(AddProduct.NAV_NAME);
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
      let products = await ApiService.getUserProducts(indexFrom, this.pageCount);

      if (indexFrom > 0) {
        // attach
        products = [...this.state.products, ...products];
      }

      this.props.setMyProducts(products);
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
      products: this.props.ProductReducer.myProducts,
    });
  }
}

const mapStateToProps = (state) => state;
const mapDispatchToProps = {
  setMyProducts,
};

export default connect(mapStateToProps, mapDispatchToProps)(Products);
