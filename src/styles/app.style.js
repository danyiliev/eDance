import { StyleSheet } from 'react-native';
import {colors as colorTheme} from './theme.style';

export const styleUtil = {
  withShadow(radius = 22, opacity = 1) {
    return {
      shadowColor: colorTheme.shadow,
      shadowRadius: radius,
      shadowOffset: {
        width: 0, height: 0,
      },
      shadowOpacity: opacity,
    }
  }
};

export const stylesApp = StyleSheet.create({
  viewContainer: {
    flex: 1,
  },

  flexColCenter: {
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center',
  },
  flexRow: {
    flexDirection: 'row',
  },
  flexRowCenter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  flex1: {
    flex: 1,
  },

  justifyCenter: {
    justifyContent: 'center',
  },
  justifyBetween: {
    justifyContent: 'space-between',
  },

  //
  // margins
  //
  mt4: {
    marginTop: 4,
  },

  //
  // buttons
  //
  butPrimary: {
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 100,
    backgroundColor: colorTheme.primary,
  },
  titleButPrimary: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colorTheme.light,
  },

  butLight: {
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 100,
    backgroundColor: colorTheme.light,
  },
  titleButLight: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colorTheme.primary,
  },
  titleButClear: {
    fontSize: 12,
    color: colorTheme.grey,
  },
});
