import {BaseModel} from './base.model';
import {Utils} from '../helpers/utils';
import {User} from './user.model';

export class Post extends BaseModel {
  //
  // properties
  //
  userId = '';
  text = '';
  photos = [];

  // data
  comments = [];
  user = null;

  initFromObject(data) {
    super.initFromObject(data);

    // user
    if (Utils.isObject(data.user)) {
      this.user = new User().initFromObject(data.user);
    } else {
      this.userId = data.user;
    }

    // text
    if (data.text) {
      this.text = data.text;
    }

    // photos
    this.photos = data.photos;

    return this;
  }
}
