import React from 'react';
import {Text, View} from 'react-native';
import {styles as stylesMain} from '../styles';
import {styles} from './styles';
import {stylesApp, styleUtil} from '../../../styles/app.style';
import {Button} from 'react-native-elements';
import ScheduleSelect from '../ScheduleSelect';
import BookingMenu from '../../booking/booking-menu/BookingMenu';
import BookingDate from '../../booking/booking-date/BookingDate';
import {DanceHelper} from '../../../helpers/dance-helper';
import ActionSheet from 'react-native-actionsheet';

export default class ScheduleCheckout extends React.Component {
  static NAV_NAME = 'schedule-checkout';

  order = null;

  constructor(props) {
    super(props);

    props.navigation.setOptions({
      title: 'Summary',
    });

    // get parameter
    if (props.route.params) {
      this.order = props.route.params.order;
    }
  }

  render() {
    return (
      <View style={[stylesMain.viewContainer, stylesApp.justifyBetween]}>
        <View style={styles.viewContent}>
          <View style={styles.viewInfo}>
            <View style={styles.viewItem}>
              <Text style={styles.txtItemName}>Dance style:</Text>
              <Text style={styles.txtItemValue}>
                {DanceHelper.danceStyleNameByVal(this.order?.danceStyle)}
              </Text>
            </View>

            <View style={styles.viewItem}>
              <Text style={styles.txtItemName}>Dance Name:</Text>
              <Text style={styles.txtItemValue}>
                {DanceHelper.danceNameByVal(this.order?.dance, this.order?.danceStyle)}
              </Text>
            </View>

            <View style={styles.viewItem}>
              <Text style={styles.txtItemName}>Dance Level:</Text>
              <Text style={styles.txtItemValue}>
                {DanceHelper.danceLevelNameByVal(this.order?.danceLevel)}
              </Text>
            </View>

            <View style={styles.viewItem}>
              <Text style={styles.txtItemName}>Lesson Type:</Text>
              <Text style={styles.txtItemValue}>
                {DanceHelper.lessonTypeNameByVal(this.order?.lessonType)}
              </Text>
            </View>

            <View style={styles.viewItem}>
              <Text style={styles.txtItemName}>Date & Time:</Text>
              <Text style={styles.txtItemValue}>
                {this.order?.date}
                {'\n'}
                {this.order?.timeToString()}
              </Text>
            </View>
          </View>

          <View style={styles.viewContentFooter}>
            <Text style={styles.txtFee}>Fee for Purchase: $0</Text>

            <View style={styles.viewFeeDivider} />

            <View style={styles.viewTextTotal}>
              <Text style={styles.txtTotal}>Total :</Text>
              <Text style={styles.txtTotal}>${this.order?.teacher.price}</Text>
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
    if (index === 1) {
      // book lesson, go to payment

    } else if (index === 2) {
    } else if (index === 3) {
    }
  }
}
