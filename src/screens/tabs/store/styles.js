import {StyleSheet} from 'react-native';
import {stylesApp, styleUtil} from '../../../styles/app.style';
import {colors as colorTheme} from '../../../styles/theme.style';

export const styles = StyleSheet.create({
  viewItemMain: {
    flex: 1,
    ...styleUtil.withShadow(12, 0.5),
    borderRadius: 12,
    backgroundColor: colorTheme.light,
  },

  imgItem: {
    height: 128,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  imgItemCore: {
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },

  viewItemContent: {
    padding: 12,
  },
  txtItemTitle: {
    fontSize: 11,
    marginBottom: 10,
  },
  viewPrice: {
    ...stylesApp.flexRowCenter,
    justifyContent: 'space-between',
  },
  txtGrey: {
    fontSize: 10,
    color: colorTheme.darkGrey,
  },
  txtPrice: {
    fontSize: 13,
    fontWeight: 'bold',
  },
  rating: {},

  viewFloating: {
    position: 'absolute',
    bottom: 16,
    right: 16,
  },
  butFloating: {
    borderRadius: 100,
    backgroundColor: colorTheme.light,
    width: 56,
    height: 56,
  },
});
