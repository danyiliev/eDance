import {CLEAR_PRODUCTS, SET_MY_PRODUCTS, SET_PRODUCTS} from '../constants/action-types';

const initialState = {
  products: null,
  myProducts: null,
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PRODUCTS:
      return {
        ...state,
        products: action.payload,
      };

    case SET_MY_PRODUCTS:
      return {
        ...state,
        myProducts: action.payload,
      };

    case CLEAR_PRODUCTS:
      return {
        products: null,
        myProducts: null,
      };

    default:
      return state;
  }
};
