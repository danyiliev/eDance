import {ApiService} from '../services';
import {PostHelper} from './post-helper';

export class ProductHelper {
  static BUCKET_PATH = 'products/';

  static getImageUris(product) {
    const images = [];
    for (const img of product.photos) {
      images.push({uri: PostHelper.imageUrl(img)});
    }

    return images;
  }
}
