import {StyleSheet} from 'react-native';
import {colors as colorTheme} from '../../styles/theme.style';
import {styles as stylesAdd} from '../../screens/add-post/styles';
import {stylesApp} from '../../styles/app.style';

export const styles = StyleSheet.create({
  viewMain: {
    backgroundColor: colorTheme.background,
    borderRadius: 15,
    paddingHorizontal: 18,
    paddingVertical: 18,
    position: 'relative',
  },

  viewUser: {
    alignSelf: 'center',
    alignItems: 'center',
    marginBottom: 18,
  },

  imgUser: {
    width: 68,
    height: 68,
    backgroundColor: colorTheme.grey,
    borderRadius: 40,
  },
  txtUserName: {
    marginTop: 10,
    fontSize: 18,
  },

  ctnRating: {
    alignSelf: 'center',
  },
  viewReview: {
    marginTop: 16,
    backgroundColor: colorTheme.backgroundGrey,
    padding: 16,
    borderRadius: 12,
  },
  txtInput: {
    ...stylesAdd.txtInput,
    minHeight: 228,
  },

  viewButSave: {
    marginTop: 16,
  },
});
