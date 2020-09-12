import {StyleSheet} from 'react-native';
import {stylesApp} from '../../styles/app.style';
import {colors as colorTheme} from '../../styles/theme.style';

export const styles = StyleSheet.create({
  viewContainer: {
    ...stylesApp.viewContainer,
  },

  viewOverlay: {
    flex: 1,
  },
  overlayBg: {
    width: 0,
    height: 0,
    padding: 0,
  },

  viewModal: {
    backgroundColor: colorTheme.highlight,
    position: 'absolute',
    width: '100%',
    bottom: 0,
  },

  viewHeader: {
    ...stylesApp.flexRowCenter,
    height: 42,
    backgroundColor: '#ddd',
    justifyContent: 'space-between',
  },

  butClear: {
    padding: 0,
  },
  titleButClear: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colorTheme.primaryDark,
  },

  viewContent: {
    paddingHorizontal: 16,
    paddingVertical: 10,
  },

  txtTitle: {
    fontSize: 16,
    position: 'absolute',
    width: '100%',
    textAlign: 'center',
  },
});
