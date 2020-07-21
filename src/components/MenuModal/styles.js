import {StyleSheet} from 'react-native';
import {colors as colorTheme} from '../../styles/theme.style';
import {stylesApp} from '../../styles/app.style';

export const styles = StyleSheet.create({
  viewMain: {
    backgroundColor: colorTheme.background,
    borderRadius: 12,
    position: 'relative',
    overflow: 'hidden',
  },

  ctnButClose: {
    position: 'absolute',
    zIndex: 99,
    top: 18,
    right: 18,
  },

  viewPhoto: {
    height: 240,
    backgroundColor: colorTheme.backgroundGrey,
  },
  imgPhoto: {
    height: 240,
  },

  viewName: {
    paddingVertical: 6,
    paddingHorizontal: 26,
    borderRadius: 12,
    alignSelf: 'center',
    marginTop: -24,
    backgroundColor: colorTheme.light,
  },
  txtName: {
    fontWeight: '600',
    fontSize: 24,
    lineHeight: 36,
  },

  viewMenu: {
    marginLeft: 12,
  },
  viewMenuItem: {
    ...stylesApp.flexRowCenter,
    height: 46,
  },
  viewMenuIcon: {
    alignItems: 'center',
    width: 52,
  },
  txtMenuItem: {
    fontSize: 16,
  },

  viewDivider: {
    backgroundColor: '#E4E9F2',
  },
});
