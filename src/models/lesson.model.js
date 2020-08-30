import {BaseModel} from './base.model';
import {Utils} from '../helpers/utils';
import {User} from './user.model';
import {DanceHelper} from '../helpers/dance-helper';
import moment from 'moment';

export class TimeSlot {
  start = '';
  end = '';

  selected = false;

  static fromString(str) {
    const times = str.split(' - ');
    if (!times) {
      return null;
    }

    const slot = new TimeSlot();
    slot.start = times[0];
    slot.end = times[1];

    return slot;
  }

  toString() {
    return `${this.start} - ${this.end}`;
  }
}

export class Lesson extends BaseModel {
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

  date = '';
  timeSlots = [];

  price = 35;

  // logical
  user = null;
  teacher = null;

  // data
  lessons = [];

  initFromObject(data) {
    super.initFromObject(data);

    // user
    if (Utils.isObject(data.user)) {
      this.user = new User().initFromObject(data.user);
      this.userId = this.user.id;
    } else {
      this.userId = data.user;
    }

    // teacher
    if (Utils.isObject(data.teacher)) {
      this.teacher = new User().initFromObject(data.teacher);
      this.teacherId = this.teacher.id;
    } else {
      this.teacherId = data.teacher;
    }

    this.lessonType = data.lessonType;
    this.ageGroup = data.ageGroup;
    this.danceStyle = data.danceStyle;
    this.dance = data.dance;
    this.danceLevel = data.danceLevel;

    this.date = data.date;

    this.timeSlots = [];
    for (const t of data.timeSlots) {
      if (Utils.isObject(t)) {
        this.timeSlots.push(t);
      } else {
        const slot = TimeSlot.fromString(t);
        if (slot) {
          this.timeSlots.push(slot);
        }
      }
    }

    if (data.price) {
      this.price = data.price;
    }

    return this;
  }

  setTeacher(user) {
    if (!user) {
      return;
    }

    this.teacher = user;
    this.teacherId = user.id;
  }

  timeToString() {
    let str = '';

    for (let i = 0; i < this.timeSlots.length; i++) {
      if (i > 0) {
        str += ', ';
      }
      str += this.timeSlots[i].toString();
    }

    return str;
  }

  simpleDescription() {
    return `${DanceHelper.danceStyleNameByVal(this.danceStyle)}, ${this.dance}, ${DanceHelper.danceLevelNameByVal(this.danceLevel)}`;
  }

  getMinTime() {
    if (!this.timeSlots || this.timeSlots.length <= 0) {
      return '';
    }

    let time = this.timeSlots[0].start;
    for (let i = 1; i < this.timeSlots.length; i++) {
      const m1 = moment(time, 'HH:mm');
      const m2 = moment(this.timeSlots[i].start, 'HH:mm');

      if (m2.isBefore(m1)) {
        time = this.timeSlots[i].start;
      }
    }

    return time;
  }

  getMaxTime() {
    if (!this.timeSlots || this.timeSlots.length <= 0) {
      return '';
    }

    let time = this.timeSlots[0].end;
    for (let i = 1; i < this.timeSlots.length; i++) {
      const m1 = moment(time, 'HH:mm');
      const m2 = moment(this.timeSlots[i].end, 'HH:mm');

      if (m2.isAfter(m1)) {
        time = this.timeSlots[i].end;
      }
    }

    return time;
  }

  isClosed() {
    const now = moment();
    const date = moment(this.date, 'yyyy-MM-DD');

    if (now.isBefore(date)) {
      return false;
    } else if (now.isAfter(date)) {
      return true;
    } else {
      // compare time
      const maxTime = moment(this.getMaxTime(), 'HH:mm');
      if (now.isAfter(maxTime)) {
        return true;
      }
    }

    return false;
  }

  minsToStart() {
    const now = moment();
    const start = moment(`${this.date} ${this.getMinTime()}`, 'yyyy-MM-DD HH:mm');

    return now.diff(start, 'minutes');
  }

}
