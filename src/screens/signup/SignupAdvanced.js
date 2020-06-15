import React from 'react';
import DismissKeyboard from '../../components/DismissKeyboard/DismissKeyboard';
import ContentWithBackground from '../../components/ContentWithBackground/ContentWithBackground';
import {View, TouchableOpacity, Text} from 'react-native';
import {styles} from './styles';
import {Button, ButtonGroup, Input} from 'react-native-elements';
import {styles as stylesLogin} from '../login/styles';
import {colors as colorTheme} from '../../styles/theme.style';
import {stylesApp, styleUtil} from '../../styles/app.style';
import ImageScale from 'react-native-scalable-image';
import SelectPicker from '../../components/SelectPicker/SelectPicker';
import { Picker } from '@react-native-community/picker';
import {STATES} from '../../constants/constant-data';
import {setUserInfo} from '../../actions/user';
import {connect} from 'react-redux';
import {User} from '../../models/user.model';

class SignupAdvanced extends React.Component {
  static NAV_NAME = 'signup-advanced';

  state = {
    // ui
    showStatePicker: false,
    stateSelected: '', // for iOS only

    // data
    genderIndex: 0,

    state: '',
    city: '',
    zipCode: '',
  };

  genders = ['Male', 'Female'];

  constructor(props) {
    super(props);

    props.navigation.setOptions({
      title: 'Registration',
    });
  }

  render() {
    return (
      <DismissKeyboard
        ref={(view) => {
          this.keyboardView = view;
        }}>
        <ContentWithBackground>
          <View style={styles.viewContainer}>
            <View style={styles.viewTop}>
              {/* gender */}
              <View style={styles.viewForm}>
                <Text style={styles.txtItemTitle}>
                  Gender
                </Text>

                <ButtonGroup
                  containerStyle={styles.ctnSegmentGender}
                  buttons={this.genders}
                  textStyle={styles.txtSegment}
                  innerBorderStyle={styles.borderSegment}
                  selectedButtonStyle={styles.butSegmentSelected}
                  selectedTextStyle={styles.SegmentSelected}
                  selectedIndex={this.state.genderIndex}
                  onPress={(index) => this.setState({genderIndex: index})}>
                </ButtonGroup>
              </View>
            </View>

            {/* form info */}
            <View style={styles.viewForm}>
              {/* state select */}
              <View style={[styles.viewInputSelect, stylesLogin.inputCtn]}>
                <TouchableOpacity
                  onPress={() => this.setState({showStatePicker: true})}>
                  <View style={styles.viewInputSelectContainer}>
                    {/* text */}
                    <Text style={stylesLogin.input}>
                      {this.state.state ? this.state.state : 'State'}
                    </Text>

                    {/* icon */}
                    <ImageScale
                      width={14}
                      source={require('../../../assets/imgs/ic_input_state.png')}
                    />
                  </View>
                </TouchableOpacity>
              </View>

              {/* city */}
              <Input
                containerStyle={[stylesLogin.ctnInput, stylesApp.mt4]}
                returnKeyType="next"
                placeholder="City"
                placeholderTextColor={colorTheme.primary}
                inputStyle={stylesLogin.input}
                inputContainerStyle={stylesLogin.inputCtn}
                blurOnSubmit={false}
                value={this.state.email}
                onChangeText={(city) => {
                  this.setState({city});
                }}
                onSubmitEditing={() => {
                  this.inputZipCode.focus();
                }}
                renderErrorMessage={false}
                rightIcon={
                  <ImageScale
                    width={14}
                    source={require('../../../assets/imgs/ic_input_city.png')}
                  />
                }
                onFocus={() => this.onFocusCity()}
              />

              {/* zip code */}
              <Input
                ref={(input) => {
                  this.inputZipCode = input;
                }}
                containerStyle={stylesLogin.ctnInput}
                keyboardType={'number-pad'}
                returnKeyType="go"
                placeholder="ZIP Code"
                placeholderTextColor={colorTheme.primary}
                inputStyle={stylesLogin.input}
                inputContainerStyle={stylesLogin.inputCtn}
                blurOnSubmit={false}
                value={this.state.firstName}
                onChangeText={(zipCode) => {
                  this.setState({zipCode});
                }}
                onFocus={() => this.onFocusZip()}
                renderErrorMessage={false}
                rightIcon={
                  <ImageScale
                    width={14}
                    source={require('../../../assets/imgs/ic_input_zipcode.png')}
                  />
                }
              />
            </View>

            {/* next */}
            <View style={[styleUtil.withShadow(), styles.viewButNext]}>
              <Button
                title="REGISTER"
                buttonStyle={stylesApp.butPrimary}
                titleStyle={stylesApp.titleButPrimary}
                onPress={() => this.onButSignup()}
              />
            </View>

            {this.renderSelectStatePicker()}
          </View>
        </ContentWithBackground>
      </DismissKeyboard>
    );
  }

  renderSelectStatePicker() {
    return (
      <SelectPicker
        isVisible={this.state.showStatePicker}
        contentStyle={styles.picker}
        onDismiss={done => this.dismissState(done)}
      >
        <Picker
          selectedValue={
            Platform.OS === 'ios'
              ? this.state.stateSelected
              : this.state.state
          }
          onValueChange={(itemValue, itemIndex) => {
            if (Platform.OS === 'ios') {
              this.setState({
                stateSelected: itemValue,
              });
            } else {
              this.setState({
                state: itemValue,
              });
            }
          }}
        >
          {STATES.map((s, i) => {
            return <Picker.Item key={i.toString()} label={s.Name} value={s.value} />;
          })}
        </Picker>
      </SelectPicker>
    );
  }

  onButSignup() {
    this.props.setUserInfo(new User());
  }

  onFocusZip() {
    this.keyboardView.moveMainView(30);
  }
  onFocusCity() {
    this.keyboardView.moveMainView(20);
  }

  /**
   * state select picker
   */
  dismissState(done) {
    this.setState({
      showStatePicker: false,
    });

    let { stateSelected } = this.state;
    if (!stateSelected) {
      // default is the first one
      stateSelected = STATES[0].value;
    }

    // update date value based on done/canceled
    if (done) {
      this.setState({
        state: stateSelected,
      });
    } else {
      this.setState({
        stateSelected: this.state.state,
      });
    }
  }
}

const mapStateToProps = state => state;

const mapDispatchToProps = {
  setUserInfo,
};

export default connect(mapStateToProps, mapDispatchToProps)(SignupAdvanced);
