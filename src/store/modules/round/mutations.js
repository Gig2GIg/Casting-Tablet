import * as types from '@/store/types';

export default {
  [types.FETCH_ROUNDS_SUCCESS](state, rounds) {
    state.rounds = rounds;
  },

  [types.FETCH_ROUNDS_FAILURE](state) {
    state.rounds = {};
  },
};
