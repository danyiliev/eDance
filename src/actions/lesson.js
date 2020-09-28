import {SET_MY_GROUPS} from '../constants/action-types';

export const setMyGroups = (groups) => {
  return {
    type: SET_MY_GROUPS,
    payload: groups,
  };
};
