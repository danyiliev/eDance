import {StyleSheet} from 'react-native';
import {stylesApp, styleUtil} from '../../styles/app.style';
import {colors as colorTheme} from '../../styles/theme.style';

export const styles = StyleSheet.create({
  listCtnContainer: {
    padding: 14,
  },

  viewItem: {
    ...styleUtil.withShadow(12, 0.5),
    borderRadius: 12,
    backgroundColor: colorTheme.light,
    marginBottom: 14,
    padding: 16,
  },

  txtName: {
    fontSize: 16,
    fontWeight: 'bold',
    paddingRight: 40,
  },

  viewRow: {
    ...stylesApp.flexRow,
  },
  txtLabel: {
    fontSize: 14,
    fontWeight: 'bold',
  },

  ctnButAction: {
    position: 'absolute',
    top: 4,
    right: 8,
  },
});
