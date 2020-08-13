import {StyleSheet} from 'react-native';
import {colors as colorTheme} from '../../styles/theme.style';
import {stylesApp, styleUtil} from '../../styles/app.style';
import {color} from 'react-native-reanimated';

export const styles = StyleSheet.create({
  viewFooter: {
    backgroundColor: colorTheme.background,
    paddingHorizontal: 14,
    ...stylesApp.flexRowCenter,
    ...styleUtil.withShadow(12),
  },

  ctnInput: {
    marginVertical: 10,
    borderRadius: 18,
    paddingVertical: 8,
    paddingHorizontal: 16,
    flex: 1,
    backgroundColor: colorTheme.backgroundGrey,
  },
  txtInput: {
    ...stylesApp.txtInput,
    minHeight: 0,
    paddingTop: 0,
    fontSize: 12,
    lineHeight: 16,
    color: colorTheme.primary,
  },
  titleButSend: {
    fontSize: 16,
    color: colorTheme.primary,
  },
  ctnButSend: {
    paddingLeft: 4,
  },

  viewComment: {
    ...stylesApp.flexRow,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: colorTheme.lightGrey,
  },
  imgUser: {
    width: 38,
    height: 38,
    backgroundColor: colorTheme.grey,
    borderRadius: 40,
  },

  viewCommentContent: {
    marginLeft: 12,
    flex: 1,
  },
  viewCommentHeader: {
    ...stylesApp.flexRow,
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  txtUser: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  txtTime: {
    fontSize: 12,
    color: colorTheme.grey,
  },

  txtComment: {
  }
});
