import {StyleSheet} from 'react-native';
import {stylesApp, styleUtil} from '../../styles/app.style';

export const styles = StyleSheet.create({
  viewContainer: {
    ...stylesApp.flexRowCenter,
    paddingVertical: 6,
  },

  txtLabel: {
    flex: 1,
    fontSize: 12,
  },

  viewIcon: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  icnCheck: {
    fontWeight: 'bold',
  },
});
