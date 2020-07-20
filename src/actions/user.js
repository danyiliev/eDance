import {SET_USER} from '../constants/action-types';

export const setUserInfo = (userInfo) => {
  return {
    type: SET_USER,
    payload: userInfo,
  };
};
