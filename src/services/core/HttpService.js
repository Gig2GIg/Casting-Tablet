import axios from 'axios';
import store from '@/store';

let interceptor = null;

export default {
  /**
   * Set base URL for any requests.
   *
   * @param {string} url
   */
  setBaseURL(url) {
    axios.defaults.baseURL = url;
  },

  /**
   * Set Authorization header with Bearer token.
   *
   * @param {string} token
   */
  setAuthorizationHeader(token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  },

  /**
   * Remove Authorization header.
   */
  removeAuthorizationHeader() {
    delete axios.defaults.headers.common.Authorization;
  },

  /**
   * Intercept 401 error responses for redirect.
   */
  mount401Interceptor() {
    interceptor = axios.interceptors.response.use(
      response => response,
      (error) => {
        if (error.response.status === 401) {
          store.dispatch('auth/logout', { root: true });
        }
        throw error;
      },
    );
  },

  /**
   * Remove 401 error response interceptor.
   */
  unmount401Interceptor() {
    axios.interceptors.response.eject(interceptor);
  },
};
