import * as types from '@/store/types';

export default {
  [types.SET_TOKEN](state, token) {
    state.token = token;
  },
};
