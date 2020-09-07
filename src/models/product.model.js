import {BaseModel} from './base.model';
import {Utils} from '../helpers/utils';
import {User} from './user.model';
import {Review} from './review.model';

export class Product extends BaseModel {
  //
  // properties
  //
  userId = '';
  name = '';
  description = '';
  photos = [];
  price = 0;

  rate = 0;

  soldCount = 0;
  reviewCount = 0;

  quantity = 1;
  reviews = [];

  // data
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

    this.name = data.name;
    this.price = Number(data.price);

    if (data.description) {
      this.description = data.description;
    }

    // photos
    this.photos = data.photos;

    if (data.rate) {
      this.rate = data.rate;
    }
    if (data.soldCount) {
      this.soldCount = data.soldCount;
    }
    if (data.reviewCount) {
      this.reviewCount = data.soldCount;
    }

    // reviews
    if (data.reviews) {
      this.reviews = [];
      for (const r of data.reviews) {
        const review = new Review().initFromObject(r);
        this.reviews.push(review);
      }
    }

    return this;
  }
}
