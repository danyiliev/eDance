import {StyleSheet} from 'react-native';
import {colors as colorTheme} from '../../styles/theme.style';
import {stylesApp} from '../../styles/app.style';

export const styles = StyleSheet.create({
  viewHeader: {
    paddingVertical: 12,
    backgroundColor: colorTheme.primaryLight,
    alignItems: 'center',
  },
  txtHeaderLabel: {
    fontStyle: 'italic',
    color: colorTheme.light,
  },
  txtHeaderTitle: {
    fontSize: 22,
    fontWeight: '500',
    color: colorTheme.light,
    marginTop: 4,
  },

  viewPrice: {
    alignItems: 'center',
  },
  txtPrice: {
    fontSize: 36,
    fontWeight: '600',
    color: colorTheme.primary,
  },
  txtPriceDesc: {
    color: colorTheme.grey,
  },

  viewContent: {
    ...stylesApp.justifyBetween,
    flex: 1,
    paddingVertical: 16,
    paddingHorizontal: 24,
  },
  viewDesc: {
    marginTop: 18,
  },
  viewDescItem: {
    marginTop: 4,
    ...stylesApp.flexRow,
  },

  bullet: {
    fontWeight: 'bold',
    width: 10,
  },
  bulletText: {
    flex: 1,
  },

  titleButTerm: {
    fontSize: 14,
    color: colorTheme.primary,
    textDecorationLine: 'underline',
  },
  txtTerm: {
    color: colorTheme.grey,
    fontSize: 13,
    lineHeight: 16,
    paddingHorizontal: 12,
  },

  viewAction: {
    marginHorizontal: 36,
    marginVertical: 24,
  },
  titleButRestore: {
    fontSize: 14,
    color: colorTheme.primary,
  },
});
