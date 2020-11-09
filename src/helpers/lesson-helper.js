import {Lesson} from '../models/lesson.model';

export class LessonHelper {
  static getTargetUser(lesson, currentUser) {
    if (lesson?.userId === currentUser.id) {
      return lesson?.teacher;
    } else {
      return lesson?.user;
    }
  }

  static typeDesc(lesson) {
    if (lesson.lessonType === Lesson.TYPE_PRIVATE) {
      return 'Private';
    } else {
      return 'Group';
    }
  }
}
