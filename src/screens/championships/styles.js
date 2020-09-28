import {StyleSheet} from 'react-native';
import {stylesApp, styleUtil} from '../../styles/app.style';
import {colors as colorTheme} from '../../styles/theme.style';

export const styles = StyleSheet.create({
  viewContainer: {
    ...stylesApp.viewContainer,
    padding: 14,
  },

  viewItem: {
    ...styleUtil.withShadow(12, 0.5),
    borderRadius: 12,
    backgroundColor: colorTheme.light,
    marginBottom: 14,
    padding: 16,
  },

  viewEventHeader: {
    ...stylesApp.flexRow,
    justifyContent: 'space-between',
    marginVertical: 8,
  },
  txtEventLabel: {
    fontSize: 12,
    color: colorTheme.grey,
  },

  txtItem: {
    flex: 1,
    fontWeight: 'bold',
    fontSize: 16,
    lineHeight: 25,
  },
  txtSessionType: {
    fontWeight: 'bold',
    fontSize: 16,
    marginVertical: 8,
  },

  viewSessionFooter: {
    alignItems: 'flex-end',
  },

  calContainer: {
    borderRadius: 12,
    borderWidth: 1,
    overflow: 'hidden',
    marginBottom: 12,
  },
});
