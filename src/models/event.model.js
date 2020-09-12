import {BaseModel} from './base.model';
import {Utils} from '../helpers/utils';
import {User} from './user.model';

export class SessionType {
  //
  // properties
  //
  type = '';
  danceStyles = [];
}

export class EventSession {
  //
  // properties
  //
  startAt = '';
  types = [];
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

    this.sessions = data.sessions;
    this.prizeOptions = data.prizeOptions;
  }
}
