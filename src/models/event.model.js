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
  entries = [];

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

    if (data.entries) {
      this.entries = data.entries;
    }

    return this;
  }
}

export class Event extends BaseModel {
  //
  // properties
  //
  title = '';
  companyAddress = '';
  phone = '';
  email = '';
  prices = [];

  userId = '';
  sessions = [];
  prizeOptions = {};

  // logical
  user = null;

  initFromObject(data) {
    super.initFromObject(data);

    if (data.title) {
      this.title = data.title;
    }
    if (data.companyAddress) {
      this.companyAddress = data.companyAddress;
    }
    if (data.phone) {
      this.phone = data.phone;
    }
    if (data.email) {
      this.email = data.email;
    }
    if (data.prices) {
      this.prices = data.prices;
    }

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

  startDate() {
    let minDate = '9999-99-99';

    for (const s of this.sessions) {
      const date = moment(s.startAt).format('YYYY-MM-DD');
      if (date < minDate) {
        minDate = date;
      }
    }

    return minDate;
  }

  endDate() {
    let maxDate = '0000-00-00';

    for (const s of this.sessions) {
      const date = moment(s.startAt).format('YYYY-MM-DD');
      if (date > maxDate) {
        maxDate = date;
      }
    }

    return maxDate;
  }

  getPrice() {
    // default to usd
    const pricesUSD = this.prices.filter((p) => p.currency === Price.CURRENCIES[0]);
    if (pricesUSD.length >= 0) {
      return pricesUSD[0].price;
    }

    return this.prices[0].price;
  }
}
