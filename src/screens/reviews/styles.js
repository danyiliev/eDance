import {StyleSheet} from 'react-native';
import {colors as colorTheme} from '../../styles/theme.style';
import {stylesApp, styleUtil} from '../../styles/app.style';
import {styles as stylesLikes} from '../tabs/likes/styles';

const heightImg = 113;
const marginItem = 14;

export const styles = StyleSheet.create({
  viewHeader: {
    backgroundColor: colorTheme.primary,
    paddingHorizontal: 40,
    paddingVertical: 22,
    ...stylesApp.flexRowCenter,
    ...stylesApp.justifyBetween,
  },

  imgUser: {
    width: 68,
    height: 68,
    backgroundColor: colorTheme.background,
    borderRadius: 40,
  },

  containerList: {
    paddingBottom: marginItem,
  },

  ctnButSchedule: {
    width: 164,
  },

  viewItem: {
    ...styleUtil.withShadow(12, 0.6),
    backgroundColor: colorTheme.backgroundGrey,
    borderRadius: 12,
    ...stylesApp.flexRow,
    marginHorizontal: marginItem,
    marginTop: marginItem,
  },

  imgItem: {
    ...stylesLikes.imgItem,
    width: heightImg,
    height: '100%',
    resizeMode: 'cover',
  },

  viewItemRating: {
    ...stylesApp.flexRowCenter,
    ...stylesApp.justifyBetween,
  },

  txtDate: {
    color: colorTheme.primary,
    fontSize: 12,
  },

  star: {
    marginRight: 8,
  },

  txtTitle: {
    color: colorTheme.primary,
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 8,
  },
  txtBody: {
    color: colorTheme.primary,
    fontSize: 12,
    lineHeight: 16,
    marginTop: 8,
  },
});
