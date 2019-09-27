import mutations from './mutations';
import actions from './actions';
import getters from './getters';

const state = {
  auditions: [],
  upcoming: [],
  passed: [],
  userList: [],
  audition: [],
};

export default {
  state,
  mutations,
  actions,
  getters,
};
