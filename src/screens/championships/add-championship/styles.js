import {StyleSheet} from 'react-native';
import {stylesApp} from '../../../styles/app.style';
import {colors as colorTheme} from '../../../styles/theme.style';

export const styles = StyleSheet.create({
  viewContainer: {
    ...stylesApp.viewContainer,
    padding: 14,
  },

  viewPriceItem: {
    ...stylesApp.flexRowCenter,
    flex: 1,
  },

});
