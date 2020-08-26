import {StyleSheet} from 'react-native';
import {stylesApp} from '../../../styles/app.style';
import {colors as colorTheme} from '../../../styles/theme.style';

export const styles = StyleSheet.create({
  viewContainer: {
    ...stylesApp.viewContainer,
    padding: 14,
    justifyContent: 'space-between',
  },

  viewForm: {
    backgroundColor: colorTheme.backgroundGrey,
    borderRadius: 12,
    padding: 14,
    marginTop: 12,
  },
  txtItemTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 12,
  },

  viewContent: {
    marginTop: 12,
  },
  viewItem: {
    ...stylesApp.flexRowCenter,
    marginVertical: 4,
  },
  txtItemLabel: {
    fontSize: 12,
    color: colorTheme.darkGrey,
    width: 100,
  },
  txtItemValue: {
    fontSize: 16,
  },

  imgUser: {
    width: 38,
    height: 38,
    backgroundColor: colorTheme.grey,
    borderRadius: 40,
  },
  txtSubTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 4,
    marginTop: 12,
  },

  txtCreated: {
    color: colorTheme.grey,
    position: 'absolute',
    right: 14,
    top: 14,
    fontSize: 12,
  },

  viewActions: {
    ...stylesApp.flexRow,
    marginHorizontal: 8,
    marginBottom: 40,
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
  },
  txtNotice: {
    color: '#FE4C77',
  },
});
