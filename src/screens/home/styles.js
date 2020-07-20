import {StyleSheet} from 'react-native';
import {stylesApp} from '../../styles/app.style';
import {colors as colorTheme} from '../../styles/theme.style';

const cardHeight = 349;

export const styles = StyleSheet.create({
  viewContainer: {
    ...stylesApp.viewContainer,
  },

  viewHeader: {
    height: cardHeight + 15 * 2,
  },

  ctnSwiper: {},

  viewBadgeItem: {
    ...stylesApp.flexRow,
    borderRadius: 12,
    backgroundColor: colorTheme.light,
    paddingVertical: 13,
    paddingHorizontal: 16,
    marginHorizontal: 14,
    marginBottom: 14,
  },

  cardSwiper: {
    height: cardHeight,
  },

  viewItemContent: {
    marginLeft: 14,
    flex: 1,
  },
  txtBadge: {
    fontSize: 14,
    color: colorTheme.primary,
  },
  viewItemBottom: {
    ...stylesApp.flexRowCenter,
    ...stylesApp.justifyBetween,
    marginTop: 7,
  },
  txtBadgeDate: {
    fontSize: 12,
    fontWeight: 'bold',
    color: colorTheme.primaryLight,
  },

  viewBadgeCategory: {
    backgroundColor: colorTheme.primaryLight,
    borderRadius: 40,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  txtBadgeCategory: {
    fontSize: 10,
    color: colorTheme.light,
  },
});
