import Service from './Service';

class ProfileService extends Service {
  /**
   * @type {string}
   */
  apiResource = '/profile';
}

export default new ProfileService();
