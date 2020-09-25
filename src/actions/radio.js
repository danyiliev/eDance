import {SET_RADIOS, SET_TVS} from '../constants/action-types';

export const setRadios = (radios) => {
  return {
    type: SET_RADIOS,
    payload: radios,
  };
};

export const setTvs = (tvs) => {
  return {
    type: SET_TVS,
    payload: tvs,
  };
};
