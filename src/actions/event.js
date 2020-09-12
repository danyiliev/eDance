import {SET_EVENTS} from '../constants/action-types';

export const setEvents = (events) => {
  return {
    type: SET_EVENTS,
    payload: events,
  };
};
