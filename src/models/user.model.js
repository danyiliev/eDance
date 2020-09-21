import {BaseModel} from './base.model';
import {ApiService} from '../services';
import {DURATIONS_LESSON, DURATIONS_REST} from '../constants/dance-data';
import {Review} from './review.model';
import {Product} from './product.model';
import {Address} from './address.model';

export class User extends BaseModel {
  static TYPE_TEACHER = 1;
  static TYPE_STUDENT = 2;
  static TYPE_ADJUDICATOR = 3;
  static TYPE_ADMIN = 0;

  static GENDERS = ['Male', 'Female'];

  //
  // properties
  //
  firstName = '';
  lastName = '';
  email = '';

  gender = 0;
  state = '';
  city = '';
  zipCode = '';

  password = '';

  type = User.TYPE_TEACHER;

  // teacher settings
  price = 25;
  ageGroups = [];

  // dance styles
  styleBallroom = [];
  styleRythm = [];
  styleStandard = [];
  styleLatin = [];

  danceLevels = [];
  availableDays = [0, 1, 2, 3, 4, 5, 6];
  durationLesson = DURATIONS_LESSON[0];
  durationRest = DURATIONS_REST[0];
  timeStart = '09:00';
  timeEnd = '22:00';

  rate = 5;
  reviews = [];
  lessonsPurchased = [];
  lessonsLiked = [];

  carts = [];
  deliveryAddresses = [];

  stripeAccountId = '';

  // logical
  lessonsTeach = null;
  lessonsAttend = null;
  lessonsLikedObj = null;

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
    if (data.gender) {
      this.gender = data.gender;
    }
    if (data.state) {
      this.state = data.state;
    }
    if (data.city) {
      this.city = data.city;
    }
    if (data.zipCode) {
      this.zipCode = data.zipCode;
    }

    if (data.type) {
      this.type = data.type;
    }

    this.photo = data.photo;

    // teacher settings
    if (data.price) {
      this.price = 0;
    }

    if (data.ageGroups) {
      this.ageGroups = data.ageGroups;
    }

    // dance styles
    if (data.styleBallroom) {
      this.styleBallroom = data.styleBallroom;
    }
    if (data.styleRythm) {
      this.styleRythm = data.styleRythm;
    }
    if (data.styleStandard) {
      this.styleStandard = data.styleStandard;
    }
    if (data.styleLatin) {
      this.styleLatin = data.styleLatin;
    }

    if (data.danceLevels) {
      this.danceLevels = data.danceLevels;
    }

    if (data.availableDays && data.availableDays.length > 0) {
      this.availableDays = data.availableDays;
    }
    if (data.durationLesson) {
      this.durationLesson = data.durationLesson;
    }
    if (data.durationRest) {
      this.durationRest = data.durationRest;
    }

    if (data.timeStart) {
      this.timeStart = data.timeStart;
    }
    if (data.timeEnd) {
      this.timeEnd = data.timeEnd;
    }

    // reviews
    if (data.rate) {
      this.rate = data.rate;
    }

    if (data.reviews) {
      this.reviews = [];
      for (const r of data.reviews) {
        const review = new Review().initFromObject(r);
        this.reviews.push(review);
      }
    }

    if (data.lessonsPurchased) {
      this.lessonsPurchased = data.lessonsPurchased;
    }
    if (data.lessonsLiked) {
      this.lessonsLiked = data.lessonsLiked;
    }

    // carts
    const carts = [];
    if (data.carts) {
      for (const obj of data.carts) {
        const productNew = new Product().initFromObject(obj.product);
        // quantity
        productNew.quantity = obj.quantity;

        carts.push(productNew);
      }
    }
    this.carts = carts;

    // addresses
    const addresses = [];
    if (data.deliveryAddresses) {
      for (const obj of data.deliveryAddresses) {
        const addressNew = new Address().initFromObject(obj);
        addresses.push(addressNew);
      }
    }
    this.deliveryAddresses = addresses;

    // stripe
    if (data.stripeAccountId) {
      this.stripeAccountId = data.stripeAccountId;
    }

    return this;
  }

  deserialize(input: any): this {
    super.deserialize(input);

    // init data
    this.lessonsLikedObj = null;

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

  isLessonPurchased(lessonId) {
    return this.lessonsPurchased.indexOf(lessonId) >= 0;
  }
  isLessonLiked(lessonId) {
    return this.lessonsLiked.indexOf(lessonId) >= 0;
  }

  likeLesson(lesson) {
    this.lessonsLiked.unshift(lesson.id);

    this.lessonsLikedObj?.unshift(lesson);
  }

  unlikeLesson(lesson) {
    let index = this.lessonsLiked.indexOf(lesson.id);
    this.lessonsLiked.splice(index, 1);

    index = this.lessonsLikedObj?.findIndex((l) => l.equalTo(lesson));
    if (index >= 0) {
      this.lessonsLikedObj?.splice(index, 1);
    }
  }

  addProductToCart(product) {
    // already added, increase quantity
    let item = this.carts.find((p) => p.id === product.id);
    if (item) {
      item.quantity += product.quantity;
      return false;
    }

    this.carts.push(product);

    return true;
  }

  getTotalPrice() {
    let sum = 0;

    for (let p of this.carts) {
      sum += p.price * p.quantity;
    }

    return sum.toFixed(2);
  }
}
