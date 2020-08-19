import {StyleSheet} from 'react-native';
import {stylesApp, styleUtil} from '../../../styles/app.style';
import {colors as colorTheme} from '../../../styles/theme.style';

export const styles = StyleSheet.create({

  viewContainer: {
    ...stylesApp.viewContainer,
    ...stylesApp.justifyBetween,
    padding: 14,
    backgroundColor: colorTheme.background,
  },

  viewCalendar: {
    ...styleUtil.withShadow(14),
    backgroundColor: colorTheme.light,
    borderRadius: 12,
  },

  // calendar styles
  calContainer: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  calHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 10,
    paddingRight: 10,
    paddingVertical: 4,
    alignItems: 'center',
    backgroundColor: colorTheme.primary,
  },
  calMain: {
    padding: 0,
  },
  calMonthView: {
    paddingHorizontal: 5,
  },

  viewButNext: {
    ...styleUtil.withShadow(),
    marginBottom: 70,
    marginHorizontal: 30,
  },

  viewTimeSlot: {
    marginTop: 20,
    marginBottom: 30,
    ...stylesApp.flexRow,
    flexWrap: 'wrap',
  },
});
