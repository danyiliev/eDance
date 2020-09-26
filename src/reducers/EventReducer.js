import {CLEAR_EVENTS, SET_EVENT_SELECTED, SET_EVENTS} from '../constants/action-types';

const initialState = {
  events: [],
  eventSelected: null,
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_EVENTS:
      return {
        ...state,
        events: action.payload,
      };

    case SET_EVENT_SELECTED:
      return {
        ...state,
        eventSelected: action.payload,
      };

    case CLEAR_EVENTS:
      return {
        events: null,
      };

    default:
      return state;
  }
};
