import uuid from 'uuid/v1';
import firebase from 'firebase/app';
import BaseService from './core/BaseService';
import HttpService from './core/HttpService';
import TokenService from './core/TokenService';
import 'firebase/storage';

class AuthService extends BaseService {
  async login(credentials) {
    // eslint-disable-next-line camelcase
    const { data: { data: { id }, access_token } } = await this.post('/login', credentials);
    // debugger;
    // Save token
    TokenService.setToken(id, access_token);
    // Configure HttpClient with the new token
    HttpService.setAuthorizationHeader(access_token);
    HttpService.mount401Interceptor();

    // eslint-disable-next-line camelcase
    return access_token;
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
    const { data } = await this.post('/remember', { email });
    return data;
  }

  async resetPassword(parmas) {
    const { data } = await this.post('/reset-password', parmas);
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
