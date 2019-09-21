import * as types from '@/store/types';

export default {
  [types.FETCH_PROFILE_SUCCESS](state, user) {
    state.user = user;
  },

  [types.FETCH_PROFILE_FAILURE](state) {
    state.user = {};
  },
};
