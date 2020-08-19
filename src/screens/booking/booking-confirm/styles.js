import {StyleSheet} from 'react-native';
import {colors as colorTheme} from '../../../styles/theme.style';
import {stylesApp} from '../../../styles/app.style';

export const styles = StyleSheet.create({
  viewContainer: {
    ...stylesApp.viewContainer,
    padding: 14,
    justifyContent: 'space-between',
  },

  viewForm: {
    backgroundColor: colorTheme.backgroundGrey,
    borderRadius: 12,
    padding: 14,
  },
  txtItemTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 12,
  },

  viewContent: {
    marginTop: 12,
  },
  viewItem: {
    ...stylesApp.flexRowCenter,
    marginVertical: 4,
  },
  txtItemLabel: {
    fontSize: 12,
    color: colorTheme.darkGrey,
    width: 100,
  },
  txtItemValue: {
    fontSize: 16,
  },

  imgUser: {
    width: 38,
    height: 38,
    backgroundColor: colorTheme.grey,
    borderRadius: 40,
  },
  txtSubTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 4,
    marginTop: 12,
  },

  viewButNext: {
    marginHorizontal: 40,
    marginBottom: 40,
  },
});
