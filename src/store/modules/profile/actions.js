import * as types from '@/store/types';
import ProfileService from '@/services/ProfileService';

export default {
  async fetch({ commit }) {
    try {
      const { data: { data } } = await ProfileService.fetch();
      commit(types.FETCH_PROFILE_SUCCESS, data);
    } catch (e) {
      commit(types.FETCH_PROFILE_FAILURE);
    }
  },
};
