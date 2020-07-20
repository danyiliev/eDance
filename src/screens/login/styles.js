import {StyleSheet} from 'react-native';
import {colors as colorTheme} from '../../styles/theme.style';
import {stylesApp} from '../../styles/app.style';

export const styles = StyleSheet.create({
  imgLogo: {
    marginTop: 160,
    marginBottom: 100,
    alignSelf: 'center',
  },

  viewContent: {
    marginHorizontal: 30,
  },

  ctnInput: {
    paddingHorizontal: 0,
  },
  inputCtn: {
    borderColor: '#E4E9F2',
  },
  input: {
    fontSize: 12,
    color: colorTheme.primary,
  },
  inputCtnPassword: {
    marginTop: 28,
  },

  viewButLogin: {
    marginTop: 40,
  },

  viewOr: {
    ...stylesApp.flexRowCenter,
    marginVertical: 14,
    alignSelf: 'center',
  },
  viewOrBar: {
    height: 1,
    width: 20,
    backgroundColor: colorTheme.grey,
  },
  txtOr: {
    marginHorizontal: 10,
    fontSize: 14,
    color: colorTheme.grey,
  },

  viewFooter: {
    marginTop: 20,
    marginHorizontal: 52,
    justifyContent: 'space-between',
  },
});
