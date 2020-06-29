import React from 'react';
import {Text, View} from 'react-native';
import {styles as stylesMain} from '../styles';
import {styles} from './styles';
import {stylesApp, styleUtil} from '../../../styles/app.style';
import {Button} from 'react-native-elements';
import ScheduleSelect from '../ScheduleSelect';
import BookingMenu from '../../booking/booking-menu/BookingMenu';

export default class ScheduleCheckout extends React.Component {
  static NAV_NAME = 'schedule-checkout';

  constructor(props) {
    super(props);

    props.navigation.setOptions({
      title: 'Summary'
    });
  }

  render() {
    return (
      <View style={[stylesMain.viewContainer, stylesApp.justifyBetween]}>
        <View style={styles.viewContent}>
          <View style={styles.viewInfo}>
            <View style={styles.viewItem}>
              <Text style={styles.txtItemName}>
                Dance style:
              </Text>
              <Text style={styles.txtItemValue}>
                Smooth
              </Text>
            </View>

            <View style={styles.viewItem}>
              <Text style={styles.txtItemName}>
                Dance Name:
              </Text>
              <Text style={styles.txtItemValue}>
                Waltz
              </Text>
            </View>

            <View style={styles.viewItem}>
              <Text style={styles.txtItemName}>
                Dance Level:
              </Text>
              <Text style={styles.txtItemValue}>
                Beginer
              </Text>
            </View>

            <View style={styles.viewItem}>
              <Text style={styles.txtItemName}>
                Special Ocassion:
              </Text>
              <Text style={styles.txtItemValue}>
                Wedding Preparation
              </Text>
            </View>
          </View>

          <View style={styles.viewContentFooter}>
            <Text style={styles.txtFee}>
              Fee for Purchase:   $5
            </Text>

            <View style={styles.viewFeeDivider} />

            <View style={styles.viewTextTotal}>
              <Text style={styles.txtTotal}>
                Total  :
              </Text>
              <Text style={styles.txtTotal}>
                $25
              </Text>
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
      </View>
    );
  }

  onButCheckout() {
    // go to booking page
    this.props.navigation.push(BookingMenu.NAV_NAME);
  }
}
