import {CLEAR_PRODUCTS, SET_MY_PRODUCTS, SET_PRODUCTS} from '../constants/action-types';

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

export const clearProducts = () => {
  return {
    type: CLEAR_PRODUCTS,
    payload: null,
  };
};
