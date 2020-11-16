import {BaseModel} from './base.model';
import {
  DURATIONS_LESSON,
  SELECT_AMERICAN_BALLROOM,
  SELECT_AMERICAN_RHYTHM,
  SELECT_LATIN,
  SELECT_STANDARD,
} from '../constants/dance-data';
import {Utils} from '../helpers/utils';
import {User} from './user.model';

export class Group extends BaseModel {
  //
  // properties
  //
  name = '';
  userId = '';

  // dance styles
  styles = [];
  dances = [];

  // deprecated
  styleBallroom = [];
  // deprecated
  styleRythm = [];
  // deprecated
  styleStandard = [];
  // deprecated
  styleLatin = [];

  danceLevels = [];

  availableDays = [];
  timeStart = '';
  durationLesson = DURATIONS_LESSON[0];

  // logical
  user = null;

  initFromObject(data) {
    super.initFromObject(data);

    this.name = data.name;

    // user
    if (Utils.isObject(data.user)) {
      this.user = new User().initFromObject(data.user);
      this.userId = this.user.id;
    } else {
      this.userId = data.user;
    }

    // styles & dances
    if (data.styles) {
      this.styles = data.styles;
    }
    if (data.dances) {
      this.dances = data.dances;
    }

    if (data.danceLevels) {
      this.danceLevels = data.danceLevels;
    }

    // schedule
    if (data.availableDays && data.availableDays.length > 0) {
      this.availableDays = data.availableDays;
    }
    if (data.durationLesson) {
      this.durationLesson = data.durationLesson;
    }
    if (data.timeStart) {
      this.timeStart = data.timeStart;
    }

    return this;
  }
}
