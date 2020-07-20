import {StyleSheet} from 'react-native';
import {colors as colorTheme} from '../../../styles/theme.style';
import {stylesApp, styleUtil} from '../../../styles/app.style';
import {styles as stylesLogin} from '../../login/styles';

export const styles = StyleSheet.create({
  txtItemTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 6,
  },

  viewContent: {
    marginVertical: 14,
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
    marginTop: 14,
    ...stylesApp.flexRow,
    flexWrap: 'wrap',
  },

  viewButNext: {
    ...styleUtil.withShadow(),
    marginHorizontal: 30,
    marginVertical: 48,
  },
});
