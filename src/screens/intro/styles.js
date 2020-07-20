import {StyleSheet} from 'react-native';
import {stylesApp} from '../../styles/app.style';
import {colors as colorTheme} from '../../styles/theme.style';

export const styles = StyleSheet.create({
  viewContainer: {
    ...stylesApp.viewContainer,
    backgroundColor: colorTheme.light,
  },

  viewContent: {
    flex: 1,
    paddingHorizontal: 34,
    paddingTop: 60,
  },
  txtTitle: {
    fontWeight: '600',
    fontSize: 36,
    lineHeight: 54,
    color: colorTheme.grey,
    textAlign: 'center',
  },

  imgLogo: {
    marginTop: 20,
    marginBottom: 32,
    alignSelf: 'center',
  },

  txtBody: {
    fontWeight: '300',
    fontSize: 16,
    lineHeight: 24,
    color: colorTheme.primary,
  },

  viewButNext: {
    marginHorizontal: 30,
    marginBottom: 72,
  },
});
