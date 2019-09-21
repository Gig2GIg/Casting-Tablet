import getters from './getters';
import actions from './actions';
import mutations from './mutations';
import TokenService from '@/services/core/TokenService';

const state = {
  token: TokenService.getToken(),
};

export default {
  state,
  getters,
  actions,
  mutations,
};
