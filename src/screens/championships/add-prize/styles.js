import {StyleSheet} from 'react-native';
import {colors as colorTheme} from '../../../styles/theme.style';
import {stylesApp} from '../../../styles/app.style';

export const styles = StyleSheet.create({
  viewContainer: {
    paddingHorizontal: 12,
  },

  viewItem: {
    marginTop: 12,
  },
  txtTitle: {
    fontWeight: 'bold',
    fontSize: 14,
    textDecorationLine: 'underline',
    flex: 1,
  },

  viewForm: {
    backgroundColor: colorTheme.backgroundGrey,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 14,
    marginTop: 6,
    marginBottom: 12,
  },
  txtFormLabel: {
    fontSize: 11,
  },

  txtSubTitle: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  viewSubItem: {
    marginTop: 12,
  },
  viewSubForm: {
    backgroundColor: colorTheme.backgroundDark,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
    marginTop: 6,
    marginBottom: 6,
  },

  viewColumns: {
    ...stylesApp.flexRow,
    flexWrap: 'wrap',
  },
  txtFormItem: {
    fontSize: 13,
    paddingVertical: 4,
  },

  txtTableHeader: {
    fontWeight: 'bold',
    fontSize: 13,
    textAlign: 'center',
  },
  viewTableItem: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
