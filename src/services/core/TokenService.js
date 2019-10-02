import Cookies from 'js-cookie';

const USER_KEY = 'user';
const TOKEN_KEY = 'token';
const EXPIRATION_DAYS = 365;

export default {
  /**
   * Get user id from cookie.
   *
   * @returns {string|null}
   */
  getUserId() {
    return Cookies.get(USER_KEY);
  },

  /**
   * Get token from cookie.
   *
   * @returns {string|null}
   */
  getToken() {
    return Cookies.get(TOKEN_KEY);
  },

  /**
   * Set token in cookies.
   *
   * @param {string} token
   */
  setToken(id, token) {
    Cookies.set(USER_KEY, id, { expires: EXPIRATION_DAYS });
    Cookies.set(TOKEN_KEY, token, { expires: EXPIRATION_DAYS });
  },

  /**
   * Remove token from cookies.
   */
  removeToken() {
    Cookies.remove(USER_KEY);
    Cookies.remove(TOKEN_KEY);
  },
};
