import {SET_MY_PRODUCTS, SET_PRODUCTS} from '../constants/action-types';

export const setProducts = (products) => {
  return {
    type: SET_PRODUCTS,
    payload: products,
  };
};

export const setMyProducts = (products) => {
  return {
    type: SET_MY_PRODUCTS,
    payload: products,
  };
};
