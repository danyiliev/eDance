import {StyleSheet} from 'react-native';
import {stylesApp} from '../../../styles/app.style';
import {colors as colorTheme} from '../../../styles/theme.style';
import {styles as stylesLogin} from '../../login/styles';
import {styles as stylesSignup} from '../../signup/styles';

export const styles = StyleSheet.create({
  viewContainer: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },

  viewPhoto: {
    alignSelf: 'center',
  },

  viewPhotoMain: {
    backgroundColor: colorTheme.light,
    borderRadius: 200,
    justifyContent: 'center',
    width: 110,
    height: 110,
  },
  imgPhotoCore: {
    width: '80%',
    height: '80%',
    resizeMode: 'cover',
    alignSelf: 'center',
  },

  viewForm: {
    backgroundColor: colorTheme.backgroundGrey,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingTop: 8,
    paddingBottom: 14,
  },
  input: {
    ...stylesLogin.input,
    minHeight: 36,
  },
  ctnInputIcon: {
    height: 0,
  },

  ctnSegmentGender: {
    ...stylesSignup.ctnSegmentGender,
    marginVertical: 20,
  },

  viewButSave: {
    marginVertical: 28,
    marginHorizontal: 30,
  },
});
