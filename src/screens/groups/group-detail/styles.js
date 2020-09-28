import {StyleSheet} from 'react-native';
import {colors as colorTheme} from '../../../styles/theme.style';

export const styles = StyleSheet.create({
  txtLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    width: 100,
  },

  imgUser: {
    width: 36,
    height: 36,
    backgroundColor: colorTheme.grey,
    borderRadius: 40,
  },

  viewFormContent: {
    paddingLeft: 16,
    marginTop: 8,
  },
  txtItem: {
    lineHeight: 22,
  },

  txtSubTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 12,
  },
});
