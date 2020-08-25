import {StyleSheet} from 'react-native';
import {colors as colorTheme} from '../../styles/theme.style';

export const styles = StyleSheet.create({
  listCtnContainer: {
    padding: 14,
  },

  txtTitle: {
    fontSize: 14,
  },
  txtPrice: {
    marginTop: 6,
    fontSize: 14,
    fontWeight: 'bold',
  },
  txtGrey: {
    fontSize: 12,
    color: colorTheme.darkGrey,
    marginLeft: 8,
  },

  ctnButAction: {
    position: 'absolute',
    bottom: 12,
    right: 12,
  },
});
