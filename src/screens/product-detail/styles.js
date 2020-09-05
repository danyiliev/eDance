import {Dimensions, StyleSheet} from 'react-native';
import {colors as colorTheme} from '../../styles/theme.style';
import {stylesApp} from '../../styles/app.style';
const {width: SCREEN_WDITH} = Dimensions.get('window');

export const styles = StyleSheet.create({
  imgItem: {
    height: 204,
    width: SCREEN_WDITH,
  },

  viewContent: {
    paddingHorizontal: 16,
  },
  viewQuantity: {
    ...stylesApp.flexRowCenter,
    marginVertical: 20,
  },
  txtQuantityLabel: {
    marginRight: 18,
  },
  butQuantity: {
    width: 28,
    height: 28,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  butMinus: {
    backgroundColor: colorTheme.lightGrey,
  },
  titleButMinus: {
    color: colorTheme.primary,
    fontSize: 20,
  },
  butPlus: {
    backgroundColor: colorTheme.primary,
  },
  titleButPlus: {
    color: colorTheme.light,
    fontSize: 20,
  },
  txtQuantity: {
    width: 40,
    textAlign: 'center',
    fontSize: 16,
  },

  txtTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 28,
  },
  txtDescription: {
    marginVertical: 10,
    fontSize: 11,
    lineHeight: 12,
  },

  butAddCart: {
    ...stylesApp.butPrimary,
    paddingVertical: 12,
    paddingHorizontal: 20,
  },

  viewReview: {
    ...stylesApp.flexRow,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: colorTheme.lightGrey,
  },

  imgUser: {
    borderRadius: 70,
    width: 34,
    height: 34,
    backgroundColor: colorTheme.grey,
    alignSelf: 'center',
  },
  viewReviewContent: {
    marginLeft: 16,
    flex: 1,
  },
  viewReviewHeader: {
    ...stylesApp.flexRow,
    justifyContent: 'space-between',
  },
  txtTime: {
    fontSize: 12,
    color: colorTheme.grey,
  },

  txtReview: {
    marginTop: 6,
    fontSize: 14,
  },

  viewLoading: {
    ...stylesApp.viewLoading,
    height: 40,
  },
  txtEmptyItem: {
    ...stylesApp.txtEmptyItem,
    fontSize: 11,
  },
});
