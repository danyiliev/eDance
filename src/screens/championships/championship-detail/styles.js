import {StyleSheet} from 'react-native';
import {stylesApp} from '../../../styles/app.style';
import {colors as colorTheme} from '../../../styles/theme.style';

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

  txtLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    width: 146,
  },
  txtItem: {
    marginVertical: 8,
  },

  imgUser: {
    width: 36,
    height: 36,
    backgroundColor: colorTheme.grey,
    borderRadius: 40,
  },
});
