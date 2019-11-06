import * as types from '@/store/types';

export default {
  [types.FETCH_USER_FEEDBACK_SUCCESS](state, feedback) {
    state.feedback = feedback;
  },

  [types.FETCH_USER_FEEDBACK_FAILURE](state) {
    state.feedback = {};
  },
  [types.FETCH_TAGS_SUCCESS](state, tags) {
    state.tags = tags;
  },

  [types.FETCH_TAGS_FAILURE](state) {
    state.tags = {};
  },

  [types.SEARCH_MARKETPLACE_SUCCESS](state, marketplace) {
    state.marketplace = marketplace;
  },

  [types.SEARCH_MARKETPLACE_FAILURE](state) {
    state.marketplace = {};
  },

  [types.FETCH_RECOMMENDATION_SUCCESS](state, recommendations) {
    state.recommendations = recommendations;
  },

  [types.FETCH_RECOMMENDATION_FAILURE](state) {
    state.recommendations = {};
  },

  
};
