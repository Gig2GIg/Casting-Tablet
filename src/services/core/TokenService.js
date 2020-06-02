import Cookies from 'js-cookie';

const USER_KEY = 'user';
const TOKEN_KEY = 'token';
const USER_DETAILS_KEY = 'user_data';
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
   * Set user data in cookies.
   *
   * @param {object} token
   */
  setUserData(user_data) {
    Cookies.set(USER_DETAILS_KEY, btoa(JSON.stringify(user_data)), { expires: EXPIRATION_DAYS });
  },

  /**
   * Get user data from cookie.
   *
   * @returns {object|null}
   */
  getUserData() {
    const data = Cookies.get(USER_DETAILS_KEY);
    return data ? JSON.parse(atob(data)) : null;
  },

  /**
   * Remove token from cookies.
   */
  removeToken() {
    Cookies.remove(USER_KEY);
    Cookies.remove(TOKEN_KEY);
    Cookies.remove(USER_DETAILS_KEY);
  },
};
