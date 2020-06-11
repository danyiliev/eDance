import {StyleSheet} from 'react-native';
import {stylesApp} from '../../styles/app.styles';
import {colors as colorTheme} from '../../styles/theme.style';

export const styles = StyleSheet.create({
  viewContainer: {
    ...stylesApp.viewContainer,
    paddingBottom: 38,
  },

  viewPhoto: {
    flex: 1,
    marginVertical: 40,
    alignSelf: 'center',
  },
  viewPhotoMain: {
    flex: 1,
    aspectRatio: 1,
    backgroundColor: colorTheme.light,
    borderRadius: 200,
    justifyContent: 'center',
  },
  imgPhotoCore: {
    width: '50%',
    height: '50%',
    resizeMode: 'cover',
    alignSelf: 'center',
  },
  imgPhoto: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderRadius: 200,
  },
  viewPhotoUpload: {
    width: 44,
    height: 44,
    marginTop: -22,
    borderRadius: 24,
    backgroundColor: colorTheme.primary,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },

  viewForm: {
    backgroundColor: colorTheme.backgroundGrey,
    borderRadius: 12,
    padding: 14,
    marginHorizontal: 14,
  },

  viewButNext: {
    marginVertical: 48,
    marginHorizontal: 30,
  }
});
