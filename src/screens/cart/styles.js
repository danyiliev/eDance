import {StyleSheet} from 'react-native';
import {stylesApp, styleUtil} from '../../styles/app.style';
import {colors as colorTheme} from '../../styles/theme.style';

export const styles = StyleSheet.create({
  listCtnContainer: {
    padding: 14,
    paddingBottom: 80,
  },

  viewItem: {
    ...stylesApp.flexRow,
    ...styleUtil.withShadow(12, 0.5),
    borderRadius: 12,
    backgroundColor: colorTheme.light,
    marginBottom: 14,
    padding: 14,
  },
  imgItem: {
    flex: 2,
  },

  viewItemContent: {
    marginLeft: 12,
    flex: 3,
  },
  viewTitle: {
    borderRadius: 12,
    backgroundColor: colorTheme.backgroundGrey,
    padding: 12,
  },
  txtTitle: {
    fontSize: 14,
    fontWeight: 'bold',
  },

  viewPrice: {
    ...stylesApp.flexRowCenter,
    marginTop: 6,
  },
  txtLabel: {
    color: colorTheme.primary,
    fontSize: 12,
  },
  txtPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    lineHeight: 30,
    marginLeft: 7,
  },

  viewQuantity: {
    ...stylesApp.flexRowCenter,
    marginTop: 4,
    justifyContent: 'space-between',
  },
  titleButRemove: {
    fontSize: 10,
    lineHeight: 16,
    color: colorTheme.grey,
  },

  viewContentMain: {
    paddingLeft: 12,
  },

  viewButBuy: {
    position: 'absolute',
    bottom: 18,
    left: 24,
    right: 24,
  },
});
