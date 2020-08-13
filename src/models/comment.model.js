import {BaseModel} from './base.model';
import {Utils} from '../helpers/utils';
import {User} from './user.model';
import {Post} from './post.model';

export class Comment extends BaseModel {
  //
  // properties
  //
  userId = '';
  postId = '';
  text = '';

  // data
  user = null;
  post = null;

  initFromObject(data) {
    super.initFromObject(data);

    // user
    if (Utils.isObject(data.user)) {
      this.user = new User().initFromObject(data.user);
    } else {
      this.userId = data.user;
    }

    // post
    if (Utils.isObject(data.post)) {
      this.user = new Post().initFromObject(data.post);
    } else {
      this.postId = data.post;
    }

    // text
    this.text = data.text;

    return this;
  }

  toObject(): {} {
    const obj = super.toObject();

    obj.user = this.user?.toObject();
    obj.post = this.post?.toObject();

    return obj;
  }
}
