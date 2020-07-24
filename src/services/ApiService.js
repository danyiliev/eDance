import {config} from '../helpers/config';
import Axios from 'axios';
import {User} from '../models/user.model';

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
}

const apiService = new ApiService();

export default apiService;
