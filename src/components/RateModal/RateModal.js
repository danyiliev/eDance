import React from 'react';
import Modal from 'react-native-modal';
import PropTypes from 'prop-types';
import {KeyboardAvoidingView, Platform, Text, View} from 'react-native';
import DismissKeyboard from '../DismissKeyboard/DismissKeyboard';
import {styles} from './styles';
import FastImage from 'react-native-fast-image';
import {UserHelper} from '../../helpers/user-helper';
import {stylesApp, styleUtil} from '../../styles/app.style';
import {colors as colorTheme} from '../../styles/theme.style';
import StarRating from 'react-native-star-rating';
import {styles as stylesAdd} from '../../screens/add-post/styles';
import {Button, Input} from 'react-native-elements';

export default class RateModal extends React.Component {
  static propTypes = {
    visible: PropTypes.bool,
  };

  state = {
    rating: 0,
    review: '',
  };

  render() {
    return (
      <Modal isVisible={this.props.visible}>
        <KeyboardAvoidingView
          behavior={'padding'}
          enabled={Platform.OS === 'android'}>
          <DismissKeyboard
            fullHeight={false}
            ref={(view) => {
              this.keyboardView = view;
            }}>
            <View style={styles.viewMain}>
              {/* user */}
              <View style={styles.viewUser}>
                <FastImage
                  style={styles.imgUser}
                  source={UserHelper.getUserImage()}
                  resizeMode={FastImage.resizeMode.cover}
                />
                <Text style={styles.txtUserName}>
                  Teacher Name
                </Text>
              </View>

              <StarRating
                rating={this.state.rating}
                starSize={36}
                containerStyle={styles.ctnRating}
                starStyle={{marginRight: 10}}
                fullStarColor={colorTheme.primary}
                emptyStarColor={colorTheme.primary}
                selectedStar={(rating) => this.setState({rating})}
              />

              <View style={styles.viewReview}>
                <Input
                  containerStyle={stylesAdd.ctnInput}
                  inputContainerStyle={stylesApp.input}
                  inputStyle={styles.txtInput}
                  placeholder="Enter review here"
                  multiline
                  value={this.state.desc}
                  onChangeText={(review) => {
                    this.setState({review});
                  }}
                  renderErrorMessage={false}
                  onFocus={() => this.onFocusReview()}
                />
              </View>

              <View style={[styleUtil.withShadow(), styles.viewButSave]}>
                <Button
                  title="Save"
                  buttonStyle={stylesApp.butPrimary}
                  titleStyle={stylesApp.titleButPrimary}
                  onPress={() => this.onButSave()}
                />
              </View>
            </View>
          </DismissKeyboard>
        </KeyboardAvoidingView>
      </Modal>
    );
  }

  onFocusReview() {
    this.keyboardView.moveMainView(120);
  }

  onButSave() {

  }
}
