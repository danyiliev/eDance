import {BaseModel} from './base.model';

export class EventApply extends BaseModel {
  //
  // properties
  //
  teacherId = '';
  gender = 0;
  studio = '';
  email = '';
  phone = '';
  fax = '';
  address = '';
  city = '';
  state = '';

  userId = '';

  // logical
  teacher = null;
  user = null;

  applys = [];
}
