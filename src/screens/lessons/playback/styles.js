import {StyleSheet} from 'react-native';
import {stylesApp} from '../../../styles/app.style';

export const styles = StyleSheet.create({
  viewContainer: {
    ...stylesApp.viewContainer,
    position: 'relative',
  },

  videoContainer: {
    flex: 1,
  },
});
