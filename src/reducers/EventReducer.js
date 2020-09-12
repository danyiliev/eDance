import {SET_EVENTS} from '../constants/action-types';

const initialState = {
  events: [],
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_EVENTS:
      return {
        ...state,
        events: action.payload,
      };

    default:
      return state;
  }
};
