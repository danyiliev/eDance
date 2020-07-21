import {BaseModel} from './base.model';
import {ApiService} from '../services';

export class User extends BaseModel {
  static TYPE_TEACHER = 1;
  static TYPE_STUDENT = 2;
  static TYPE_ADJUDICATOR = 3;
  static TYPE_ADMIN = 0;

  //
  // properties
  //
  firstName = '';
  lastName = '';
  email = '';
  address = '';

  password = '';

  type = User.TYPE_TEACHER;

  initFromObject(data) {
    super.initFromObject(data);

    if (data.email) {
      this.email = data.email;
    }
    if (data.firstName) {
      this.firstName = data.firstName;
    }
    if (data.lastName) {
      this.lastName = data.lastName;
    }
    if (data.address) {
      this.address = data.address;
    }
    if (data.type) {
      this.type = data.type;
    }

    this.photo = data.photo;

    return this;
  }

  getPhotoUrl() {
    if (!this.photo) {
      return null;
    }

    // url
    if (this.photo.startsWith('http')) {
      return this.photo;
    }

    // file name
    return `${ApiService.urlImgUser}/${this.photo}`;
  }

  getFullName() {
    if (!this.firstName || !this.lastName) {
      return 'Unnamed';
    }

    return `${this.firstName} ${this.lastName}`;
  }
}
