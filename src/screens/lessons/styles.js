import {StyleSheet} from 'react-native';
import {colors as colorTheme} from '../../styles/theme.style';
import {stylesApp, styleUtil} from '../../styles/app.style';

export const styles = StyleSheet.create({
  listCtnContainer: {
    padding: 14,
  },

  viewItem: {
    ...stylesApp.flexRow,
    ...styleUtil.withShadow(12, 0.5),
    borderRadius: 12,
    backgroundColor: colorTheme.light,
    marginBottom: 14,
    padding: 16,
  },

  imgUser: {
    width: 48,
    height: 48,
    backgroundColor: colorTheme.grey,
    borderRadius: 40,
  },

  viewItemBody: {
    flex: 1,
    marginLeft: 16,
  },

  txtName: {
    fontSize: 16,
    color: colorTheme.primary,
    fontWeight: 'bold',
  },
  txtMessage: {
    fontWeight: '600',
    marginTop: 4,
    fontSize: 12,
    color: colorTheme.primary,
  },
  txtDate: {
    fontSize: 12,
    color: colorTheme.primary,
    marginTop: 12,
  },

  viewItemFooter: {
    position: 'absolute',
    bottom: 10,
    right: 10,
  },

  txtBadge: {
    borderRadius: 12,
    borderWidth: 1,
    paddingVertical: 2,
    paddingHorizontal: 8,
    color: 'blue',
    borderColor: 'blue',
    fontWeight: 'bold',
    fontSize: 12,
  },
});
