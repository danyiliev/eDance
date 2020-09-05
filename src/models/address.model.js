import {BaseModel} from './base.model';

export class Address extends BaseModel {
  //
  // properties
  //
  building = '';
  street = '';
  city = '';
  state = '';

  initFromObject(data) {
    super.initFromObject(data);

    this.building = data.building;
    this.street = data.street;
    this.city = data.city;
    this.state = data.state;

    return this;
  }

  getFullAddress() {
    return `${this.building}, ${this.state}, ${this.city}, ${this.state}`;
  }
}
