import * as types from '@/store/types';

export default {
  [types.FETCH_USER_FEEDBACK_SUCCESS](state, feedback) {
    state.feedback = feedback;
  },

  [types.FETCH_USER_FEEDBACK_FAILURE](state) {
    state.feedback = {};
  },
};
