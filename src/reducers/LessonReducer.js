import {SET_MY_GROUPS} from '../constants/action-types';

const initialState = {
  myGroups: null,
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_MY_GROUPS:
      return {
        ...state,
        myGroups: action.payload,
      };

    default:
      return state;
  }
};
