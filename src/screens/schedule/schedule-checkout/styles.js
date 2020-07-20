import {StyleSheet} from 'react-native';
import {colors as colorTheme} from '../../../styles/theme.style';
import {stylesApp} from '../../../styles/app.style';
import {styles as stylesMain} from '../styles';

export const styles = StyleSheet.create({
  viewInfo: {
    paddingHorizontal: 14,
    paddingTop: 16,
    paddingBottom: 28,
  },

  viewContent: {
    borderRadius: 12,
    backgroundColor: colorTheme.backgroundGrey,
    marginVertical: 18,
    marginHorizontal: 14,
  },

  viewItem: {
    borderColor: colorTheme.lightGrey,
    borderBottomWidth: 1,
    paddingTop: 9,
  },
  txtItemName: {
    fontSize: 12,
    lineHeight: 16,
    color: colorTheme.grey,
  },
  txtItemValue: {
    fontSize: 16,
    lineHeight: 24,
    paddingTop: 2,
    paddingBottom: 6,
    color: colorTheme.primary,
    fontWeight: '500',
  },

  viewContentFooter: {
    backgroundColor: '#3D3A4A',
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 2,
  },
  viewFeeDivider: {
    borderWidth: 0.5,
    borderColor: colorTheme.grey,
    borderRadius: 1,
    borderStyle: 'dashed',
  },
  txtFee: {
    fontSize: 12,
    lineHeight: 16,
    color: colorTheme.grey,
    paddingVertical: 16,
  },

  viewTextTotal: {
    ...stylesApp.flexRow,
    ...stylesApp.justifyBetween,
    paddingVertical: 18,
  },
  txtTotal: {
    fontSize: 20,
    lineHeight: 20,
    fontWeight: 'bold',
    color: colorTheme.light,
  },

  viewButNext: {
    ...stylesMain.viewButNext,
    marginBottom: 70,
  },
});
