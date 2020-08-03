import {StyleSheet} from 'react-native';
import {colors as colorTheme} from '../../styles/theme.style';
import {stylesApp} from '../../styles/app.style';

export const styles = StyleSheet.create({
  viewHeader: {
    backgroundColor: colorTheme.primary,
    paddingHorizontal: 28,
    paddingVertical: 20,
    ...stylesApp.flexRowCenter,
  },

  imgUser: {
    width: 60,
    height: 60,
    backgroundColor: colorTheme.background,
    borderRadius: 40,
  },
  txtName: {
    fontSize: 18,
    color: colorTheme.light,
    marginLeft: 16,
  },

  viewAddNew: {
    ...stylesApp.flexRowCenter,
    padding: 16,
    borderBottomWidth: 1,
    borderColor: colorTheme.lightGrey,
  },

  viewNewBut: {
    width: 80,
    height: 80,
    backgroundColor: colorTheme.lightGrey,
    justifyContent: 'center',
  },
  txtAddNew: {
    marginLeft: 16,
    fontSize: 16,
    color: colorTheme.darkGrey,
  },
});
