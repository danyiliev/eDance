import {StyleSheet} from 'react-native';
import {colors as colorTheme} from '../../../styles/theme.style';
import {stylesApp} from '../../../styles/app.style';

export const styles = StyleSheet.create({
  txtPrice: {
    fontSize: 18,
    fontWeight: '600',
    color: colorTheme.primary,
  },
  viewItemContentBody: {
    ...stylesApp.flexRow,
  },

  txtCategory: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '600',
    marginTop: 2,
  },

  txtLevel: {
    fontSize: 12,
    lineHeight: 16,
    color: colorTheme.grey,
    marginTop: 10,
  },

  viewAction: {
    alignSelf: 'flex-end',
  },
  ctnButAction: {},
  butAction: {
    backgroundColor: colorTheme.primary,
    borderRadius: 50,
    width: 50,
    height: 50,
  },
});
