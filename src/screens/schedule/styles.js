import {StyleSheet} from 'react-native';
import {colors as colorTheme} from '../../styles/theme.style';
import {stylesApp, styleUtil} from '../../styles/app.style';

export const styles = StyleSheet.create({
  viewContainer: {
    ...stylesApp.viewContainer,
    backgroundColor: colorTheme.background,
  },
  viewSelect: {
    borderRadius: 12,
    backgroundColor: colorTheme.backgroundGrey,
    paddingHorizontal: 14,
    paddingTop: 16,
    paddingBottom: 18,
    marginHorizontal: 14,
    marginTop: 14,
  },
  txtTitle: {
    fontWeight: 'bold',
    fontSize: 16,
  },

  styleCombo: {
    marginTop: 12,
  },
  picker: {
    paddingVertical: 0,
  },

  viewButNext: {
    ...styleUtil.withShadow(),
    marginVertical: 26,
    marginHorizontal: 30,
  },
});
