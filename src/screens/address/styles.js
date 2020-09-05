import {StyleSheet} from 'react-native';
import {stylesApp, styleUtil} from '../../styles/app.style';
import {colors as colorTheme} from '../../styles/theme.style';
import {styles as stylesCheckbox} from '../../components/CheckboxRound/styles';

const checkboxWidth = 28;

export const styles = StyleSheet.create({
  listCtnContainer: {
    padding: 14,
  },

  viewItem: {
    ...stylesApp.flexRow,
    ...styleUtil.withShadow(12, 0.5),
    borderRadius: 12,
    backgroundColor: colorTheme.light,
    marginBottom: 14,
    padding: 16,
  },

  viewItemContent: {
    flex: 1,
  },

  txtItemTitle: {
    fontSize: 9,
    marginBottom: 14,
  },
  viewItemAddress: {
    ...stylesApp.flexRow,
    marginBottom: 6,
  },
  txtItemAddress: {
    fontSize: 16,
    fontWeight: 'bold',
    flex: 1,
  },

  viewCheckIcon: {
    ...stylesCheckbox.viewIcon,
    width: checkboxWidth,
    height: checkboxWidth,
    borderRadius: checkboxWidth / 2,
  },
});
