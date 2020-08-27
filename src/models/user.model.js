import {BaseModel} from './base.model';
import {ApiService} from '../services';
import {DURATIONS_LESSON, DURATIONS_REST} from '../constants/dance-data';

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
  price = 0;
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
