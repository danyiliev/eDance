import {StyleSheet} from 'react-native';
import {stylesApp} from '../../styles/app.style';
import {colors as colorTheme} from '../../styles/theme.style';

export const styles = StyleSheet.create({
  viewSelectItem: {
    ...stylesApp.flexRowCenter,
    borderBottomWidth: 1,
    borderColor: colorTheme.lightGrey,
  },

  txtItem: {
    fontSize: 12,
    color: colorTheme.primary,
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 0,
  },
  iconRight: {
    fontWeight: '300',
  },

  picker: {
    paddingVertical: 0,
  },
});
