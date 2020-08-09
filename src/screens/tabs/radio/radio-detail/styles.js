import {Dimensions, StyleSheet} from 'react-native';
import {colors as colorTheme} from '../../../../styles/theme.style';
const {width: SCREEN_WDITH} = Dimensions.get('window');

export const styles = StyleSheet.create({
  viewHeader: {
    alignItems: 'center',
    marginTop: 30,
    paddingLeft: 24,
    paddingRight: 24,
  },
  viewThumbnail: {
    elevation: 10,
    shadowColor: '#d9d9d9',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 1,
    shadowRadius: 2,
    borderRadius: 20,
    backgroundColor: colorTheme.light,
  },
  imgThumbnail: {
    width: SCREEN_WDITH - 100,
    height: SCREEN_WDITH - 100,
    borderRadius: 20,
  },

  txtName: {
    marginVertical: 14,
    fontSize: 18,
    textAlign: 'center',
  },

  viewControls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 8,
  },

  viewButPlay: {
    marginHorizontal: 24,
    height: 72,
    width: 72,
    borderWidth: 1,
    borderColor: colorTheme.primary,
    borderRadius: 72 / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },

  video: {
    height: 0,
    width: 0,
  },
});
