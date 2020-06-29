import {StyleSheet} from 'react-native';
import {stylesApp, styleUtil} from '../../styles/app.style';
import {colors as colorTheme} from '../../styles/theme.style';

export const styles = StyleSheet.create({
  viewContainer: {
    ...stylesApp.viewContainer,
    padding: 14,
  },

  viewListItem: {
    ...stylesApp.flexRowCenter,
    paddingHorizontal: 16,
    paddingVertical: 13,
    backgroundColor: colorTheme.light,
    ...styleUtil.withShadow(6),
    borderRadius: 12,
    marginBottom: 14,
  },
  txtItem: {
    flex: 1,
    fontWeight: 'bold',
    fontSize: 16,
    lineHeight: 25,
  },
});
