import {StyleSheet} from 'react-native';
import {stylesApp} from '../../../styles/app.style';
import {colors as colorsTheme} from '../../../styles/theme.style';
import {colors} from 'react-native-elements';
import {color} from 'react-native-reanimated';

export const styles = StyleSheet.create({
  viewContainer: {
    ...stylesApp.viewContainer,
    position: 'relative',
  },

  videoContainer: {
    flex: 1,
  },

  viewIndicator: {
    position: 'absolute',
    right: 8,
    top: 8,
    alignItems: 'flex-end',
  },
  viewIndicatorLive: {
    ...stylesApp.flexRowCenter,
    backgroundColor: 'red',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  iconIndicator: {
    marginRight: 6,
    color: colorsTheme.light,
  },
  textIndicator: {
    fontSize: 12,
    color: colorsTheme.light,
  },

  viewIndicatorTime: {
    marginTop: 6,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },

  butCtnReverse: {
    position: 'absolute',
    left: 12,
    top: 12,
  },
  imgButReverse: {
    width: 20,
    height: 20,
    padding: 4,
  },
  butReverse: {
    ...stylesApp.butPrimary,
    borderRadius: 30,
    width: 48,
    height: 48,
  },

  ctnButStart: {
    position: 'absolute',
    width: '56%',
    bottom: 30,
    left: '22%',
  },

  viewUsers: {
    backgroundColor: 'rgba(0,0,0, 0.6)',
    paddingHorizontal: 8,
    paddingTop: 6,
    paddingBottom: 2,
    borderRadius: 8,
  },
  viewUser: {
    ...stylesApp.flexRowCenter,
    marginBottom: 4,
  },
  viewUserPhoto: {
    width: 28,
    height: 28,
    backgroundColor: colorsTheme.grey,
    borderRadius: 30,
  },
  txtUseName: {
    marginLeft: 6,
    fontSize: 12,
    color: colorsTheme.light,
  },
});
