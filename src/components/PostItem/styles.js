import {StyleSheet} from 'react-native';
import {stylesApp} from '../../styles/app.style';
import {colors as colorTheme} from '../../styles/theme.style';

export const styles = StyleSheet.create({
  viewHeader: {
    ...stylesApp.flexRowCenter,
    justifyContent: 'space-between',
    paddingVertical: 12,
  },

  txtTime: {
    fontSize: 11,
    color: colorTheme.grey,
  },

  viewFooter: {
    ...stylesApp.flexRowCenter,
    justifyContent: 'flex-end',
  },

  titleButComment: {
    fontSize: 14,
    color: colorTheme.primary,
    marginLeft: 6,
  },

  viewContainer: {
    borderBottomWidth: 1,
    borderColor: colorTheme.lightGrey,
    paddingHorizontal: 18,
    paddingBottom: 8,
  },

  viewImageContainer: {
    ...stylesApp.flexRow,
    flexWrap: 'wrap',
  },
  viewImage: {
    backgroundColor: colorTheme.lightGrey,
    justifyContent: 'center',
  },
  imgPost: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },

  txtPost: {
    fontSize: 15,
    marginBottom: 8,
  },
  iconThumbnail: {
    color: colorTheme.grey,
  },

  ctnButComment: {
    marginLeft: 8,
  },

  viewComments: {
    paddingLeft: 18,
  },
  txtComment: {
    fontSize: 14,
    marginBottom: 8,
  },
  txtCommentUser: {
    fontWeight: 'bold',
  },

  titleButAll: {
    fontSize: 14,
    color: colorTheme.primaryDark,
  },
});
