import {StyleSheet} from 'react-native';
import {stylesApp} from '../../../styles/app.style';
import {colors as colorTheme} from '../../../styles/theme.style';

export const styles = StyleSheet.create({
  viewHeader: {
    marginBottom: 14,
  },
  viewHeaderItem: {
    ...stylesApp.flexRowCenter,
  },

  listCtnContainer: {
    padding: 14,
  },

  txtLabel: {
    color: colorTheme.darkGrey,
    fontSize: 14,
  },
  txtHeaderItem: {
    fontSize: 16,
  },

  viewQuantity: {
    ...stylesApp.flexRowCenter,
  },
  txtQuantity: {
    marginLeft: 7,
    fontSize: 14,
  },

  txtLabelLarge: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  txtPrice: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  viewFooterItem: {
    ...stylesApp.flexRowCenter,
    justifyContent: 'space-between',
  },

  viewButProceed: {
    marginVertical: 38,
    marginHorizontal: 30,
  },
});
