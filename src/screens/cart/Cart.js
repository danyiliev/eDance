import React from 'react';
import {FlatList, Text, TouchableOpacity, View, Alert} from 'react-native';
import {stylesApp, styleUtil} from '../../styles/app.style';
import {styles} from './styles';
import {styles as stylesProduct} from '../product-detail/styles';
import {Utils} from '../../helpers/utils';
import PostImage from '../../components/PostItem/PostImage';
import {Button} from 'react-native-elements';
import {setUserInfo} from '../../actions/user';
import {connect} from 'react-redux';
import {PostHelper} from '../../helpers/post-helper';
import {ApiService} from '../../services';
import {UserHelper} from '../../helpers/user-helper';
import ProductDetail from '../product-detail/ProductDetail';
import Address from '../address/Address';

class Cart extends React.Component {
  static NAV_NAME = 'cart';

  state = {
    // ui
    showLoading: false,

    reloadData: true,
  };

  currentUser = null;

  constructor(props) {
    super(props);

    props.navigation.setOptions({
      title: 'Cart',
    });

    this.currentUser = props.UserReducer.user;
  }

  render() {
    let priceTotal = this.currentUser?.getTotalPrice();

    return (
      <View style={stylesApp.viewContainer}>
        <FlatList
          contentContainerStyle={styles.listCtnContainer}
          keyExtractor={(item, index) => index.toString()}
          data={this.currentUser?.carts}
          ListEmptyComponent={() => this.renderEmptyItem()}
          renderItem={({item, index}) => this.renderItem(item, index)}
          refreshing={this.state.showLoading}
        />

        {/* login */}
        <View style={[styleUtil.withShadow(), styles.viewButBuy]}>
          <Button
            title={`BUY ${priceTotal > 0 ? '$' + priceTotal : ''}`}
            disabled={this.currentUser?.carts.length <= 0}
            disabledStyle={[stylesApp.butPrimary, stylesApp.semiTrans]}
            buttonStyle={stylesApp.butPrimary}
            titleStyle={stylesApp.titleButPrimary}
            onPress={() => this.onButBuy()}
          />
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
        <Text style={stylesApp.txtEmptyItem}>No products in cart yet</Text>
      </View>
    );
  }

  renderItem(item, index) {
    return (
      <TouchableOpacity activeOpacity={0.7} onPress={() => this.onItem(index)}>
        <View style={styles.viewItem}>
          {/* photo */}
          <PostImage
            iconSize={64}
            imgUrl={PostHelper.imageUrl(item.photos[0])}
            containerStyle={styles.imgItem}
          />

          <View style={styles.viewItemContent}>
            <View style={styles.viewTitle}>
              <Text style={styles.txtTitle}>{item.name}</Text>
            </View>

            <View style={styles.viewContentMain}>
              <View style={styles.viewPrice}>
                <Text style={styles.txtLabel}>Price:</Text>
                <Text style={styles.txtPrice}>${item.price}</Text>
              </View>

              <View style={styles.viewQuantity}>
                <View style={stylesApp.flexRowCenter}>
                  {/* minus */}
                  <TouchableOpacity onPress={() => this.onIncrementQuantity(index, -1)}>
                    <View style={[stylesProduct.butQuantity, stylesProduct.butMinus]}>
                      <Text style={stylesProduct.titleButMinus}>-</Text>
                    </View>
                  </TouchableOpacity>

                  <Text style={stylesProduct.txtQuantity}>{item.quantity}</Text>

                  {/* plus */}
                  <TouchableOpacity onPress={() => this.onIncrementQuantity(index, 1)}>
                    <View style={[stylesProduct.butQuantity, stylesProduct.butPlus]}>
                      <Text style={stylesProduct.titleButPlus}>+</Text>
                    </View>
                  </TouchableOpacity>
                </View>

                <Button
                  type="clear"
                  title="Remove"
                  titleStyle={styles.titleButRemove}
                  onPress={() => this.onRemove(index)}
                />
              </View>

              <View style={[stylesApp.flexRowCenter, stylesApp.mt4]}>
                <Text style={{...styles.txtLabel, fontWeight: 'bold'}}>Subtotal Price:</Text>
                <Text style={styles.txtPrice}>${item.price * item.quantity}</Text>
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  onItem(index) {
    // go to product detail page
    this.props.navigation.push(ProductDetail.NAV_NAME, {
      product: this.currentUser?.carts[index],
      fromCart: true,
    });
  }

  onRemove(index) {
    Alert.alert(
      'Are you sure to remove this item?',
      '',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'Yes', onPress: () => this.doDeleteItem(index)},
      ],
      {cancelable: true},
    );
  }

  doDeleteItem(index) {
    // remove from db
    ApiService.removeProductFromCart(this.currentUser?.carts[index]);

    // remove from user object
    this.currentUser?.carts.splice(index, 1);
    UserHelper.saveUserToLocalStorage(this.currentUser, this.props);
  }

  onIncrementQuantity(index, increment) {
    this.currentUser.carts[index].quantity = Math.max(this.currentUser.carts[index].quantity + increment, 1);

    this.setState({reloadData: true});
  }

  onButBuy() {
    this.props.navigation.push(Address.NAV_NAME);
  }
}

const mapStateToProps = (state) => state;
const mapDispatchToProps = {
  setUserInfo,
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
