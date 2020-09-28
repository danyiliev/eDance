import {BaseModel} from './base.model';
import {
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
  styleBallroom = [];
  styleRythm = [];
  styleStandard = [];
  styleLatin = [];

  danceLevels = [];

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

    return this;
  }

  danceStyles() {
    const styles = [];

    if (this.styleBallroom.length >= 0) {
      styles.push(SELECT_AMERICAN_BALLROOM);
    }
    if (this.styleRythm.length >= 0) {
      styles.push(SELECT_AMERICAN_RHYTHM);
    }
    if (this.styleStandard.length >= 0) {
      styles.push(SELECT_STANDARD);
    }
    if (this.styleLatin.length >= 0) {
      styles.push(SELECT_LATIN);
    }

    return styles;
  }
}
