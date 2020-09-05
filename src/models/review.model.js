import {BaseModel} from './base.model';
import {Utils} from '../helpers/utils';
import {User} from './user.model';
import {Lesson} from './lesson.model';

export class Review extends BaseModel {
  //
  // properties
  //
  userId = '';
  lessonId = '';
  rating = 5;
  review = '';

  // logical
  user = null;
  lesson = null;

  initFromObject(data) {
    super.initFromObject(data);

    // user
    if (Utils.isObject(data.user)) {
      this.user = new User().initFromObject(data.user);
      this.userId = this.user.id;
    } else {
      this.userId = data.user;
    }

    // lesson
    if (data.lesson) {
      if (Utils.isObject(data.lesson)) {
        this.lesson = new Lesson().initFromObject(data.lesson);
        this.lessonId = this.lesson.id;
      } else {
        this.lessonId = data.lesson;
      }
    }

    this.rating = data.rating;
    this.review = data.review;

    return this;
  }
}
