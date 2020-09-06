import {StyleSheet} from 'react-native';
import {styles as stylesSignup} from '../signup/styles';
import {stylesApp} from '../../styles/app.style';
import {colors as colorTheme} from '../../styles/theme.style';

export const styles = StyleSheet.create({
  listCtnContainer: {
    padding: 14,
  },

  ctnSegment: {
    ...stylesSignup.ctnSegmentGender,
    marginVertical: 12,
    marginHorizontal: 60,
  },

  viewPrice: {
    ...stylesApp.flexRowCenter,
    marginTop: 4,
    justifyContent: 'space-between',
  },

  viewHeader: {
    ...stylesApp.flexRowCenter,
    marginVertical: 8,
    justifyContent: 'space-between',
  },
  viewHeaderDate: {
    fontSize: 12,
    color: colorTheme.grey,
  },
  viewHeaderPrice: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
