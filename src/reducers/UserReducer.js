import {SET_USER} from '../constants/action-types';

const initialState = {
  user: null,
  isLoggedIn: false,
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: action.payload,
        isLoggedIn: action.payload && action.payload.id,
      };

    default:
      return state;
  }
};
