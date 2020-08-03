import {StyleSheet} from 'react-native';
import {stylesApp} from '../../styles/app.style';
import {colors as colorTheme} from '../../styles/theme.style';

export const styles = StyleSheet.create({
  viewContainer: {
    paddingHorizontal: 20,
    paddingVertical: 24,
  },

  viewItem: {
    borderBottomWidth: 0.6,
    borderColor: '#bcbcbc',
    paddingVertical: 6,
  },
  viewInput: {
  },

  ctnInput: {
    paddingHorizontal: 0,
  },

  txtInput: {
    fontSize: 16,
    minHeight: 0,
    paddingTop: 0,

    // for android
    paddingVertical: 0,
  },

  txtLabel: {
    marginTop: 24,
  },
  viewPhotoContainer: {
    marginTop: 14,
    ...stylesApp.flexRow,
    flexWrap: 'wrap',
  },

  viewPhoto: {
    backgroundColor: colorTheme.lightGrey,
    justifyContent: 'center',
    marginRight: 2,
    marginBottom: 2,
  },
  imgPhoto: {
    backgroundColor: colorTheme.lightGrey,
    resizeMode: 'cover',
    marginRight: 2,
    marginBottom: 2,
  },

  viewButSave: {
    marginVertical: 38,
    marginHorizontal: 60,
  },
});
