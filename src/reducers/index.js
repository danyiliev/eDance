import {combineReducers} from 'redux';

import {reducer as UserReducer} from './UserReducer';
import {reducer as ProductReducer} from './ProductReducer';
import {reducer as EventReducer} from './EventReducer';
import {reducer as RadioReducer} from './RadioReducer';
import {reducer as LessonReducer} from './LessonReducer';

export default combineReducers({
  UserReducer,
  ProductReducer,
  EventReducer,
  RadioReducer,
  LessonReducer,
});
