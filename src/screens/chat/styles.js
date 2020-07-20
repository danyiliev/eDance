import {StyleSheet} from 'react-native';
import {colors as colorTheme} from '../../styles/theme.style';
import {stylesApp, styleUtil} from '../../styles/app.style';

export const styles = StyleSheet.create({
  viewChat: {
    flex: 1,
  },

  listCtnContainer: {
    padding: 16,
  },

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
  ctnButSend: {
    paddingLeft: 4,
  },
  titleButSend: {
    fontSize: 16,
    color: colorTheme.primary,
  },
});
