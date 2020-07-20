import {StyleSheet} from 'react-native';
import {colors as colorTheme} from '../../styles/theme.style';
import {colors} from 'react-native-elements';
import {stylesApp} from '../../styles/app.style';

export const styles = StyleSheet.create({
  viewContainer: {
    backgroundColor: colorTheme.primary,
    borderRadius: 12,
    paddingVertical: 30,
    paddingHorizontal: 26,
  },

  imgUser: {
    borderRadius: 70,
    width: 110,
    height: 110,
    backgroundColor: colorTheme.background,
    alignSelf: 'center',
  },

  txtName: {
    color: colorTheme.light,
    textAlign: 'center',
    fontSize: 24,
    marginTop: 24,
    marginBottom: 20,
  },

  rating: {},
  starRating: {
    marginHorizontal: 3,
  },

  viewButtons: {
    ...stylesApp.flexRow,
    marginTop: 30,
  },

  butLightOutline: {
    paddingVertical: 15,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: colorTheme.light,
    backgroundColor: 'transparent',
  },
  titleButton: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colorTheme.light,
  },
});
