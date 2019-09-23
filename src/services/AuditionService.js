import Service from './Service';

class AuditionService extends Service {
  all() {
    return this.get('/show');
  }
}

export default new AuditionService();
