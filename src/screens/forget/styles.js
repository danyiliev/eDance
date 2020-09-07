import {StyleSheet} from 'react-native';
import {stylesApp} from '../../styles/app.style';

export const styles = StyleSheet.create({
  viewContainer: {
    ...stylesApp.viewContainer,
    paddingBottom: 38,
    paddingTop: 20,
  },

  viewTop: {
    flex: 1,
    maxHeight: 280,
    justifyContent: 'space-around',
    alignItems: 'center',
  },

  viewButNext: {
    marginBottom: 84,
    marginHorizontal: 30,
  },
  ctnInput: {
    paddingHorizontal: 30,
    marginBottom: 82,
  },
});
