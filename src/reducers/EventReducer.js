import {CLEAR_EVENTS, SET_EVENTS} from '../constants/action-types';

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

    case CLEAR_EVENTS:
      return {
        events: null,
      };

    default:
      return state;
  }
};
