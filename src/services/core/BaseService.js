import axios from 'axios';

export default class BaseService {
  /**
   * @type {string}
   */
  apiResource = '';

  /**
   * Remove double slashes.
   *
   * @param {string} start
   * @param {string} end
   * @returns {string}
   */
  static normalize(start, end) {
    return `${start}${end}`.replace(/\/{2,}/g, '/');
  }

  get(url, config = null) {
    return axios.get(this.constructor.normalize(this.apiResource, url), config);
  }

  post(url, data, config = null) {
    return axios.post(this.constructor.normalize(this.apiResource, url), data, config);
  }

  put(url, data, config = null) {
    return axios.put(this.constructor.normalize(this.apiResource, url), data, config);
  }

  patch(url, data, config = null) {
    return axios.patch(this.constructor.normalize(this.apiResource, url), data, config);
  }

  delete(url, config = null) {
    return axios.delete(this.constructor.normalize(this.apiResource, url), config);
  }
}
