import * as types from '@/store/types';
import AuthService from '@/services/AuthService';

export default {
  async login({ commit }, credentials) {
    const token = await AuthService.login(credentials);
    commit(types.SET_TOKEN, token);
  },

  logout({ commit }) {
    AuthService.logout();
    commit(types.SET_TOKEN, null);
  },
};
