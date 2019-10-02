import uuid from 'uuid/v1';
import firebase from 'firebase/app';
import BaseService from './core/BaseService';
import HttpService from './core/HttpService';
import TokenService from './core/TokenService';
import 'firebase/storage';

class AuthService extends BaseService {
  async login(credentials) {
    const { data: { token } } = await this.post('/admin/login', credentials);

    // Save token
    TokenService.setToken(token);

    // Configure HttpClient with the new token
    HttpService.setAuthorizationHeader(token);
    HttpService.mount401Interceptor();

    return token;
  }

  async register(user) {
    const userData = user;

    // Upload avatar
    const imageName = userData.image.name;
    const snapshot = await firebase.storage()
      .ref(`profileImage/${uuid()}.${imageName.split('.').pop()}`)
      .put(userData.image);

    userData.image = await snapshot.ref.getDownloadURL();

    const { data: { data } } = await this.post('/users/create', {
      ...userData,
      resource_name: imageName,
      type: '1',
    });

    return data;
  }

  async sendPasswordResetNotification(email) {
    const { data } = await this.post('/password/email', { email });
    return data;
  }

  async updatePassword(user) {
    const { data } = await this.post('/password/reset', user);
    return data;
  }

  // eslint-disable-next-line class-methods-use-this
  logout() {
    // Remove token from cookies
    TokenService.removeToken();

    // Remove all traces of the token
    HttpService.removeAuthorizationHeader();
    HttpService.unmount401Interceptor();
  }
}

export default new AuthService();
