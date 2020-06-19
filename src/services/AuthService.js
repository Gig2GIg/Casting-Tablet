import uuid from 'uuid/v1';
import firebase from 'firebase/app';
import BaseService from './core/BaseService';
import HttpService from './core/HttpService';
import TokenService from './core/TokenService';
import 'firebase/storage';

class AuthService extends BaseService {
  async login(credentials) {
    // eslint-disable-next-line camelcase
    const { data: { data, access_token } } = await this.post('/login', credentials);
    // const { data: { data } } = await this.post('/login', credentials);
    // debugger;
    // Save token
    await TokenService.setToken(data.id, access_token);
    // user data
    await TokenService.setUserData(data);
    // Configure HttpClient with the new token
    await HttpService.setAuthorizationHeader(access_token);
    await HttpService.mount401Interceptor();

    // eslint-disable-next-line camelcase
    return {
      access_token: access_token,
      user: data
    };
  }

  async register(user) {
    let userData = user;
    // upload cover thumbnail file
    let profileThumbnailUrl;
    if (user.profileThumbnail && user.profileThumbnail.file) {
      const thumbnailFileSnapshot = await firebase.storage()
        .ref(`profileImage/thumbnail/${uuid()}.png`)
        .put(user.profileThumbnail.file);
      profileThumbnailUrl = await thumbnailFileSnapshot.ref.getDownloadURL();
    }

    // const imageName = userData.image.name;
    const profileExtension = userData.profileNameObject.org_name.substring(userData.profileNameObject.org_name.lastIndexOf('.') + 1);
    const profileFilePath = userData.profileNameObject.name.includes(`${profileExtension}`) ? `profileImage/${uuid()}_${userData.profileNameObject.name}` : `profileImage/${uuid()}_${userData.profileNameObject.name}.${profileExtension}`;

    const snapshot = await firebase.storage()
      .ref(profileFilePath)
      .put(userData.image);

    userData.image = await snapshot.ref.getDownloadURL();
    userData.thumbnail = profileThumbnailUrl ? profileThumbnailUrl : null;

    const { data: { data } } = await this.post('/users/create', {
      ...userData,
      resource_name: userData.profileNameObject.name,
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
