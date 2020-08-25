import {StyleSheet} from 'react-native';
import {stylesApp} from '../../styles/app.style';
import {colors as colorTheme} from '../../styles/theme.style';
import {styles as stylesAdd} from '../add-post/styles';

export const styles = StyleSheet.create({
  viewContainer: {
    paddingHorizontal: 20,
    paddingVertical: 24,
  },

  viewFormItem: {
    ...stylesApp.flexRow,
    marginBottom: 12,
  },
  txtLabel: {
    marginTop: 8,
    fontSize: 12,
    width: 76,
  },
  viewItem: {
    ...stylesAdd.viewItem,
    flex: 1,
  },

});
