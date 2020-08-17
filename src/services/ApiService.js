import {config} from '../helpers/config';
import Axios from 'axios';
import {User} from '../models/user.model';
import {Video} from '../models/video.model';
import {Post} from '../models/post.model';
import {Comment} from '../models/comment.model';
import {RNS3} from 'react-native-upload-aws-s3';

class ApiService {
  // error codes
  static AUTH_INVALID_CREDENTIAL = 'invalid_credential';
  static AUTH_DUPLICATE_EMAIL = 'duplicate_email';
  static AUTH_INVALID_TOKEN = 'invalid_token';
  static INVALID_PARAM = 'invalid_param';
  static DB_DUPLICATE_NAME = 'duplicate_name';

  static UNKNOWN = 'unknown';

  baseUrl = `${config.serverUrl}/api/v1`;
  urlImgUser = `${config.serverUrl}/static/uploads/imgs/users`;

  urlFileBase = `https://${config.awsS3BucketName}.s3.${config.awsRegion}.amazonaws.com/`;

  async uploadFile(file, path, onProgress) {
    const options = {
      keyPrefix: path,
      bucket: config.awsS3BucketName,
      region: config.awsRegion,
      accessKey: config.awsAccessKeyId,
      secretKey: config.awsSecretAccessKey,
      successActionStatus: 201,
    };

    const response = await RNS3.put(file, options);
    if (response.status === 201) {
      console.log('Success: ', response.body);
      /**
       * {
       *   postResponse: {
       *     bucket: "your-bucket",
       *     etag : "9f620878e06d28774406017480a59fd4",
       *     key: "uploads/image.png",
       *     location: "https://your-bucket.s3.amazonaws.com/uploads%2Fimage.png"
       *   }
       * }
       */

      return Promise.resolve(response.body.postResponse);
    } else {
      console.log('Failed to upload image to S3: ', response);

      return Promise.reject(response);
    }
  }

  //
  // rest apis
  //

  async signIn(email: string, password: string) {
    const params = {
      email: email,
      password: password,
    };

    try {
      const {data} = await Axios.post(`${this.baseUrl}/login`, params, {});
      console.log(data);

      const user = new User().initFromObject(data.user);
      user.apiToken = data.token;
      this.setHeaderToken(data.token);

      return Promise.resolve(user);
    } catch (e) {
      console.log(e);

      return Promise.reject(e.response ? e.response.data : e);
    }
  }

  setHeaderToken(token) {
    this.token = token;
  }

  baseHeader() {
    if (!this.token) {
      return {};
    }

    return {
      token: this.token,
    };
  }

  async checkEmailExisting(email) {
    const params = {
      email: email,
    };

    try {
      const {data} = await Axios.post(
        `${this.baseUrl}/users/checkEmailExisting`,
        params,
        {},
      );

      return Promise.resolve(data.result);
    } catch (e) {
      console.log(e);

      return Promise.reject(e.response ? e.response.data : e);
    }
  }

  async signUp(
    firstName,
    lastName,
    email,
    password,
    type,
    gender,
    state,
    city,
    zipCode,
    photo,
  ) {
    const formData = new FormData();
    formData.append('firstName', firstName);
    formData.append('lastName', lastName);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('userType', type);
    formData.append('gender', gender);
    formData.append('state', state);
    formData.append('city', city);
    formData.append('zipCode', zipCode);

    if (photo) {
      formData.append('photo', photo);
    }

    try {
      const {data} = await Axios.post(`${this.baseUrl}/signup`, formData);
      console.log(data);

      const user = new User().initFromObject(data.user);
      user.apiToken = data.token;
      this.setHeaderToken(data.token);

      return Promise.resolve(user);
    } catch (e) {
      console.log(e);

      return Promise.reject(e.response.data);
    }
  }

  async getUsers(from, count, types) {
    let params = {
      from: from,
      count: count,
      types: types,
    };

    try {
      const options = {
        params: params,
        headers: {
          ...this.baseHeader(),
        },
      };

      const {data} = await Axios.get(`${this.baseUrl}/users/all`, options);
      console.log(data);

      const users = [];
      for (const obj of data) {
        const u = new User().initFromObject(obj);
        users.push(u);
      }

      return Promise.resolve(users);
    } catch (e) {
      console.log(e);

      return Promise.reject(e.response.data);
    }
  }

  async getVideos(from, count, type) {
    let params = {
      from: from,
      count: count,
    };

    try {
      const options = {
        params: params,
        headers: {
          ...this.baseHeader(),
        },
      };

      const {data} = await Axios.get(
        type === Video.TYPE_TV
          ? `${this.baseUrl}/video/tvs`
          : `${this.baseUrl}/video/radios`,
        options,
      );
      console.log(data);

      const videos = [];
      for (const obj of data) {
        const v = new Video().initFromObject(obj);
        v.type = type;

        videos.push(v);
      }

      return Promise.resolve(videos);
    } catch (e) {
      console.log(e);

      return Promise.reject(e.response.data);
    }
  }

  async updateUser(firstName, lastName, gender, state, city, zipCode, photo) {
    const formData = new FormData();
    formData.append('firstName', firstName);
    formData.append('lastName', lastName);
    formData.append('gender', gender);
    formData.append('state', state);
    formData.append('city', city);
    formData.append('zipCode', zipCode);

    if (photo) {
      formData.append('photo', photo);
    }

    try {
      const options = {
        headers: {
          ...this.baseHeader(),
        },
      };

      const {data} = await Axios.post(
        `${this.baseUrl}/users`,
        formData,
        options,
      );
      console.log(data);

      const user = new User().initFromObject(data);

      return Promise.resolve(user);
    } catch (e) {
      console.log(e);

      return Promise.reject(e.response.data);
    }
  }

  async updateTeacherInfo(
    ageGroups,
    danceLevels,
    styleBallroom,
    styleRythm,
    styleStandard,
    styleLatin,
    price,
  ) {
    const httpOptions = {
      headers: {
        ...this.baseHeader(),
      },
    };

    const params = {
      ageGroups: ageGroups,
      danceLevels: danceLevels,
      styleBallroom: styleBallroom,
      styleRythm: styleRythm,
      styleStandard: styleStandard,
      styleLatin: styleLatin,
      price: price,
    };

    try {
      const {data} = await Axios.post(
        `${this.baseUrl}/users/update/teacher`,
        params,
        httpOptions,
      );
      console.log(data);

      return Promise.resolve(true);
    } catch (e) {
      console.log(e);

      return Promise.reject(e.response ? e.response.data : e);
    }
  }

  async getPosts(from, count, userId) {
    let params = {
      from: from,
      count: count,
      userId: userId,
    };

    try {
      const options = {
        params: params,
        headers: {
          ...this.baseHeader(),
        },
      };

      const {data} = await Axios.get(`${this.baseUrl}/post`, options);
      console.log(data);

      const posts = [];
      for (const obj of data) {
        const p = new Post().initFromObject(obj);

        posts.push(p);
      }

      return Promise.resolve(posts);
    } catch (e) {
      console.log(e);

      return Promise.reject(e.response.data);
    }
  }

  async addPost(post) {
    const httpOptions = {
      headers: {
        ...this.baseHeader(),
      },
    };

    let params = {
      text: post.text,
      photos: post.photos,
    };

    try {
      const {data} = await Axios.post(
        `${this.baseUrl}/post`,
        params,
        httpOptions,
      );
      console.log(data);

      return Promise.resolve(data);
    } catch (e) {
      console.log(e);

      return Promise.reject(e.response.data);
    }
  }

  async getComments(from, count, postId) {
    let params = {
      from: from,
      count: count,
      postId: postId,
    };

    try {
      const options = {
        params: params,
        headers: {
          ...this.baseHeader(),
        },
      };

      const {data} = await Axios.get(`${this.baseUrl}/post/comments`, options);
      console.log(data);

      const comments = [];
      for (const obj of data) {
        const p = new Comment().initFromObject(obj);

        comments.push(p);
      }

      return Promise.resolve(comments);
    } catch (e) {
      console.log(e);

      return Promise.reject(e.response.data);
    }
  }

  async addComment(comment) {
    const httpOptions = {
      headers: {
        ...this.baseHeader(),
      },
    };

    let params = {
      text: comment.text,
      postId: comment.postId,
    };

    try {
      const {data} = await Axios.post(
        `${this.baseUrl}/post/comment`,
        params,
        httpOptions,
      );
      console.log(data);

      return Promise.resolve(data);
    } catch (e) {
      console.log(e);

      return Promise.reject(e.response.data);
    }
  }
}

const apiService = new ApiService();

export default apiService;
