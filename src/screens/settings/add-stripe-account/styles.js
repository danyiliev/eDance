import {StyleSheet} from 'react-native';
import {colors} from 'react-native-elements';
import {stylesApp} from '../../../styles/app.style';

export const styles = StyleSheet.create({
  imgStripe: {
    width: 240,
    height: 90,
    resizeMode: 'contain',
    alignSelf: 'center',
  },

  viewData: {
    marginTop: 24,
  },

  txtLabel: {
    width: 120,
    lineHeight: 30,
  },
  txtValue: {
    color: colors.grey2,
  },

  viewContent: {
    padding: 20,
  },

  viewLoading: {
    width: '100%',
    ...stylesApp.viewLoading,
    position: 'absolute',
  },

  viewActions: {
    ...stylesApp.flexRow,
    marginHorizontal: 14,
    marginVertical: 32,
  },
  ctnButAction: {
    flex: 1,
  },

  txtTitle: {
    color: colors.grey3,
    marginTop: 24,
    marginBottom: 8,
  },
});
