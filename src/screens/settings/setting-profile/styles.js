import {StyleSheet} from 'react-native';
import {colors as colorTheme} from '../../../styles/theme.style';
import {stylesApp, styleUtil} from '../../../styles/app.style';
import {styles as stylesLogin} from '../../login/styles';
import {color} from 'react-native-reanimated';
import {styles as stylesSignup} from '../../signup/styles';

export const styles = StyleSheet.create({
  txtItemTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 6,
  },

  viewContent: {
    padding: 14,
  },

  viewDivider: {
    height: 1,
    backgroundColor: colorTheme.lightGrey,
  },

  segmentSingle: {
    marginVertical: 14,
  },

  input: {
    ...stylesLogin.input,
    minHeight: 0,
    paddingVertical: 10,
  },
  ctnInput: {
    ...stylesLogin.ctnInput,
    flex: 1,
  },
  viewInput: {
    ...stylesApp.flexRowCenter,
    borderBottomWidth: 1,
    borderColor: colorTheme.lightGrey,
  },

  viewLevels: {
  },

  viewButNext: {
    ...styleUtil.withShadow(),
    marginHorizontal: 30,
    marginVertical: 48,
  },

  viewListItem: {
    ...stylesApp.flexRowCenter,
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: colorTheme.light,
    ...styleUtil.withShadow(4),
    borderRadius: 12,
    marginBottom: 14,
  },
  txtItem: {
    flex: 1,
    fontSize: 14,
    lineHeight: 25,
  },

  viewTapContainer: {
    ...stylesApp.flexRow,
    flexWrap: 'wrap',
  },

  txtLabel: {
    color: colorTheme.grey,
    marginBottom: 12,
  },

  viewForm: {
    backgroundColor: colorTheme.backgroundGrey,
    borderRadius: 12,
    padding: 14,
  },
  txtFormLabel: {
    marginVertical: 8,
    fontWeight: 'bold',
  },

  viewButSave: {
    marginVertical: 28,
    marginHorizontal: 80,
  },

  ctnSegmentGender: {
    ...stylesSignup.ctnSegmentGender,
    marginTop: 0,
    marginBottom: 8,
  },

  viewTime: {
    paddingVertical: 6,
    paddingLeft: 22,
    flex: 1,
  },
  txtTimeLabel: {
    color: colorTheme.darkGrey,
  },
  txtTime: {
    flex: 1,
  },
});
