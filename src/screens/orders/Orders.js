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

export default class Orders extends React.Component {
  static NAV_NAME = 'orders';

  state = {
    // ui
    showLoading: false,

    menuIndex: 0,
  };

  menus = ['Buyer', 'Seller'];

  constructor(props) {
    super(props);

    props.navigation.setOptions({
      title: 'Orders',
    });
  }

  render() {
    return (
      <View style={stylesApp.viewContainer}>
        <FlatList
          contentContainerStyle={styles.listCtnContainer}
          keyExtractor={(item, index) => index.toString()}
          data={Utils.makeEmptyArray(4)}
          ListHeaderComponent={() => this.renderHeader()}
          ListEmptyComponent={() => this.renderEmptyItem()}
          renderItem={({item, index}) => this.renderItem(item, index)}
          refreshing={this.state.showLoading}
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
        onPress={(index) => this.setState({menuIndex: index})}
      />
    );
  }

  renderItem(item, index) {
    return (
      <View>
        <View style={styles.viewHeader}>
          <Text style={styles.viewHeaderDate}>2020-03-23 08:33:22</Text>
          <Text style={styles.viewHeaderPrice}>$323.35</Text>
        </View>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => this.onItem(index)}>
          <View style={stylesCart.viewItem}>
            {/* photo */}
            <PostImage
              iconSize={64}
              imgUrl=""
              containerStyle={stylesCart.imgItem}
            />

            <View style={stylesCart.viewItemContent}>
              <View style={stylesCart.viewTitle}>
                <Text style={stylesCart.txtTitle}>FlexTek Shimmer Zip Bra top</Text>
              </View>

              <View style={stylesCart.viewContentMain}>
                <View style={styles.viewPrice}>
                  <View style={stylesApp.flexRowCenter}>
                    <Text style={stylesCart.txtLabel}>Price:</Text>
                    <Text style={stylesCart.txtPrice}>$150.97</Text>
                  </View>
                  <Text style={stylesCart.txtLabel}>&#215; 2</Text>
                </View>

                <View style={[stylesApp.flexRowCenter, stylesApp.mt4]}>
                  <Text style={{...stylesCart.txtLabel, fontWeight: 'bold'}}>
                    Subtotal Price:
                  </Text>
                  <Text style={stylesCart.txtPrice}>$150.97</Text>
                </View>
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
        <Text style={stylesApp.textEmptyItem}>No orders yet</Text>
      </View>
    );
  }
}
