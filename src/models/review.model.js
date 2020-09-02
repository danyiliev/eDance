import {BaseModel} from './base.model';
import {Utils} from '../helpers/utils';
import {User} from './user.model';

export class Review extends BaseModel {
  //
  // properties
  //
  userId = '';
  rating = 5;
  review = '';

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

    this.rating = data.rating;
    this.review = data.review;

    return this;
  }
}
