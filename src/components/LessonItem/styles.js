import {StyleSheet} from 'react-native';
import {colors as colorTheme} from '../../styles/theme.style';
import {stylesApp} from '../../styles/app.style';

export const styles = StyleSheet.create({
  ctnButAction: {},
  butAction: {
    backgroundColor: colorTheme.primary,
    borderRadius: 50,
    width: 50,
    height: 50,
  },

  butLike: {
    backgroundColor: '#ccc',
  },

  viewAction: {
    alignSelf: 'flex-end',
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

  viewItemContentBody: {
    ...stylesApp.flexRow,
  },
  txtPrice: {
    fontSize: 18,
    fontWeight: '600',
    color: colorTheme.primary,
  },
  txtStatus: {
    fontSize: 12,
    lineHeight: 20,
    fontWeight: '500',
  },
});
