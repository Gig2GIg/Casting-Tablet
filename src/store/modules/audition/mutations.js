import * as types from '@/store/types';

export default {
  [types.FETCH_AUDITIONS_SUCCESS](state, auditions) {
    state.auditions = auditions;
  },

  [types.FETCH_AUDITIONS_FAILURE](state) {
    state.auditions = {};
  },

  [types.FETCH_UPCOMING_AUDITIONS_SUCCESS](state, upcoming) {
    state.upcoming = upcoming;
  },

  [types.FETCH_UPCOMING_AUDITIONS_FAILURE](state) {
    state.upcoming = {};
  },

  [types.FETCH_PASSED_AUDITIONS_SUCCESS](state, passed) {
    state.passed = passed;
  },

  [types.FETCH_PASSED_AUDITIONS_FAILURE](state) {
    state.passed = {};
  },

  [types.FETCH_USER_LIST_AUDITION_SUCCESS](state, userList) {
    state.userList = userList;
  },

  [types.FETCH_USER_LIST_AUDITION_FAILURE](state) {
    state.passed = {};
  },

  [types.FETCH_AUDITION_DATA_SUCCESS](state, audition) {
    state.audition = audition;
  },

  [types.FETCH_AUDITION_DATA_FAILURE](state) {
    state.passed = {};
  },
};
