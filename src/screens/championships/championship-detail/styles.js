import {StyleSheet} from 'react-native';
import {stylesApp} from '../../../styles/app.style';

export const styles = StyleSheet.create({
  viewFooter: {
    alignItems: 'flex-end',
  },

  viewActions: {
    ...stylesApp.flexRow,
    marginHorizontal: 8,
    marginVertical: 20,
  },
  ctnButAction: {
    flex: 1,
  },

  viewNotice: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 12,
    backgroundColor: '#FFD4DF',
    borderWidth: 1,
    borderColor: '#FE4C77',
    marginBottom: 8,
  },
  txtNotice: {
    color: '#FE4C77',
  },
});
