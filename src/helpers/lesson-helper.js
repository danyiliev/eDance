export class LessonHelper {
  static getTargetUser(lesson, currentUser) {
    if (lesson?.userId === currentUser.id) {
      return lesson?.teacher;
    } else {
      return lesson?.user;
    }
  }
}
