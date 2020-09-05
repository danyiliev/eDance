import React from 'react';
import {setUserInfo} from '../../actions/user';
import {connect} from 'react-redux';
import DismissKeyboard from '../../components/DismissKeyboard/DismissKeyboard';
import {Text, TouchableOpacity, View} from 'react-native';
import {styles} from '../profile/edit-profile/styles';
import ContentWithBackground from '../../components/ContentWithBackground/ContentWithBackground';
import {Button, Input} from 'react-native-elements';
import {styles as stylesLogin} from '../login/styles';
import {stylesApp, styleUtil} from '../../styles/app.style';
import {colors as colorTheme} from '../../styles/theme.style';
import ImageScale from 'react-native-scalable-image';
import {styles as stylesSignup} from '../signup/styles';
import {UserHelper} from '../../helpers/user-helper';

class AddressDetail extends React.Component {
  static NAV_NAME = 'address-detail';

  state = {
    stateSelected: '',
    stateDone: '',
    showStatePicker: false,

    building: '',
    street: '',
    city: '',
    state: '',
  };

  currentUser = null;

  constructor(props) {
    super(props);

    props.navigation.setOptions({
      title: 'New Delivery Address',
    });

    this.currentUser = props.UserReducer.user;
  }

  render() {
    return (
      <DismissKeyboard>
        <ContentWithBackground>
          <View style={styles.viewContainer}>
            <View style={styles.viewForm}>
              {/* building */}
              <Input
                containerStyle={[stylesLogin.ctnInput, stylesApp.mt4]}
                returnKeyType="next"
                placeholder="Flat/House No/Floor/Building"
                placeholderTextColor={colorTheme.primary}
                inputStyle={styles.input}
                inputContainerStyle={stylesLogin.inputCtn}
                value={this.state.building}
                onChangeText={(building) => {
                  this.setState({building});
                }}
                blurOnSubmit={false}
                onSubmitEditing={() => {
                  this.inputStreet.focus();
                }}
                renderErrorMessage={false}
              />

              {/* street */}
              <Input
                ref={(input) => {
                  this.inputStreet = input;
                }}
                containerStyle={[stylesLogin.ctnInput, stylesApp.mt4]}
                returnKeyType="next"
                placeholder="Street"
                placeholderTextColor={colorTheme.primary}
                inputStyle={styles.input}
                inputContainerStyle={stylesLogin.inputCtn}
                value={this.state.building}
                onChangeText={(street) => {
                  this.setState({street});
                }}
                renderErrorMessage={false}
                blurOnSubmit={false}
                onSubmitEditing={() => {
                  this.inputCity.focus();
                }}
              />

              {/* city */}
              <Input
                ref={(input) => {
                  this.inputCity = input;
                }}
                containerStyle={[stylesLogin.ctnInput, stylesApp.mt4]}
                returnKeyType="next"
                placeholder="City"
                placeholderTextColor={colorTheme.primary}
                inputStyle={styles.input}
                inputContainerStyle={stylesLogin.inputCtn}
                value={this.state.building}
                onChangeText={(city) => {
                  this.setState({city});
                }}
                renderErrorMessage={false}
                rightIconContainerStyle={styles.ctnInputIcon}
                rightIcon={
                  <ImageScale width={14} source={require('../../../assets/imgs/ic_input_city.png')} />
                }
              />

              {/* state select */}
              <View style={[stylesSignup.viewInputSelect, stylesLogin.inputCtn, stylesApp.mt4]}>
                <TouchableOpacity onPress={() => this.setState({showStatePicker: true})}>
                  <View style={stylesSignup.viewInputSelectContainer}>
                    {/* text */}
                    <Text style={stylesLogin.input}>{this.state.state ? this.state.state : 'State'}</Text>

                    {/* icon */}
                    <ImageScale width={14} source={require('../../../assets/imgs/ic_input_state.png')} />
                  </View>
                </TouchableOpacity>
              </View>
            </View>

            {/* save */}
            <View style={[styleUtil.withShadow(), styles.viewButSave]}>
              <Button
                title="SAVE"
                buttonStyle={stylesApp.butPrimary}
                titleStyle={stylesApp.titleButPrimary}
                onPress={() => this.onButSave()}
              />
            </View>

            {UserHelper.getInstance().renderSelectStatePicker(this)}
          </View>
        </ContentWithBackground>
      </DismissKeyboard>
    );
  }
}

const mapStateToProps = (state) => state;
const mapDispatchToProps = {
  setUserInfo,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddressDetail);
