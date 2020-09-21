import React from 'react';
import {setUserInfo} from '../../../actions/user';
import {connect} from 'react-redux';
import {LoadingHUD} from 'react-native-hud-hybrid';
import {stylesApp, styleUtil} from '../../../styles/app.style';
import {styles} from './styles';
import {Alert, FlatList, Text, TouchableOpacity, View} from 'react-native';
import PostImage from '../../../components/PostItem/PostImage';
import {PostHelper} from '../../../helpers/post-helper';
import {styles as stylesProduct} from '../../product-detail/styles';
import {styles as stylesCart} from '../../cart/styles';
import {Button} from 'react-native-elements';
import ProductDetail from '../../product-detail/ProductDetail';
import {ApiService} from '../../../services';
import Orders from '../Orders';
import {UserHelper} from '../../../helpers/user-helper';
import stripe from 'tipsi-stripe';
import Toast from 'react-native-simple-toast';

class OrderConfirm extends React.Component {
  static NAV_NAME = 'order-confirm';

  currentUser = null;
  address = '';

  constructor(props) {
    super(props);

    props.navigation.setOptions({
      title: 'Order Confirm',
    });

    this.currentUser = props.UserReducer.user;
    this.loadingHUD = new LoadingHUD();

    // get address
    if (props.route.params) {
      const addrIndex = props.route.params.addressIndex;
      if (addrIndex >= 0) {
        this.address = this.currentUser?.deliveryAddresses[addrIndex].getFullAddress();
      }
    }
  }

  render() {
    return (
      <View style={stylesApp.viewContainer}>
        <FlatList
          contentContainerStyle={styles.listCtnContainer}
          data={this.currentUser?.carts}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item, index}) => this.renderItem(item, index)}
          ListHeaderComponent={() => this.renderHeader()}
          ListFooterComponent={() => this.renderFooter()}
        />
      </View>
    );
  }

  renderHeader() {
    return (
      <View style={styles.viewHeader}>
        {/* order info */}
        <View style={styles.viewHeaderItem}>
          <Text style={styles.txtLabel}>Address: </Text>
          <Text style={styles.txtHeaderItem}>{this.address}</Text>
        </View>
      </View>
    );
  }

  renderItem(item, index) {
    return (
      <TouchableOpacity activeOpacity={0.7} onPress={() => this.onItem(index)}>
        <View style={stylesCart.viewItem}>
          {/* photo */}
          <PostImage
            iconSize={64}
            imgUrl={PostHelper.imageUrl(item.photos[0])}
            containerStyle={stylesCart.imgItem}
          />

          <View style={stylesCart.viewItemContent}>
            <View style={stylesCart.viewTitle}>
              <Text style={stylesCart.txtTitle}>{item.name}</Text>
            </View>

            <View style={stylesCart.viewContentMain}>
              <View style={stylesCart.viewPrice}>
                <Text style={stylesCart.txtLabel}>Price:</Text>
                <Text style={stylesCart.txtPrice}>${item.price}</Text>
                <Text style={styles.txtQuantity}>&#215; {item.quantity}</Text>
              </View>

              <View style={[stylesApp.flexRowCenter, stylesApp.mt4]}>
                <Text style={{...styles.txtLabel, fontWeight: 'bold'}}>Subtotal Price:</Text>
                <Text style={stylesCart.txtPrice}>${item.price * item.quantity}</Text>
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  renderFooter() {
    return (
      <View style={styles.viewHeader}>
        {/* order info */}
        <View style={styles.viewFooterItem}>
          <Text style={styles.txtLabelLarge}>Total Price: </Text>
          <Text style={styles.txtPrice}>${this.currentUser?.getTotalPrice()}</Text>
        </View>

        {/* save */}
        <View style={[styleUtil.withShadow(), styles.viewButProceed]}>
          <Button
            title="Proceed"
            buttonStyle={stylesApp.butPrimary}
            titleStyle={stylesApp.titleButPrimary}
            onPress={() => this.onButProceed()}
          />
        </View>
      </View>
    );
  }

  onItem(index) {
    // go to product detail page
    this.props.navigation.push(ProductDetail.NAV_NAME, {
      product: this.currentUser?.carts[index],
      fromCart: true,
    });
  }

  async onButProceed() {
    try {
      // payment
      let stripeTokenInfo = await stripe.paymentRequestWithCardForm();
      console.log(stripeTokenInfo);

      // token
      let tokenId = stripeTokenInfo.tokenId;

      this.createCharge(tokenId);
    } catch (e) {
      console.log(e.code);

      if (e.code !== 'cancelled') {
        Alert.alert('Payment Failed', e.message);
      }
    }
  }

  async createCharge(token) {
    // show loading
    this.loadingHUD.show();

    try {
      let response = await ApiService.stripeCreateCharge(
        token,
        this.currentUser?.getTotalPrice(),
        'Purchase store items',
      );

      Toast.show('Payment is successful');

      // make order
      await this.makeOrder();
    } catch (e) {
      console.log(e);

      Alert.alert('Payment Failed', e.message);
    }

    // hide loading
    this.loadingHUD.hideAll();
  }

  async makeOrder() {
    this.loadingHUD.show();

    try {
      // make order
      await ApiService.makeOrder(this.currentUser?.getTotalPrice(), this.currentUser?.carts, this.address);

      // clear carts
      ApiService.clearCart();

      this.currentUser.carts = [];
      UserHelper.saveUserToLocalStorage(this.currentUser, this.props);

      // go to orders page
      this.props.navigation.popToTop();
      this.props.navigation.navigate(Orders.NAV_NAME);
    } catch (err) {
      console.log(err);

      Alert.alert('Failed to Make Order', err.message);
    }

    // hide loading
    this.loadingHUD.hideAll();
  }
}

const mapStateToProps = (state) => state;
const mapDispatchToProps = {
  setUserInfo,
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderConfirm);
