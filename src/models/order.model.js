import {BaseModel} from './base.model';

export class TimeSlot {
  start = '';
  end = '';

  selected = false;

  toString() {
    return `${this.start} - ${this.end}`;
  }
}

export class Order extends BaseModel {
  //
  // properties
  //
  lessonType = '';
  ageGroup = '';
  danceStyle = '';
  dance = '';
  danceLevel = '';

  userId = '';
  teacherId = '';

  // logical
  teacher = null;

  initFromObject(data) {
    super.initFromObject(data);
  }

  setTeacher(user) {
    this.teacher = user;
    this.teacherId = user.id;
  }
}
