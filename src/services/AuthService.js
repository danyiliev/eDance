import ApiService from './ApiService';
import AsyncStorage from '@react-native-community/async-storage';
import {CURRENT_USER} from '../constants/storage-key';

class AuthService {
  signIn(email: string, password: string) {
    return ApiService.signIn(email, password);
  }

  signOut() {
    // remove user from local storage
    AsyncStorage.removeItem(CURRENT_USER);
  }
}

const authService = new AuthService();

export default authService;
