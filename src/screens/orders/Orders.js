import React from 'react';
import {FlatList, Text, TouchableOpacity, View} from 'react-native';
import {stylesApp} from '../../styles/app.style';
import {styles} from './styles';
import {styles as stylesCart} from '../cart/styles';
import {Utils} from '../../helpers/utils';
import {User} from '../../models/user.model';
import {styles as stylesSignup} from '../signup/styles';
import {ButtonGroup} from 'react-native-elements';
import PostImage from '../../components/PostItem/PostImage';
import {ApiService} from '../../services';
import {connect} from 'react-redux';
import {PostHelper} from '../../helpers/post-helper';
import OrderConfirm from './order-confirm/OrderConfirm';
import WriteReview from './write-review/WriteReview';

class Orders extends React.Component {
  static NAV_NAME = 'orders';

  state = {
    // ui
    showLoading: false,
    menuIndex: 0,

    // data
    orders: [],
  };

  currentUser = null;

  menus = ['Buyer', 'Seller'];
  pageCount = 20;

  constructor(props) {
    super(props);

    props.navigation.setOptions({
      title: 'Orders',
    });

    this.currentUser = props.UserReducer.user;
  }

  componentDidMount(): void {
    this.onChangeTab(0);
  }

  render() {
    return (
      <View style={stylesApp.viewContainer}>
        {this.renderHeader()}

        <FlatList
          contentContainerStyle={styles.listCtnContainer}
          keyExtractor={(item, index) => index.toString()}
          data={this.state.orders}
          ListEmptyComponent={() => this.renderEmptyItem()}
          renderItem={({item, index}) => this.renderItem(item, index)}
          refreshing={this.state.showLoading}
          onRefresh={() => this.loadData()}
        />
      </View>
    );
  }

  renderHeader() {
    return (
      <ButtonGroup
        containerStyle={styles.ctnSegment}
        buttons={this.menus}
        textStyle={stylesSignup.txtSegment}
        innerBorderStyle={stylesSignup.borderSegment}
        selectedButtonStyle={stylesSignup.butSegmentSelected}
        selectedTextStyle={stylesSignup.SegmentSelected}
        selectedIndex={this.state.menuIndex}
        onPress={(index) => this.onChangeTab(index)}
      />
    );
  }

  renderItem(item, index) {
    return (
      <View>
        <View style={styles.viewHeader}>
          <Text style={styles.viewHeaderDate}>{item.createdAtStr()}</Text>
          <Text style={styles.viewHeaderPrice}>${item.amount}</Text>
        </View>
        {item.products.map((p, i) => {
          return (
            <TouchableOpacity
              key={index.toString()}
              activeOpacity={0.7}
              onPress={() => this.onItem(item, i)}>
              <View style={stylesCart.viewItem}>
                {/* photo */}
                <PostImage
                  iconSize={64}
                  imgUrl={PostHelper.imageUrl(p.photos[0])}
                  containerStyle={stylesCart.imgItem}
                />

                <View style={stylesCart.viewItemContent}>
                  <View style={stylesCart.viewTitle}>
                    <Text style={stylesCart.txtTitle}>{p.name}</Text>
                  </View>

                  <View style={stylesCart.viewContentMain}>
                    <View style={styles.viewPrice}>
                      <View style={stylesApp.flexRowCenter}>
                        <Text style={stylesCart.txtLabel}>Price:</Text>
                        <Text style={stylesCart.txtPrice}>${p.price}</Text>
                      </View>
                      <Text style={stylesCart.txtLabel}>&#215; {p.quantity}</Text>
                    </View>

                    <View style={[stylesApp.flexRowCenter, stylesApp.mt4]}>
                      <Text style={{...stylesCart.txtLabel, fontWeight: 'bold'}}>Subtotal Price:</Text>
                      <Text style={stylesCart.txtPrice}>${p.price * p.quantity}</Text>
                    </View>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          );
        })}
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
        <Text style={stylesApp.txtEmptyItem}>No orders yet</Text>
      </View>
    );
  }

  async onChangeTab(index) {
    try {
      await this.setState({menuIndex: index});

      this.loadData();
    } catch (e) {
      console.log(e);
    }
  }

  async loadData(continued = false) {
    let indexFrom = 0;

    if (!continued) {
      // show loading mark
      this.setState({
        showLoading: true,
      });
    } else {
      indexFrom = this.state.orders.length;
    }

    try {
      let orders = await ApiService.getOrders(
        this.currentUser.id,
        this.state.menuIndex === 0 ? 1 : 0,
        indexFrom,
        this.pageCount,
      );

      if (indexFrom > 0) {
        // attach
        orders = [...this.state.orders, ...orders];
      }

      this.setState({orders});
    } catch (e) {
      console.log(e);
    }

    this.setState({
      showLoading: false,
    });
  }

  onItem(order, productIndex) {
    if (this.state.menuIndex === 1) {
      return;
    }

    // go to write review
    this.props.navigation.push(WriteReview.NAV_NAME, {
      product: order.products[productIndex],
    });
  }
}

const mapStateToProps = (state) => state;

export default connect(mapStateToProps, null)(Orders);
