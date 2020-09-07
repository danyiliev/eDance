import React from 'react';
import {FlatList, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {Button, Icon} from 'react-native-elements';
import {styles} from './styles';
import {colors as colorTheme} from '../../styles/theme.style';
import {stylesApp, styleUtil} from '../../styles/app.style';
import {styles as stylesCart} from '../cart/styles';
import Reviews from '../reviews/Reviews';
import AddChampionship from './AddChampionship';
import {setUserInfo} from '../../actions/user';
import {connect} from 'react-redux';
import {User} from '../../models/user.model';

class Championships extends React.Component {
  static NAV_NAME = 'championships';

  state = {
    showLoading: false,
    championships: [],
  };

  currentUser = null;

  constructor(props) {
    super(props);

    props.navigation.setOptions({
      title: 'World Championships',
    });
  }

  render() {
    return (
      <View style={stylesApp.viewContainer}>
        <FlatList
          contentContainerStyle={stylesCart.listCtnContainer}
          keyExtractor={(item, index) => index.toString()}
          data={[]}
          ListEmptyComponent={() => this.renderEmptyItem()}
          renderItem={({item, index}) => this.renderItem(item, index)}
          refreshing={this.state.showLoading}
        />

        {/* add */}
        {this.currentUser?.type === User.TYPE_TEACHER ? (
          <View style={[styleUtil.withShadow(), stylesCart.viewButBuy]}>
            <Button
              title="Create Championship"
              disabled={this.currentUser?.carts.length <= 0}
              disabledStyle={[stylesApp.butPrimary, stylesApp.semiTrans]}
              buttonStyle={stylesApp.butPrimary}
              titleStyle={stylesApp.titleButPrimary}
              onPress={() => this.onButCreate()}
            />
          </View>
        ) : null}
      </View>
    );
  }

  onButCreate() {
    // go to create page
    this.props.navigation.push(AddChampionship.NAV_NAME);
  }

  renderEmptyItem() {
    // do not show anything when loading progress
    if (this.state.showLoading) {
      return null;
    }

    return (
      <View style={stylesApp.viewLoading}>
        <Text style={stylesApp.txtEmptyItem}>No championships available yet</Text>
      </View>
    );
  }
}

const mapStateToProps = (state) => state;

export default connect(mapStateToProps, null)(Championships);

