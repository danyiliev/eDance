import {config} from '../helpers/config';
import Axios from 'axios';
import {User} from '../models/user.model';
import {Video} from '../models/video.model';
import {Post} from '../models/post.model';
import {Comment} from '../models/comment.model';
import {RNS3} from 'react-native-upload-aws-s3';
import {Lesson} from '../models/lesson.model';
import {Review} from '../models/review.model';
import Lessons from '../screens/lessons/Lessons';
import {Alert} from 'react-native';
import {Product} from '../models/product.model';
import {Order} from '../models/order.model';
import {Event, EventSession} from '../models/event.model';
import qs from 'qs';
import {Group} from '../models/group.model';

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

  baseStripUrl = 'https://api.stripe.com/v1';

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

  async getMe() {
    try {
      const options = {
        headers: {
          ...this.baseHeader(),
        },
      };

      const {data} = await Axios.get(`${this.baseUrl}/users/me`, options);
      console.log(data);

      return Promise.resolve(new User().initFromObject(data));
    } catch (e) {
      console.log(e);

      return Promise.reject(e.response.data);
    }
  }

  async getUserReviews(userId) {
    try {
      const options = {
        headers: {
          ...this.baseHeader(),
        },
      };

      const {data} = await Axios.get(`${this.baseUrl}/users/${userId}/reviews`, options);
      console.log(data);

      const reviews = [];
      for (const r of data) {
        const review = new Review().initFromObject(r);
        reviews.push(review);
      }

      return Promise.resolve(reviews);
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

  async updateUserFields(values) {
    const httpOptions = {
      headers: {
        ...this.baseHeader(),
      },
    };

    try {
      const {data} = await Axios.post(`${this.baseUrl}/users/update`, values, httpOptions);
      console.log(data);

      return Promise.resolve(true);
    } catch (e) {
      console.log(e);

      return Promise.reject(e.response ? e.response.data : e);
    }
  }

  // deprecated
  async updateTeacherInfo(
    ageGroups,
    danceLevels,
    styleBallroom,
    styleRythm,
    styleStandard,
    styleLatin,
    price,
    availableDays,
    durationLesson,
    durationRest,
    timeStart,
    timeEnd,
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
      availableDays: availableDays,
      durationLesson: durationLesson,
      durationRest: durationRest,
      timeStart: timeStart,
      timeEnd: timeEnd,
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

  async addUserReview(userId, lessonId, rating, review) {
    const httpOptions = {
      headers: {
        ...this.baseHeader(),
      },
    };

    const params = {rating, review};

    try {
      const {data} = await Axios.post(
        `${this.baseUrl}/users/${userId}/${lessonId}/review`,
        params,
        httpOptions,
      );
      console.log(data);

      return Promise.resolve(new User().initFromObject(data));
    } catch (e) {
      console.log(e);

      return Promise.reject(e.response ? e.response.data : e);
    }
  }

  async getMyReviewToUser(userId) {
    try {
      const options = {
        headers: {
          ...this.baseHeader(),
        },
      };

      const {data} = await Axios.get(`${this.baseUrl}/users/${userId}/review`, options);
      console.log(data);

      let review = null;
      if (data) {
        review = new Review().initFromObject(data);
      }

      return Promise.resolve(review);
    } catch (e) {
      console.log(e);

      return Promise.reject(e.response.data);
    }
  }

  //
  // posts
  //
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
      const {data} = await Axios.post(`${this.baseUrl}/post/comment`, params, httpOptions);
      console.log(data);

      return Promise.resolve(data);
    } catch (e) {
      console.log(e);

      return Promise.reject(e.response.data);
    }
  }

  async addLesson(lesson) {
    const httpOptions = {
      headers: {
        ...this.baseHeader(),
      },
    };

    const timeSlots = lesson.timeSlots.map((t) => t.toString());

    let params = {
      lessonType: lesson.lessonType,
      ageGroup: lesson.ageGroup,
      danceStyle: lesson.danceStyle,
      dance: lesson.dance,
      danceLevel: lesson.danceLevel,
      teacherId: lesson.teacherId,
      groupId: lesson.groupId,
      date: lesson.date,
      timeSlots: timeSlots,
      price: lesson.price,
    };

    try {
      const {data} = await Axios.post(`${this.baseUrl}/lesson`, params, httpOptions);
      console.log(data);

      return Promise.resolve(data);
    } catch (e) {
      console.log(e);

      return Promise.reject(e.response.data);
    }
  }

  async getLessons(userId, forTeach, from, count) {
    let params = {
      from: from,
      count: count,
      userId: userId,
      forTeach: forTeach,
    };

    try {
      const options = {
        params: params,
        headers: {
          ...this.baseHeader(),
        },
      };

      const {data} = await Axios.get(`${this.baseUrl}/lesson`, options);
      console.log(data);

      const lessons = [];
      for (const obj of data) {
        const p = new Lesson().initFromObject(obj);

        lessons.push(p);
      }

      return Promise.resolve(lessons);
    } catch (e) {
      console.log(e);

      return Promise.reject(e.response.data);
    }
  }

  async getLessonsAll(from, count) {
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

      const {data} = await Axios.get(`${this.baseUrl}/lesson/all`, options);
      console.log(data);

      const lessons = [];
      for (const obj of data) {
        const p = new Lesson().initFromObject(obj);

        lessons.push(p);
      }

      return Promise.resolve(lessons);
    } catch (e) {
      console.log(e);

      return Promise.reject(e.response.data);
    }
  }

  async getLessonById(id) {
    try {
      const options = {
        headers: {
          ...this.baseHeader(),
        },
      };

      const {data} = await Axios.get(`${this.baseUrl}/lesson/${id}`, options);
      console.log(data);

      const lesson = new Lesson().initFromObject(data);

      return Promise.resolve(lesson);
    } catch (e) {
      console.log(e);

      return Promise.reject(e.response.data);
    }
  }

  async doLessonAction(lessonId, action) {
    try {
      const options = {
        headers: {
          ...this.baseHeader(),
        },
      };

      const {data} = await Axios.get(`${this.baseUrl}/lesson/${lessonId}/${action}`, options);
      console.log(data);

      return Promise.resolve(data);
    } catch (e) {
      console.log(e);

      return Promise.reject(e.response.data);
    }
  }

  startLesson(lessonId) {
    return this.doLessonAction(lessonId, 'start');
  }

  stopLesson(lessonId) {
    return this.doLessonAction(lessonId, 'stop');
  }

  joinLesson(lessonId) {
    return this.doLessonAction(lessonId, 'join');
  }

  quitLesson(lessonId) {
    return this.doLessonAction(lessonId, 'quit');
  }

  async purchaseLesson(lessonId) {
    const httpOptions = {
      headers: {
        ...this.baseHeader(),
      },
    };

    let params = {lessonId};

    try {
      const {data} = await Axios.post(`${this.baseUrl}/users/lesson/purchase`, params, httpOptions);
      console.log(data);

      return Promise.resolve(data);
    } catch (e) {
      console.log(e);

      return Promise.reject(e.response.data);
    }
  }

  async likeLesson(lessonId, like = true) {
    const httpOptions = {
      headers: {
        ...this.baseHeader(),
      },
    };

    let params = {lessonId, like};

    try {
      const {data} = await Axios.post(`${this.baseUrl}/users/lesson/like`, params, httpOptions);
      console.log(data);

      return Promise.resolve(data);
    } catch (e) {
      console.log(e);

      return Promise.reject(e.response.data);
    }
  }

  async getLessonsByIds(ids) {
    const httpOptions = {
      headers: {
        ...this.baseHeader(),
      },
    };

    let params = {ids};

    try {
      const {data} = await Axios.post(`${this.baseUrl}/lesson/fromIds`, params, httpOptions);
      console.log(data);

      const lessons = [];
      for (const obj of data) {
        const p = new Lesson().initFromObject(obj);

        lessons.push(p);
      }

      return Promise.resolve(lessons);
    } catch (e) {
      console.log(e);

      return Promise.reject(e.response.data);
    }
  }

  async addProduct(product) {
    const httpOptions = {
      headers: {
        ...this.baseHeader(),
      },
    };

    let params = {
      name: product.name,
      desc: product.description,
      price: product.price,
      photos: product.photos,
    };

    try {
      const {data} = await Axios.post(`${this.baseUrl}/product`, params, httpOptions);
      console.log(data);

      return Promise.resolve(data);
    } catch (e) {
      console.log(e);

      return Promise.reject(e.response.data);
    }
  }

  //
  // products
  //
  async getProducts(url, from, count) {
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

      const {data} = await Axios.get(url, options);
      console.log(data);

      const products = [];
      for (const obj of data) {
        const p = new Product().initFromObject(obj);

        products.push(p);
      }

      return Promise.resolve(products);
    } catch (e) {
      console.log(e);

      return Promise.reject(e.response.data);
    }
  }

  getProductsAll(from, count) {
    return this.getProducts(`${this.baseUrl}/product`, from, count);
  }

  getUserProducts(from, count) {
    return this.getProducts(`${this.baseUrl}/product/mine`, from, count);
  }

  async deleteProduct(productId) {
    try {
      const options = {
        headers: {
          ...this.baseHeader(),
        },
      };

      const {data} = await Axios.delete(`${this.baseUrl}/product/${productId}`, options);
      console.log(data);

      return Promise.resolve(data.result);
    } catch (e) {
      console.log(e);

      return Promise.reject(e.response.data);
    }
  }

  async getProductReviews(productId) {
    try {
      const options = {
        headers: {
          ...this.baseHeader(),
        },
      };

      const {data} = await Axios.get(`${this.baseUrl}/product/${productId}/reviews`, options);
      console.log(data);

      const reviews = [];
      for (const r of data) {
        const review = new Review().initFromObject(r);
        reviews.push(review);
      }

      return Promise.resolve(reviews);
    } catch (e) {
      console.log(e);

      return Promise.reject(e.response.data);
    }
  }

  async addProductReview(productId, rating, review) {
    const httpOptions = {
      headers: {
        ...this.baseHeader(),
      },
    };

    const params = {rating, review};

    try {
      const {data} = await Axios.post(`${this.baseUrl}/product/${productId}/review`, params, httpOptions);
      console.log(data);

      let prod = null;
      if (data) {
        prod = new Product().initFromObject(data);
      }

      return Promise.resolve(prod);
    } catch (e) {
      console.log(e);

      return Promise.reject(e.response ? e.response.data : e);
    }
  }

  async addProductToCart(product) {
    const options = {
      headers: {
        ...this.baseHeader(),
      },
    };

    const params = {
      productId: product.id,
      quantity: product.quantity,
    };

    try {
      const {data} = await Axios.post(
        `${this.baseUrl}/users/cart`,
        params,
        options
      );
      console.log(data);

      return Promise.resolve();
    } catch (e) {
      console.log(e);

      return Promise.reject(e.response.data);
    }
  }

  async removeProductFromCart(product) {
    const options = {
      headers: {
        ...this.baseHeader(),
      },
    };

    try {
      const {data} = await Axios.delete(`${this.baseUrl}/users/cart/${product.id}`, options);
      console.log(data);

      return Promise.resolve(data.result);
    } catch (e) {
      console.log(e);

      return Promise.reject(e.response.data);
    }
  }

  async clearCart() {
    const options = {
      headers: {
        ...this.baseHeader(),
      },
    };

    try {
      const {data} = await Axios.delete(`${this.baseUrl}/users/cart`, options);
      console.log(data);

      return Promise.resolve(data);
    } catch (e) {
      console.log(e);

      return Promise.reject(e.response.data);
    }
  }

  async saveDeliveryAddress(address) {
    const options = {
      headers: {
        ...this.baseHeader(),
      },
    };

    const params = {
      building: address.building,
      street: address.street,
      city: address.city,
      state: address.state,
    };

    try {
      const {data} = await Axios.post(`${this.baseUrl}/users/address`, params, options);
      console.log(data);

      return Promise.resolve();
    } catch (e) {
      console.log(e);

      return Promise.reject(e.response.data);
    }
  }

  async makeOrder(amount, products, address) {
    const options = {
      headers: {
        ...this.baseHeader(),
      },
    };

    const params = {
      amount: amount,
      address: address,
      products: [],
    };
    for (const p of products) {
      params.products.push({
        productId: p.id,
        quantity: p.quantity,
      });
    }

    try {
      const {data} = await Axios.post(`${this.baseUrl}/order`, params, options);
      console.log(data);

      return Promise.resolve(data);
    } catch (e) {
      console.log(e);

      return Promise.reject(e.response.data);
    }
  }

  async getOrders(userId, isBuyer, from, count) {
    let params = {
      from: from,
      count: count,
      isBuyer: isBuyer,
    };

    try {
      const options = {
        params: params,
        headers: {
          ...this.baseHeader(),
        },
      };

      const {data} = await Axios.get(`${this.baseUrl}/order`, options);
      console.log(data);

      const orders = [];
      for (const obj of data) {
        const p = new Order().initFromObject(obj);

        orders.push(p);
      }

      return Promise.resolve(orders);
    } catch (e) {
      console.log(e);

      return Promise.reject(e.response.data);
    }
  }

  async addEvent(event) {
    const httpOptions = {
      headers: {
        ...this.baseHeader(),
      },
    };

    let params = {
      title: event.title,
      companyAddress: event.companyAddress,
      phone: event.phone,
      email: event.email,
      prices: event.prices,
      sessions: event.sessions,
      prizeOptions: event.prizeOptions,
    };

    try {
      const {data} = await Axios.post(`${this.baseUrl}/event`, params, httpOptions);
      console.log(data);

      return Promise.resolve(data);
    } catch (e) {
      console.log(e);

      return Promise.reject(e.response.data);
    }
  }

  async getEvents(from, count) {
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

      const {data} = await Axios.get(`${this.baseUrl}/event`, options);
      console.log(data);

      const events = [];
      for (const obj of data) {
        const e = new Event().initFromObject(obj);

        events.push(e);
      }

      return Promise.resolve(events);
    } catch (e) {
      console.log(e);

      return Promise.reject(e.response.data);
    }
  }

  async getEventsByMonth(month) {
    try {
      const options = {
        headers: {
          ...this.baseHeader(),
        },
      };

      const {data} = await Axios.get(`${this.baseUrl}/event/${month}`, options);
      console.log(data);

      const events = [];
      for (const obj of data) {
        const e = new Event().initFromObject(obj);

        events.push(e);
      }

      return Promise.resolve(events);
    } catch (e) {
      console.log(e);

      return Promise.reject(e.response.data);
    }
  }

  async getEventSessionById(eventId, sessionId) {
    try {
      const options = {
        headers: {
          ...this.baseHeader(),
        },
      };

      const {data} = await Axios.get(`${this.baseUrl}/event/${eventId}/session/${sessionId}`, options);
      console.log(data);

      const session = new EventSession().initFromObject(data);

      return Promise.resolve(session);
    } catch (e) {
      console.log(e);

      return Promise.reject(e.response.data);
    }
  }

  async applyEventSession(entry, eventId, sessionId) {
    try {
      const options = {
        headers: {
          ...this.baseHeader(),
        },
      };

      const body = {
        gender: entry.gender,
        studio: entry.studio,
        email: entry.email,
        phone: entry.phone,
        fax: entry.fax,
        address: entry.address,
        city: entry.city,
        state: entry.state,
        applies: entry.applies,
        user: entry.userId,
      };

      if (entry.teacherId) {
        body.teacher = entry.teacherId;
      }

      const {data} = await Axios.post(
        `${this.baseUrl}/event/${eventId}/session/${sessionId}/apply`,
        body,
        options,
      );
      console.log(data);

      return Promise.resolve(data);
    } catch (e) {
      console.log(e);

      return Promise.reject(e.response.data);
    }
  }

  async addGroup(group) {
    const httpOptions = {
      headers: {
        ...this.baseHeader(),
      },
    };

    let params = {
      name: group.name,
      danceLevels: group.danceLevels,
      styleBallroom: group.styleBallroom,
      styleRythm: group.styleRythm,
      styleStandard: group.styleStandard,
      styleLatin: group.styleLatin,
    };

    try {
      const url = group.id ? `${this.baseUrl}/lesson/group/${group.id}` : `${this.baseUrl}/lesson/group`;
      const {data} = await Axios.post(url, params, httpOptions);
      console.log(data);

      return Promise.resolve(data);
    } catch (e) {
      console.log(e);

      return Promise.reject(e.response.data);
    }
  }

  async getGroups(from, count) {
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

      const {data} = await Axios.get(`${this.baseUrl}/lesson/group`, options);
      console.log(data);

      const groups = [];
      for (const obj of data) {
        const g = new Group().initFromObject(obj);

        groups.push(g);
      }

      return Promise.resolve(groups);
    } catch (e) {
      console.log(e);

      return Promise.reject(e.response.data);
    }
  }

  async getGroupsAll(from, count) {
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

      const {data} = await Axios.get(`${this.baseUrl}/lesson/group/all`, options);
      console.log(data);

      const groups = [];
      for (const obj of data) {
        const g = new Group().initFromObject(obj);

        groups.push(g);
      }

      return Promise.resolve(groups);
    } catch (e) {
      console.log(e);

      return Promise.reject(e.response.data);
    }
  }

  async deleteGroup(groupId) {
    try {
      const options = {
        headers: {
          ...this.baseHeader(),
        },
      };

      const {data} = await Axios.delete(`${this.baseUrl}/lesson/group/${groupId}`, options);
      console.log(data);

      return Promise.resolve(data.result);
    } catch (e) {
      console.log(e);

      return Promise.reject(e.response.data);
    }
  }

  //
  // Stripe
  //
  async stripeCreateAccount(email) {
    let resp = await Axios.post(
      this.baseStripUrl + '/accounts',
      qs.stringify({
        email: email,
        type: 'standard',
      }),
      {
        headers: {
          Authorization: 'Bearer ' + config.stripeSecretKey,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      },
    );

    console.log(resp.data);

    return Promise.resolve(resp.data);
  }

  async stripeGetAccountDetail(accId) {
    let resp = await Axios.get(`${this.baseStripUrl}/accounts/${accId}`, {
      headers: {
        Authorization: 'Bearer ' + config.stripeSecretKey,
      },
    });
    console.log(resp);

    return Promise.resolve(resp.data);
  }

  async stripeCreateAccountLink(accId) {
    let resp = await Axios.post(
      this.baseStripUrl + '/account_links',
      qs.stringify({
        account: accId,
        type: 'account_onboarding',
        return_url: config.stripeReturnUrl,
        refresh_url: config.stripeRefreshUrl,
      }),
      {
        headers: {
          Authorization: 'Bearer ' + config.stripeSecretKey,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      },
    );

    console.log(resp.data);

    return Promise.resolve(resp.data);
  }

  async stripeCreateCharge(token, amount, desc = '', toAccount = null) {
    const headers = {
      Authorization: 'Bearer ' + config.stripeSecretKey,
      'Content-Type': 'application/x-www-form-urlencoded',
    };

    if (toAccount) {
      headers['Stripe-Account'] = toAccount;
    }

    let resp = await Axios.post(
      `${this.baseStripUrl}/charges`,
      qs.stringify({
        source: token,
        amount: amount * 100,
        currency: 'usd',
        description: desc,
      }),
      {
        headers: headers,
      },
    );
    console.log(resp.data);

    return Promise.resolve(resp.data);
  }
}

const apiService = new ApiService();

export default apiService;
