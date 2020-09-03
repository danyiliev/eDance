import {StyleSheet} from 'react-native';
import {stylesApp, styleUtil} from '../../../styles/app.style';
import {colors as colorTheme} from '../../../styles/theme.style';

const heightImg = 106;

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
  },
  viewItemImage: {
    position: 'relative',
  },

  imgItem: {
    resizeMode: 'cover',
    flex: 1,
    width: heightImg,
    height: '100%',
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
  },
  txtLength: {
    paddingHorizontal: 9,
    fontSize: 10,
    lineHeight: 16,
    color: colorTheme.light,
  },
  viewTxtLength: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: colorTheme.primary,
    opacity: 0.8,
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
  },

  viewItemContent: {
    paddingHorizontal: 11,
    paddingVertical: 14,
    flex: 1,
  },
  viewItemHeader: {
    ...stylesApp.flexRow,
    justifyContent: 'space-between',
  },
  txtLesson: {
    fontSize: 12,
    lineHeight: 16,
  },
  txtStatus: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '500',
  },
  viewItemContentBody: {
    ...stylesApp.flexRow,
    marginTop: 14,
  },
  txtName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  txtCategory: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '600',
    marginTop: 14,
  },

  viewLike: {
    backgroundColor: '#E4E9F2',
    borderRadius: 100,
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
