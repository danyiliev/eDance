import {StyleSheet} from 'react-native';
import {stylesApp} from '../../../styles/app.style';
import {colors as colorTheme} from '../../../styles/theme.style';

export const styles = StyleSheet.create({
  viewContainer: {
    ...stylesApp.viewContainer,
    position: 'relative',
  },

  videoContainer: {
    flex: 1,
    backgroundColor: colorTheme.darkGrey,
  },

  viewIndicator: {
    position: 'absolute',
    right: 8,
    top: 8,
  },
});
