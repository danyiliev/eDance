import {StyleSheet} from 'react-native';
import {colors as colorTheme} from '../../../styles/theme.style';
import {stylesApp} from '../../../styles/app.style';
import {colors} from 'react-native-elements';

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

  viewItem: {
    ...stylesApp.flexRowCenter,
    marginTop: 4,
  },
  txtItemLabel: {
    fontSize: 12,
    color: colors.grey1,
    width: 96,
  },
});
