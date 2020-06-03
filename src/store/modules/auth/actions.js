import * as types from '@/store/types';
import AuthService from '@/services/AuthService';
import TokenService from '../../../services/core/TokenService';

export default {
  async login({ commit, dispatch }, credentials) {
    const loginData = await AuthService.login(credentials);
    commit(types.SET_TOKEN, loginData.access_token);
    await dispatch('profile/setProfile', loginData.user, { root: true })
    await TokenService.setUserData(loginData.user);
    return loginData;
  },

  logout({ commit, dispatch }) {
    AuthService.logout();
    commit(types.SET_TOKEN, null);
    dispatch('profile/removeProfile', {}, { root: true })
  },
};
