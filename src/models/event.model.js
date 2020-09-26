import {BaseModel} from './base.model';
import {Utils} from '../helpers/utils';
import {User} from './user.model';
import moment from 'moment';

export class Price {
  static CURRENCIES = ['USD', 'GBP', 'EUR'];

  //
  // properties
  //
  price = 0;
  currency = Price.CURRENCIES[0];
}

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

export class EventSession extends BaseModel {
  //
  // properties
  //
  startAt = null;
  types = [];

  entryCount = 0;
  joinedUsers = [];

  initFromObject(data) {
    super.initFromObject(data);

    this.startAt = moment.parseZone(data.startAt).format('YYYY-MM-DD HH:mm');

    this.types = [];
    for (const t of data.types) {
      const type = new SessionType().initFromObject(t);
      this.types.push(type);
    }

    if (data.entryCount) {
      this.entryCount = data.entryCount;
    }

    // joined users
    if (data.joinedUsers) {
      this.joinedUsers = [];
      for (const u of data.joinedUsers) {
        if (Utils.isObject(u)) {
          const user = new User().initFromObject(u);
          this.joinedUsers.push(user);
        } else {
          const user = new User();
          user.id = u;

          this.joinedUsers.push(user);
        }
      }
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
