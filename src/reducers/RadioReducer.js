import {SET_RADIOS, SET_TVS} from '../constants/action-types';

const initialState = {
  radios: null,
  tvs: null,
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_RADIOS:
      return {
        ...state,
        radios: action.payload,
      };

    case SET_TVS:
      return {
        ...state,
        tvs: action.payload,
      };

    default:
      return state;
  }
};
