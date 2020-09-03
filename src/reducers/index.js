import {combineReducers} from 'redux';

import {reducer as UserReducer} from './UserReducer';
import {reducer as ProductReducer} from './ProductReducer';

export default combineReducers({
  UserReducer,
  ProductReducer,
});
