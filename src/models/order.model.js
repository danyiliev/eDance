import {BaseModel} from './base.model';
import {Utils} from '../helpers/utils';
import {User} from './user.model';
import {Product} from './product.model';

export class Order extends BaseModel {
  //
  // properties
  //
  userId = '';
  amount = 0;
  address = '';

  // logical
  user = null;
  products = [];

  initFromObject(data) {
    super.initFromObject(data);

    // user
    if (Utils.isObject(data.user)) {
      this.user = new User().initFromObject(data.user);
      this.userId = this.user.id;
    } else {
      this.userId = data.user;
    }

    this.amount = data.amount;
    this.address = data.address;

    this.products = [];
    for (const op of data.orderProducts) {
      const p = new Product().initFromObject(op);
      this.products.push(p);
    }

    return this;
  }
}
