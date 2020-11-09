import moment from 'moment';

export class Message {
  static TYPE_TEXT = 'user';
  static TYPE_IMAGE = 'image';
  static TYPE_ADMIN = 'admin';
  static TYPE_FILE = 'file';

  //
  // properties
  //
  text = '';
  type = Message.TYPE_TEXT;
  customType = '';
  extra = '';
  senderId = '';

  file = null;
  imageWidth = 0;
  imageHeight = 0;

  initFromSbMsg(message) {
    this.id = message.messageId.toString();

    this.createdAt = message.createdAt;

    if (message.messageType) {
      this.type = message.messageType;
    }
    if (message.sender) {
      this.senderId = message.sender.userId;
    }
    if (message.senderId) {
      this.senderId = message.senderId;
    }

    if (this.type === Message.TYPE_ADMIN) {
      this.text = message.message;
    }
    // text message
    else if (this.type === Message.TYPE_TEXT) {
      this.text = message.message;
      this.customType = message.customType;

      this.extra = message.data;
    } else {
      this.file = {uri: message.url.replace('http://', 'https://')};

      this.type = Message.TYPE_FILE;
      this.text = message.name;

      /**
       * - JSON string that has width & height in case of image
       * - Medicine name in case of prescription pdf
       */
      this.extra = message.data;

      // set size
      if (message.data) {
        if (message.data) {
          if (message.data.includes('width') && message.data.includes('height')) {
            let data = JSON.parse(message.data);
            this.imageWidth = data.width;
            this.imageHeight = data.height;
            this.type = Message.TYPE_IMAGE;
          }
        }
      }
    }

    return this;
  }

  timeFormatted() {
    let time = moment();
    return time.format('DD/MM/YYYY hh:mm A');
  }
}
