import React from 'react';
import {FlatList, Text, TouchableOpacity, View} from 'react-native';
import {stylesApp} from '../../styles/app.style';
import {styles} from './styles';
import {Utils} from '../../helpers/utils';
import {styles as stylesCart} from '../cart/styles';
import PostImage from '../../components/PostItem/PostImage';
import SplashScreen from 'react-native-splash-screen';
import StarRating from 'react-native-star-rating';
import {colors as colorTheme} from '../../styles/theme.style';
import {Button, Icon} from 'react-native-elements';

export default class Products extends React.Component {
  static NAV_NAME = 'products';

  state = {
    // ui
    showLoading: false,
  };

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
            imgUrl=""
            containerStyle={stylesCart.imgItem}
          />

          <View style={stylesCart.viewItemContent}>
            <Text style={styles.txtTitle}>FlexTek Shimmer Zip Bra top</Text>
            <Text style={styles.txtPrice}>$150</Text>

            <View style={[stylesApp.flexRowCenter, stylesApp.mt4]}>
              {/* star rating */}
              <StarRating
                activeOpacity={1}
                rating={4}
                starSize={14}
                starStyle={{marginRight: 2}}
                fullStarColor={colorTheme.primary}
                emptyStarColor={colorTheme.primary}
              />

              <Text style={styles.txtGrey}>4.2</Text>
            </View>
          </View>

          {/* delete */}
          <Button
            type="clear"
            icon={
              <Icon
                type="font-awesome"
                name="trash"
                size={18}
                color={colorTheme.primary}
              />
            }
            containerStyle={styles.ctnButAction}
            onPress={() => this.onDelete(index)}
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
        <Text style={stylesApp.textEmptyItem}>No orders yet</Text>
      </View>
    );
  }

  onItem(index) {
  }

  onDelete(index) {
  }

  onButAdd() {
    // go to upload page
  }
}
