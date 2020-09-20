import {StyleSheet} from 'react-native';
import {stylesApp} from '../../../styles/app.style';
import {colors} from 'react-native-elements';

export const styles = StyleSheet.create({
  viewContainer: {
    ...stylesApp.viewContainer,
    padding: 14,
  },

  viewListItemContent: {
    flex: 1,
    ...stylesApp.flexRowCenter,
    justifyContent: 'space-between',
    paddingRight: 16,
  },
  txtItemDesc: {
    fontSize: 13,
    color: colors.grey3,
  },
});
