import React from 'react';
import {FlatList, Text, TouchableOpacity, View} from 'react-native';
import {stylesApp, styleUtil} from '../../styles/app.style';
import {styles} from './styles';
import {styles as stylesProduct} from '../product-detail/styles';
import {Utils} from '../../helpers/utils';
import PostImage from '../../components/PostItem/PostImage';
import {Button} from 'react-native-elements';

export default class Cart extends React.Component {
  static NAV_NAME = 'cart';

  state = {
    // ui
    showLoading: false,

    // data
    products: [],
  };

  constructor(props) {
    super(props);

    props.navigation.setOptions({
      title: 'Cart',
    });
  }

  render() {
    return (
      <View style={stylesApp.viewContainer}>
        <FlatList
          contentContainerStyle={styles.listCtnContainer}
          keyExtractor={(item, index) => index.toString()}
          data={Utils.makeEmptyArray(4)}
          ListEmptyComponent={() => this.renderEmptyItem()}
          renderItem={({item, index}) => this.renderItem(item, index)}
          refreshing={this.state.showLoading}
        />

        {/* login */}
        <View style={[styleUtil.withShadow(), styles.viewButBuy]}>
          <Button
            title="BUY $230.2"
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
        <Text style={stylesApp.textEmptyItem}>No products in cart yet</Text>
      </View>
    );
  }

  renderItem(item, index) {
    return (
      <TouchableOpacity activeOpacity={0.7} onPress={() => this.onItem(index)}>
        <View style={styles.viewItem}>
          {/* photo */}
          <PostImage iconSize={64} imgUrl="" containerStyle={styles.imgItem} />

          <View style={styles.viewItemContent}>
            <View style={styles.viewTitle}>
              <Text style={styles.txtTitle}>FlexTek Shimmer Zip Bra top</Text>
            </View>

            <View style={styles.viewContentMain}>
              <View style={styles.viewPrice}>
                <Text style={styles.txtLabel}>Price:</Text>
                <Text style={styles.txtPrice}>$150.97</Text>
              </View>

              <View style={styles.viewQuantity}>
                <View style={stylesApp.flexRowCenter}>
                  {/* minus */}
                  <TouchableOpacity
                    onPress={() => this.onIncrementQuantity(index, -1)}>
                    <View
                      style={[
                        stylesProduct.butQuantity,
                        stylesProduct.butMinus,
                      ]}>
                      <Text style={stylesProduct.titleButMinus}>-</Text>
                    </View>
                  </TouchableOpacity>

                  <Text style={stylesProduct.txtQuantity}>1</Text>

                  {/* plus */}
                  <TouchableOpacity onPress={() => this.onIncrementQuantity(index, 1)}>
                    <View
                      style={[
                        stylesProduct.butQuantity,
                        stylesProduct.butPlus,
                      ]}>
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
                <Text style={{...styles.txtLabel, fontWeight: 'bold'}}>
                  Subtotal Price:
                </Text>
                <Text style={styles.txtPrice}>$150.97</Text>
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  onItem(index) {
    // go to product detail page
  }

  onRemove(index) {
  }

  onIncrementQuantity(index, increment) {
  }

  onButBuy() {
  }
}
