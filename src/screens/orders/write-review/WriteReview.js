import React from 'react';
import {setUserInfo} from '../../../actions/user';
import {connect} from 'react-redux';
import {Text, View} from 'react-native';
import {stylesApp, styleUtil} from '../../../styles/app.style';
import {styles} from './styles';
import {colors as colorTheme} from '../../../styles/theme.style';
import StarRating from 'react-native-star-rating';
import PostImage from '../../../components/PostItem/PostImage';
import {styles as stylesAdd} from '../../add-post/styles';
import {Button, Input} from 'react-native-elements';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

class WriteReview extends React.Component {
  static NAV_NAME = 'write-review';

  state = {
    rating: 0,
    review: '',
  };

  constructor(props) {
    super(props);

    props.navigation.setOptions({
      title: 'Write Review',
    });
  }

  render() {
    return (
      <KeyboardAwareScrollView
        style={stylesApp.viewContainer}
        bounces={false}>
        <View style={styles.viewContainer}>
          <View style={styles.viewReview}>
            <View style={styles.viewReviewContent}>
              <Text style={styles.txtTitle}>Write Review</Text>
              <Text style={styles.txtName}>Shimmer Zip Front Bra Top | FlexTek ®</Text>
              <Text style={styles.txtDesc}>
                Your feedback will help other shoppers make good choices, and
                we’ll use it to improve our products.
              </Text>
              <Text style={styles.txtRating}>Overall Rating</Text>

              <StarRating
                rating={this.state.rating}
                starSize={24}
                containerStyle={{alignSelf: 'flex-start'}}
                starStyle={{marginRight: 12}}
                fullStarColor={colorTheme.primary}
                emptyStarColor={colorTheme.primary}
                selectedStar={(rating) => this.setState({rating})}
              />
            </View>

            <View style={styles.viewReviewImage}>
              <PostImage
                iconSize={64}
                imgUrl=""
                containerStyle={styles.imgItem}
              />
            </View>
          </View>

          <View style={styles.viewReviewText}>
            <View style={[stylesAdd.viewItem, stylesAdd.viewInput]}>
              <Input
                containerStyle={stylesAdd.ctnInput}
                inputContainerStyle={stylesApp.input}
                inputStyle={stylesAdd.txtInput}
                placeholder="Enter review here"
                multiline
                value={this.state.desc}
                onChangeText={(review) => {
                  this.setState({review});
                }}
                renderErrorMessage={false}
              />
            </View>
          </View>

          {/* save */}
          <View style={[styleUtil.withShadow(), stylesAdd.viewButSave]}>
            <Button
              title="SAVE"
              buttonStyle={stylesApp.butPrimary}
              titleStyle={stylesApp.titleButPrimary}
              onPress={() => this.onButSave()}
            />
          </View>
        </View>
      </KeyboardAwareScrollView>
    );
  }
}

const mapStateToProps = (state) => state;

export default connect(mapStateToProps, null)(WriteReview);
