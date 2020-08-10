import moment from 'moment';

export class BaseModel {
  id = '';
  createdAt = moment();

  initFromObject(data) {
    this.id = data._id;

    if (data.createdAt) {
      this.createdAt = moment(data.createdAt);
    }

    return this;
  }

  deserialize(input: any): this {
    Object.assign(this, input);

    if (input.createdAt) {
      this.createdAt = moment(input.createdAt);
    }

    return this;
  }

  equalTo(model) {
    return this.id === model?.id;
  }

  toJsonString() {
    return JSON.stringify(this);
  }
}
