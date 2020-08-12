import {ApiService} from '../services';

export class PostHelper {
  static BUCKET_PATH = 'posts/';

  static generateFileName(fileName) {
    let ext = '';
    let name = '';

    if (fileName) {
      const names = fileName.name.split('.', 2);
      ext = names[1];
      name = names[0];
    }

    if (!name) {
      name = 'tmp';
    }
    const uniqueSuffix = '-' + Date.now();
    let fileNameDone = `${name}${uniqueSuffix}`;

    if (ext) {
      fileNameDone += `.${ext}`;
    }

    return fileNameDone;
  }

  static imageUrl(imgPath) {
    return ApiService.urlFileBase + imgPath;
  }

  static getImageUris(post) {
    const images = [];
    for (const img of post.photos) {
      images.push({uri: PostHelper.imageUrl(img)});
    }

    return images;
  }
}
