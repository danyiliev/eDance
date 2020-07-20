import {StyleSheet} from 'react-native';
import {colors as colorTheme} from '../../styles/theme.style';

const borderRadius = 12;

export const styles = StyleSheet.create({
  txtMessageText: {
    fontSize: 12,
    lineHeight: 16,
  },

  viewMessage: {
    marginHorizontal: 17,
    paddingVertical: 10,
    paddingHorizontal: 14,
    flexShrink: 1,
    borderTopLeftRadius: borderRadius,
    borderTopRightRadius: borderRadius,
  },
  ctnMsgLeft: {
    backgroundColor: '#C5CEE0',
    borderBottomLeftRadius: borderRadius,
  },
  ctnMsgRight: {
    backgroundColor: colorTheme.lightGrey,
    borderBottomRightRadius: borderRadius,
  },

  viewItem: {
    marginVertical: 12,
    alignItems: 'flex-end',
  },
  viewUser: {
    position: 'relative',
  },
  imgUser: {
    width: 43,
    height: 43,
    backgroundColor: colorTheme.grey,
    borderRadius: 40,
  },

  txtMessageTime: {
    fontSize: 12,
    textAlign: 'right',
    marginTop: 6,
  },
});
