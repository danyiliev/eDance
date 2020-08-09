import {BaseModel} from './base.model';
import {ApiService} from '../services';

export class Video extends BaseModel {
  static TYPE_RADIO = 'radio';
  static TYPE_TV = 'tv';

  //
  // properties
  //
  name = '';
  description = '';
  headerImagePath = '';
  videoPath = '';

  // logical
  type = Video.TYPE_RADIO;

  initFromObject(data) {
    super.initFromObject(data);

    this.name = data.name;

    if (data.description) {
      this.description = data.description;
    }
    if (data.headerImagePath) {
      this.headerImagePath = data.headerImagePath;
    }
    this.videoPath = data.videoPath;

    return this;
  }

  getVideoUrl() {
    // url of video, handle space in file name
    return this.videoPath
      ? ApiService.urlFileBase + encodeURIComponent(this.videoPath)
      : '';
  }

  getHeaderImageUrl() {
    return this.headerImagePath
      ? ApiService.urlFileBase + this.headerImagePath
      : '';
  }
}
