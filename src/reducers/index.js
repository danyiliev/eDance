import {combineReducers} from 'redux';

import {reducer as UserReducer} from './UserReducer';
import {reducer as ProductReducer} from './ProductReducer';
import {reducer as EventReducer} from './EventReducer';

export default combineReducers({
  UserReducer,
  ProductReducer,
  EventReducer,
});
