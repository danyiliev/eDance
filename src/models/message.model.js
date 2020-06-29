import moment from 'moment';

export class Message {
  static TYPE_TEXT = 'user';
  static TYPE_IMAGE = 'image';

  //
  // properties
  //
  text = '';
  type = Message.TYPE_TEXT;
  senderId = '';

  timeFormatted() {
    let time = moment();
    return time.format('DD/MM/YYYY hh:mm A');
  }
}
