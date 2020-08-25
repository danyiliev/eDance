import {StyleSheet} from 'react-native';
import {stylesApp} from '../../../styles/app.style';
import {colors as colorTheme} from '../../../styles/theme.style';

export const styles = StyleSheet.create({
  viewContainer: {
    ...stylesApp.viewContainer,
    padding: 14,
  },
  viewReview: {
    ...stylesApp.flexRow,
    marginBottom: 14,
  },
  viewReviewContent: {
    flex: 3,
    marginRight: 6,
  },
  viewReviewImage: {
    marginLeft: 6,
    flex: 2,
  },

  txtTitle: {
    fontSize: 18,
    lineHeight: 26,
    marginBottom: 4,
    fontWeight: 'bold',
  },
  txtName: {
    color: colorTheme.grey,
    fontSize: 14,
    lineHeight: 16,
    marginBottom: 10,
  },
  txtDesc: {
    fontSize: 12,
    lineHeight: 16,
  },

  txtRating: {
    fontSize: 16,
    color: colorTheme.grey,
    marginTop: 16,
    marginBottom: 12,
  },

  imgItem: {
    flex: 1,
  },

  viewReviewText: {
    backgroundColor: colorTheme.backgroundGrey,
    borderRadius: 12,
    padding: 14,
  },
});
