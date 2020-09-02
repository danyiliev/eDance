import moment from 'moment';

export class BaseModel {
  id = '';
  createdAt = moment();

  initFromObject(data) {
    if (data._id) {
      this.id = data._id;
    } else if (data.id) {
      this.id = data.id;
    }

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

  toObject() {
    const obj = {};

    Object.getOwnPropertyNames(this).forEach((prop) => {
      obj[prop] = this[prop];
    });

    obj.createdAt = this.createdAt.format();

    return obj;
  }

  equalTo(model) {
    return this.id === model?.id;
  }

  toJsonString() {
    return JSON.stringify(this);
  }

  createdAtStr(format = 'YYYY-MM-DD HH:mm:ss') {
    let time = moment(this.createdAt);

    // date
    return time.format(format);
  }
}
