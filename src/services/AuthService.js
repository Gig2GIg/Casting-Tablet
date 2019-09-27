import BaseService from './core/BaseService';
import HttpService from './core/HttpService';
import TokenService from './core/TokenService';

class AuthService extends BaseService {
  async login(credentials) {
    const { data: { access_token } } = await this.post('/login', credentials);

    // Save token
    TokenService.setToken(access_token);

    // Configure HttpClient with the new token
    HttpService.setAuthorizationHeader(access_token);
    HttpService.mount401Interceptor();

    return access_token;
  }

  async register(user) {
    const { data: { data } } = await this.post('/users/create', {
      ...user,
      type: 2,
      union_member: [
        {
          name: 'test1',
        },
      ],
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
