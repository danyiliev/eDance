import {Dimensions, StyleSheet} from 'react-native';
import {stylesApp, styleUtil} from '../../../styles/app.style';
import {colors as colorTheme} from '../../../styles/theme.style';

const {width: SCREEN_WDITH} = Dimensions.get('window');
const paddingItem = 7;

export const styles = StyleSheet.create({
  viewContainer: {
    ...stylesApp.viewContainer,
    backgroundColor: colorTheme.light,
  },

  listCtnContainer: {
    padding: paddingItem,
  },

  viewItem: {
    flex: 0.5,
    margin: paddingItem,
  },

  viewItemContent: {
    flex: 1,
    padding: 6,
    ...styleUtil.withShadow(12, 0.5),
    borderRadius: 12,
    backgroundColor: colorTheme.light,
    height: (SCREEN_WDITH - paddingItem * 6) / 2,
  },
  imgItem: {
    flex: 1,
    width: '100%',
    resizeMode: 'contain',
    backgroundColor: colorTheme.lightGrey,
  },

  searchCtn: {
    backgroundColor: 'transparent',
    borderBottomWidth: 0,
    borderTopWidth: 0,
    flex: 1,
    padding: 0,
  },
  searchInputCtn: {
    backgroundColor: 'transparent',
    height: 40,
  },
  searchInput: {
    fontSize: 14,
  },

  viewSearchbar: {
    ...stylesApp.flexRow,
    backgroundColor: colorTheme.backgroundGrey,
    borderRadius: 100,
    marginVertical: 8,
    marginHorizontal: 8,
    overflow: 'visible',
    paddingLeft: 8,
  },
  butSearchCtn: {
    ...styleUtil.withShadow(12),
  },
  butSearch: {
    backgroundColor: colorTheme.primary,
    borderRadius: 100,
    height: 40,
    width: 40,
  },

  txtName: {
    marginTop: 6,
    textAlign: 'center',
  },

  textEmptyItem: {
    color: colorTheme.grey,
  },
});
