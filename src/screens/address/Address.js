import React from 'react';
import {setUserInfo} from '../../actions/user';
import {connect} from 'react-redux';
import {FlatList, Text, TouchableOpacity, View} from 'react-native';
import {stylesApp, styleUtil} from '../../styles/app.style';
import {Icon} from 'react-native-elements';
import AddProduct from '../add-product/AddProduct';
import {styles} from './styles';
import {Utils} from '../../helpers/utils';
import {colors as colorTheme} from '../../styles/theme.style';
import {styles as stylesCheckbox} from '../../components/CheckboxRound/styles';

class Address extends React.Component {
  static NAV_NAME = 'address';

  state = {
    selectedIndex: 0,
  };

  currentUser = null;

  constructor(props) {
    super(props);

    props.navigation.setOptions({
      title: 'Delivery Destination',
      headerRight: () => (
        <TouchableOpacity style={stylesApp.viewHeaderRight} onPress={() => this.onButAdd()}>
          <Icon type="ionicon" name="md-add" size={24} />
        </TouchableOpacity>
      ),
    });

    this.currentUser = props.UserReducer.user;
  }

  render() {
    return (
      <View style={stylesApp.viewContainer}>
        <FlatList
          contentContainerStyle={styles.listCtnContainer}
          keyExtractor={(item, index) => index.toString()}
          data={this.currentUser?.deliveryAddresses}
          ListEmptyComponent={() => this.renderEmptyItem()}
          renderItem={({item, index}) => this.renderItem(item, index)}
        />
      </View>
    );
  }

  renderItem(item, index) {
    const checked = index === this.state.selectedIndex;

    return (
      <TouchableOpacity activeOpacity={0.7} onPress={() => this.onItem(index)}>
        <View style={styles.viewItem}>
          <View style={styles.viewItemContent}>
            {/* title */}
            <Text style={styles.txtItemTitle}>SAVED LOCATION {index + 1}</Text>

            {/* address */}
            <Text style={styles.txtItemAddress}>
              asldkfj alskdfj alskdjf alsdkfja lsdkfjalsdkfjasdlkf
            </Text>

          </View>

          {/* select mark */}
          <View
            style={{
              ...styles.viewCheckIcon,
              backgroundColor: checked ? colorTheme.primary : colorTheme.lightGrey,
              ...(checked ? styleUtil.withShadow(6) : {}),
            }}>
            {checked ? (
              <Icon
                type="ionicon"
                name="md-checkmark"
                size={18}
                iconStyle={stylesCheckbox.icnCheck}
                color={colorTheme.light}
              />
            ) : null}
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  renderEmptyItem() {
    return (
      <View style={stylesApp.viewLoading}>
        <Text style={stylesApp.txtEmptyItem}>
          No delivery addresses added yet
        </Text>
      </View>
    );
  }

  onItem(index) {
    this.setState({selectedIndex: index});
  }

  onButAdd() {
    // go to add address page
    this.props.navigation.push(AddProduct.NAV_NAME);
  }
}

const mapStateToProps = (state) => state;
const mapDispatchToProps = {
  setUserInfo,
};

export default connect(mapStateToProps, mapDispatchToProps)(Address);
