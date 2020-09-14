import {StyleSheet} from 'react-native';
import {stylesApp} from '../../../styles/app.style';

export const styles = StyleSheet.create({
  viewFooter: {
    alignItems: 'flex-end',
  },

  viewActions: {
    ...stylesApp.flexRow,
    marginHorizontal: 8,
    marginVertical: 20,
  },
  ctnButAction: {
    flex: 1,
  },
});
