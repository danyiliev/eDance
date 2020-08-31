import React from 'react';
import {Alert, Text, View} from 'react-native';
import {styles as stylesMain} from '../styles';
import {styles} from './styles';
import {stylesApp, styleUtil} from '../../../styles/app.style';
import {Button} from 'react-native-elements';
import ScheduleSelect from '../ScheduleSelect';
import BookingMenu from '../../booking/booking-menu/BookingMenu';
import BookingDate from '../../booking/booking-date/BookingDate';
import Lessons from '../../lessons/Lessons';
import {DanceHelper} from '../../../helpers/dance-helper';
import ActionSheet from 'react-native-actionsheet';
import RNPaypal from 'react-native-paypal-lib';
import {config} from '../../../helpers/config';
import {LoadingHUD} from 'react-native-hud-hybrid';
import Toast from 'react-native-simple-toast';
import {setUserInfo} from '../../../actions/user';
import {connect} from 'react-redux';
import {ApiService} from '../../../services';

class ScheduleCheckout extends React.Component {
  static NAV_NAME = 'schedule-checkout';

  currentUser = null;
  lesson = null;

  constructor(props) {
    super(props);

    props.navigation.setOptions({
      title: 'Summary',
    });

    this.currentUser = props.UserReducer.user;

    // get parameter
    if (props.route.params) {
      this.lesson = props.route.params.lesson;
    }

    this.loadingHUD = new LoadingHUD();
  }

  render() {
    return (
      <View style={[stylesMain.viewContainer, stylesApp.justifyBetween]}>
        <View style={styles.viewContent}>
          <View style={styles.viewInfo}>
            <View style={styles.viewItem}>
              <Text style={styles.txtItemName}>Dance style:</Text>
              <Text style={styles.txtItemValue}>
                {DanceHelper.danceStyleNameByVal(this.lesson?.danceStyle)}
              </Text>
            </View>

            <View style={styles.viewItem}>
              <Text style={styles.txtItemName}>Dance Name:</Text>
              <Text style={styles.txtItemValue}>
                {DanceHelper.danceNameByVal(this.lesson?.dance, this.lesson?.danceStyle)}
              </Text>
            </View>

            <View style={styles.viewItem}>
              <Text style={styles.txtItemName}>Dance Level:</Text>
              <Text style={styles.txtItemValue}>
                {DanceHelper.danceLevelNameByVal(this.lesson?.danceLevel)}
              </Text>
            </View>

            <View style={styles.viewItem}>
              <Text style={styles.txtItemName}>Lesson Type:</Text>
              <Text style={styles.txtItemValue}>
                {DanceHelper.lessonTypeNameByVal(this.lesson?.lessonType)}
              </Text>
            </View>

            <View style={styles.viewItem}>
              <Text style={styles.txtItemName}>Date & Time:</Text>
              <Text style={styles.txtItemValue}>
                {this.lesson?.date}
                {'\n'}
                {this.lesson?.timeToString()}
              </Text>
            </View>
          </View>

          <View style={styles.viewContentFooter}>
            <Text style={styles.txtFee}>Fee for Purchase: $0</Text>

            <View style={styles.viewFeeDivider} />

            <View style={styles.viewTextTotal}>
              <Text style={styles.txtTotal}>Total :</Text>
              <Text style={styles.txtTotal}>${this.lesson?.teacher.price}</Text>
            </View>
          </View>
        </View>

        <View style={styles.viewButNext}>
          <Button
            title="CHECKOUT"
            buttonStyle={stylesApp.butPrimary}
            titleStyle={stylesApp.titleButPrimary}
            onPress={() => this.onButCheckout()}
          />
        </View>

        <ActionSheet
          ref={(o) => (this.ActionSheet = o)}
          title={'Would you like to book this lesson?'}
          options={['Book Your Dance Lesson Here', 'Use Credits', 'Refer a Friend', 'Cancel']}
          cancelButtonIndex={3}
          destructiveButtonIndex={0}
          onPress={(index) => {
            this.onMoreItem(index);
          }}
        />
      </View>
    );
  }

  onButCheckout() {
    this.ActionSheet.show();
  }

  onMoreItem(index) {
    if (index === 0) {
      // book lesson, go to payment
      this.doPayment();
    } else if (index === 2) {
    } else if (index === 3) {
    }
  }

  async doPayment() {
    // show loading
    this.loadingHUD.show();

    //
    // payment
    //
    // try {
    //   const resp = await RNPaypal.paymentRequest({
    //     clientId: config.clientId,
    //     environment: RNPaypal.ENVIRONMENT.SANDBOX,
    //     intent: RNPaypal.INTENT.SALE,
    //     price: this.lesson?.teacher.price,
    //     currency: 'USD',
    //     description: `Dance Lesson of ${this.lesson?.teacher.getFullName()}`,
    //     acceptCreditCards: true,
    //   });
    //
    //   console.log(resp);
    //
    //   Toast.show('Payment Successful');
    // } catch (e) {
    //   console.log(e.code);
    //
    //   if (e.code === 'USER_CANCELLED') {
    //   } else {
    //     Alert.alert('Payment Failed', e.message);
    //   }
    //
    //   // hide loading
    //   this.loadingHUD.hideAll();
    //   return;
    // }

    // create lesson
    try {
      this.lesson.userId = this.currentUser.id;
      this.lesson.price = this.teacher?.price;

      const result = await ApiService.addLesson(this.lesson);
      this.lesson.id = result.id;

      if (this.currentUser.lessonsAttend) {
        this.currentUser.lessonsAttend.unshift(this.lesson);
      }

      // go to lessons page
      this.props.navigation.popToTop();
      this.props.navigation.push(Lessons.NAV_NAME);
    } catch (e) {
      console.log(e);

      Alert.alert('Failed to Create Lesson', e.message);
    }

    // hide loading
    this.loadingHUD.hideAll();
  }
}

const mapStateToProps = (state) => state;

const mapDispatchToProps = {
  setUserInfo,
};

export default connect(mapStateToProps, mapDispatchToProps)(ScheduleCheckout);
