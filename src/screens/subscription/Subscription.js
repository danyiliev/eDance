import React from 'react';
import {stylesApp} from '../../styles/app.style';
import {styles} from './styles';
import {Text, View} from 'react-native';
import {Button} from 'react-native-elements';
import {User} from '../../models/user.model';

export default class Subscription extends React.Component {
  static NAV_NAME = 'subscription';

  constructor(props) {
    super(props);

    props.navigation.setOptions({
      title: 'Subscription',
    });
  }

  render() {
    return (
      <View style={stylesApp.viewContainer}>
        {/* header */}
        <View style={styles.viewHeader}>
          <View>
            <Text style={styles.txtHeaderLabel}>Upgrade to</Text>
            <Text style={styles.txtHeaderTitle}>Starter Account</Text>
          </View>
        </View>

        <View style={styles.viewContent}>
          <View>
            {/* price */}
            <View style={styles.viewPrice}>
              <Text style={styles.txtPrice}>$9.99</Text>
              <Text style={styles.txtPriceDesc}>per month</Text>
            </View>

            {/* desc */}
            <View style={styles.viewDesc}>
              {this.renderDescItem('Listen to Dance Radio')}
              {this.renderDescItem('Watch Dance TV videos')}
              {this.renderDescItem('Book lessons from teachers')}
            </View>
          </View>

          {/* footer */}
          <View>
            {/* terms */}
            <Button
              type="clear"
              title="Terms and Policies"
              titleStyle={styles.titleButTerm}
              onPress={() => this.onButLogin()}
            />
            <Text style={styles.txtTerm}>
              The subscription will automatically renew unless auto-renew is turned off at least 24 hours before the end of the current period. You can go to your iTunes Account settings to manage your subscription and turn off auto-renew. Your iTunes Account will be charged when the purchase is confirmed.
            </Text>

            {/* actions */}
            <View style={styles.viewAction}>
              <Button
                title="Upgrade"
                buttonStyle={stylesApp.butPrimary}
                titleStyle={stylesApp.titleButPrimary}
                onPress={() => this.onButUpgrade()}
              />
              <Button
                type="clear"
                containerStyle={stylesApp.mt6}
                title="Terms and Policies"
                titleStyle={styles.titleButRestore}
                onPress={() => this.onButRestore()}
              />
            </View>
          </View>
        </View>
      </View>
    );
  }

  renderDescItem(text) {
    return (
      <View style={styles.viewDescItem}>
        <Text style={styles.bullet}>{'\u2022'}</Text>
        <Text style={styles.bulletText}>{text}</Text>
      </View>
    );
  }

  onButUpgrade() {
  }

  onButRestore() {
  }
}