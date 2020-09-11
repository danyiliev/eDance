import {StyleSheet} from 'react-native';
import {stylesApp} from '../../../styles/app.style';
import {colors as colorTheme} from '../../../styles/theme.style';

export const styles = StyleSheet.create({
  viewContainer: {
    ...stylesApp.viewContainer,
    padding: 14,
  },

  txtSessionLabel: {
    fontSize: 14,
    color: colorTheme.darkGrey,
  },

  viewForm: {
    backgroundColor: colorTheme.backgroundGrey,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 14,
    marginTop: 6,
    marginBottom: 12,
  },
  viewButSave: {
    marginVertical: 28,
    marginHorizontal: 40,
  },

  txtFormLabel: {
    fontSize: 14,
  },
  txtFormValue: {
    fontSize: 16,
    fontWeight: '600',
  },

  txtSessionType: {
    fontWeight: 'bold',
    fontSize: 18,
    textDecorationLine: 'underline',
    marginVertical: 8,
  },
  txtSessionDanceStyle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 6,
    marginLeft: 16,
  },

  ctnButDelete: {
    position: 'absolute',
    top: 10,
    right: 12,
    zIndex: 99,
  },
});
