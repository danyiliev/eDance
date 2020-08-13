import {BaseModel} from './base.model';
import {Utils} from '../helpers/utils';
import {User} from './user.model';
import {Comment} from './comment.model';

export class Post extends BaseModel {
  //
  // properties
  //
  userId = '';
  text = '';
  photos = [];
  commentCount = 0;

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
    this.commentCount = data.commentCount;

    if (data.comments) {
      for (const obj of data.comments) {
        if (Utils.isObject(obj)) {
          const c = new Comment().initFromObject(obj);
          this.comments.push(c);
        } else {
          this.comments.push(obj);
        }
      }
    }

    return this;
  }

  toObject(): {} {
    const obj = super.toObject();

    const cmts = [];
    for (const comment of obj.comments) {
      cmts.push(comment.toObject());
    }
    obj.comments = cmts;

    obj.user = this.user?.toObject();

    return obj;
  }
}
