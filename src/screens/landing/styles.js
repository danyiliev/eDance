import {StyleSheet} from 'react-native';
import {colors as colorTheme} from '../../styles/theme.style';

export const styles = StyleSheet.create({
  viewContainer: {},

  imgLogo: {
    marginTop: 160,
    marginBottom: 120,
    alignSelf: 'center',
  },

  viewButtons: {
    marginHorizontal: 30,
  },
  viewButStudent: {
    marginTop: 34,
  },

  viewFooter: {
    marginTop: 80,
    marginHorizontal: 52,
    justifyContent: 'space-between',
  },

  ctnButLogin: {
    marginTop: 24,
  },
  titleButLogin: {
    fontSize: 16,
    color: colorTheme.primary,
    textDecorationLine: 'underline',
  },
});
