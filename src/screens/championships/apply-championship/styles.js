import {StyleSheet} from 'react-native';
import {stylesApp} from '../../../styles/app.style';
import {colors as colorTheme} from '../../../styles/theme.style';
import {styles as stylesSignup} from '../../signup/styles';
import {styles as stylesLogin} from '../../login/styles';

export const styles = StyleSheet.create({
  viewContainer: {
    ...stylesApp.viewContainer,
    padding: 14,
  },

  viewForm: {
    backgroundColor: colorTheme.backgroundGrey,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 14,
    marginTop: 6,
    marginBottom: 12,
  },
  viewFormRow: {
    ...stylesApp.flexRowCenter,
    marginBottom: 12,
  },
  txtFormLabel: {
    fontSize: 12,
    color: colorTheme.primary,
    width: 90,
  },

  viewTeacher: {
    height: 36,
    justifyContent: 'center',
  },
  imgUser: {
    width: 36,
    height: 36,
    backgroundColor: colorTheme.grey,
    borderRadius: 40,
  },

  ctnSegmentGender: {
    flex: 1,
    ...stylesSignup.ctnSegmentGender,
    marginTop: 0,
    marginBottom: 0,
  },
  txtPlaceholder: {
    color: colorTheme.grey,
  },

  viewInput: {
    ...stylesApp.flexRowCenter,
    borderBottomWidth: 1,
    borderColor: colorTheme.lightGrey,
    flex: 1,
  },
  ctnInput: {
    ...stylesLogin.ctnInput,
  },
  input: {
    fontSize: 14,
    minHeight: 0,
    paddingVertical: 6,
  },

  txtFormTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    textDecorationLine: 'underline',
  },

  viewSubForm: {
    backgroundColor: colorTheme.backgroundDark,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
    marginTop: 6,
    marginBottom: 6,
  },
  txtSubTitle: {
    fontSize: 14,
    fontWeight: 'bold',
  },

  viewColumns: {
    ...stylesApp.flexRow,
    flexWrap: 'wrap',
  },

  ctnButAdd: {
    position: 'absolute',
    right: 6,
    top: 4,
  },

  viewButSave: {
    marginVertical: 28,
    marginHorizontal: 80,
  },
});
