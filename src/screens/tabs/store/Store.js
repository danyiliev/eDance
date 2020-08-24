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

export default class Store extends React.Component {
  static NAV_NAME = 'store';

  pageCount = 20;

  state = {
    // ui
    showLoading: true,

    // data
    products: [],
  };

  componentDidMount(): void {
    this.loadData(true);
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
        <TouchableOpacity
          style={styles.viewItemMain}
          activeOpacity={0.8}
          onPress={() => this.onItem(item)}>
          <View>
            <PostImage
              iconSize={64}
              imgUrl=""
              containerStyle={styles.imgItem}
            />

            <View style={styles.viewItemContent}>
              {/* name */}
              <Text style={styles.txtItemTitle}>
                FlexTek Shimmer Zip Bra top
              </Text>

              <View style={styles.viewPrice}>
                <Text style={styles.txtGrey}>0 sold</Text>
                <Text style={styles.txtPrice}>$150</Text>
              </View>

              <View style={[styles.viewPrice, stylesApp.mt4]}>
                {/* star rating */}
                <StarRating
                  activeOpacity={1}
                  rating={0}
                  starSize={14}
                  starStyle={{marginRight: 2}}
                  fullStarColor={colorTheme.primary}
                  emptyStarColor={colorTheme.primary}
                />

                <Text style={styles.txtGrey}>0 reviews</Text>
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
        <Text style={stylesApp.textEmptyItem}>No products available yet</Text>
      </View>
    );
  }

  onRefresh() {
    this.loadData(true);
  }

  async loadData(continued = false) {
    await Utils.sleep(1000);

    this.setState({
      products: Utils.makeEmptyArray(20),
    });

    this.setState({
      showLoading: false,
    });
  }

  onEndReached() {
    // smaller than one page, no need to load again
    if (this.state.products.length < this.pageCount) {
      return;
    }

    this.loadData();
  }

  onItem(item) {
  }

  onButCart() {
  }
}
