import {StyleSheet} from 'react-native';
import {stylesApp} from '../../styles/app.style';

export const styles = StyleSheet.create({
  txtCurrency: {
    fontSize: 16,
    marginRight: 14,
  },

  viewCurrency: {
    ...stylesApp.flexRowCenter,
    paddingHorizontal: 14,
    flex: 1,
  },
});
