import {StyleSheet} from 'react-native';
import {colors as colorTheme} from '../../../styles/theme.style';

export const styles = StyleSheet.create({
  viewContainer: {
    backgroundColor: colorTheme.light,
  },

  titleListItem: {
    fontSize: 13,
  },
  ctnListItem: {
    height: 48,
    padding: 0,
  },
  contentListItem: {
    paddingHorizontal: 16,
    paddingVertical: 0,
  },
});
