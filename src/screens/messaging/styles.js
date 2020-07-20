import {StyleSheet} from 'react-native';
import {stylesApp, styleUtil} from '../../styles/app.style';
import {colors as colorTheme} from '../../styles/theme.style';

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
    width: 64,
    height: 64,
    backgroundColor: colorTheme.grey,
    borderRadius: 40,
  },

  iconRight: {
    alignSelf: 'center',
  },

  viewItemBody: {
    flex: 1,
    marginHorizontal: 16,
  },

  txtName: {
    fontSize: 16,
    color: colorTheme.primary,
    fontWeight: 'bold',
  },
  txtMessage: {
    fontWeight: '600',
    marginTop: 8,
    fontSize: 12,
    color: colorTheme.primary,
  },
  txtDate: {
    fontSize: 12,
    color: colorTheme.primary,
    marginTop: 7,
  },
});
