import {BaseModel} from './base.model';
import {Utils} from '../helpers/utils';
import {User} from './user.model';
import moment from 'moment';

export class SessionType {
  //
  // properties
  //
  type = '';
  danceStyles = [];

  initFromObject(data) {
    this.type = data.type;
    this.danceStyles = data.danceStyles;

    return this;
  }
}

export class EventSession {
  //
  // properties
  //
  startAt = null;
  types = [];

  initFromObject(data) {
    this.startAt = moment.parseZone(data.startAt).format('YYYY-MM-DD HH:mm');

    this.types = [];
    for (const t of data.types) {
      const type = new SessionType().initFromObject(t);
      this.types.push(type);
    }

    return this;
  }
}

export class Event extends BaseModel {
  //
  // properties
  //
  userId = '';
  sessions = [];
  prizeOptions = [];

  // logical
  user = null;

  initFromObject(data) {
    super.initFromObject(data);

    // user
    if (Utils.isObject(data.user)) {
      this.user = new User().initFromObject(data.user);
      this.userId = this.user.id;
    } else {
      this.userId = data.user;
    }

    // session
    this.sessions = [];
    for (const s of data.sessions) {
      const session = new EventSession().initFromObject(s);
      this.sessions.push(session);
    }

    this.prizeOptions = data.prizeOptions;

    return this;
  }
}
