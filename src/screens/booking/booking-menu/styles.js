import {StyleSheet} from 'react-native';
import {colors as colorTheme} from '../../../styles/theme.style';
import {stylesApp, styleUtil} from '../../../styles/app.style';

export const styles = StyleSheet.create({
  txtTitle: {
    fontSize: 36,
    lineHeight: 54,
    marginVertical: 70,
    fontWeight: '600',
    color: colorTheme.grey,
    textAlign: 'center',
  },

  viewButton: {
    ...styleUtil.withShadow(14),
    backgroundColor: colorTheme.light,
    marginHorizontal: 14,
    marginBottom: 14,
    height: 72,
    ...stylesApp.flexRowCenter,
    paddingHorizontal: 20,
    borderRadius: 12,
  },

  imgButIcon: {
    marginRight: 20,
  },

  txtButton: {
    fontSize: 16,
    lineHeight: 25,
    fontWeight: 'bold',
    color: colorTheme.primary,
  },
});
