import {BaseModel} from './base.model';

export class EventEntry extends BaseModel {
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

  applies = [];

  userId = '';

  // logical
  teacher = null;
  user = null;

  initFromObject(data) {
    super.initFromObject(data);

    return this;
  }

  setTeacher(user) {
    if (!user) {
      return;
    }

    this.teacher = user;
    this.teacherId = user.id;
  }

  setUser(user) {
    if (!user) {
      return;
    }

    this.user = user;
    this.userId = user.id;
  }
}
