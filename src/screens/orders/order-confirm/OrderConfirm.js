import React from 'react';
import {setUserInfo} from '../../../actions/user';
import {connect} from 'react-redux';
import {LoadingHUD} from 'react-native-hud-hybrid';
import {stylesApp, styleUtil} from '../../../styles/app.style';
import {styles} from './styles';
import {FlatList, Text, TouchableOpacity, View} from 'react-native';
import PostImage from '../../../components/PostItem/PostImage';
import {PostHelper} from '../../../helpers/post-helper';
import {styles as stylesProduct} from '../../product-detail/styles';
import {styles as stylesCart} from '../../cart/styles';
import {Button} from 'react-native-elements';
import ProductDetail from '../../product-detail/ProductDetail';

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
          <Text style={styles.txtHeaderItem}> asdlkj asldkfj lakjsdf alkjsdf</Text>
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
          <Text style={styles.txtPrice}>$223</Text>
        </View>

        {/* save */}
        <View style={[styleUtil.withShadow(), styles.viewButProceed]}>
          <Button
            title="Proceed"
            buttonStyle={stylesApp.butPrimary}
            titleStyle={stylesApp.titleButPrimary}
            onPress={() => this.onButSave()}
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
}


const mapStateToProps = (state) => state;
const mapDispatchToProps = {
  setUserInfo,
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderConfirm);
