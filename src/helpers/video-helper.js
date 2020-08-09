import {Video} from '../models/video.model';

export class VideoHelper {
  static getHeaderImage(v) {
    if (v?.headerImagePath) {
      return {uri: v?.getHeaderImageUrl()};
    }

    if (v.type === Video.TYPE_TV) {
      return require('../../assets/imgs/tv_default.png');
    }

    return require('../../assets/imgs/radio_default.png');
  }
}
