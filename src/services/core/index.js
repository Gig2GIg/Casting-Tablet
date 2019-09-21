import HttpService from './HttpService';
import TokenService from './TokenService';

HttpService.setBaseURL(process.env.VUE_APP_API_URL);

const token = TokenService.getToken();

if (token) {
  HttpService.setAuthorizationHeader(token);
  HttpService.mount401Interceptor();
}
