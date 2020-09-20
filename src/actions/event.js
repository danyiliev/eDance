import {CLEAR_EVENTS, SET_EVENTS} from '../constants/action-types';

export const setEvents = (events) => {
  return {
    type: SET_EVENTS,
    payload: events,
  };
};

export const clearEvents = (events) => {
  return {
    type: CLEAR_EVENTS,
    payload: events,
  };
};
