import {StyleSheet} from 'react-native';
import {colors as colorTheme} from './theme.style';

export const styleUtil = {
  withShadow(radius = 22, opacity = 1) {
    return {
      shadowColor: colorTheme.shadow,
      shadowRadius: radius,
      shadowOffset: {
        width: 0,
        height: 0,
      },
      shadowOpacity: opacity,
    };
  },
};

export const stylesApp = StyleSheet.create({
  viewContainer: {
    flex: 1,
    backgroundColor: colorTheme.background,
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
  mt6: {
    marginTop: 6,
  },
  mt8: {
    marginTop: 8,
  },
  mt12: {
    marginTop: 12,
  },
  mt14: {
    marginTop: 14,
  },
  mt20: {
    marginTop: 20,
  },
  mt24: {
    marginTop: 24,
  },
  mr10: {
    marginRight: 10,
  },
  ml10: {
    marginLeft: 10,
  },

  mb4: {
    marginBottom: 4,
  },
  mb12: {
    marginBottom: 12,
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
    fontSize: 14,
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
    fontSize: 14,
    fontWeight: 'bold',
    color: colorTheme.primary,
  },
  titleButClear: {
    fontSize: 12,
    color: colorTheme.grey,
  },

  butLightOutline: {
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: colorTheme.primary,
    backgroundColor: 'transparent',
  },

  //
  // loading
  //
  viewLoading: {
    height: 130,
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtEmptyItem: {
    color: '#bbb',
  },

  // input
  txtInput: {
    // for android
    paddingVertical: 0,
  },
  input: {
    borderBottomWidth: 0,
  },

  semiTrans: {
    opacity: 0.7,
  },

  viewHeaderRight: {
    paddingHorizontal: 12,
  },

  butTitleNavRight: {
    paddingHorizontal: 6,
    fontSize: 16,
    color: colorTheme.primary,
  },
});
