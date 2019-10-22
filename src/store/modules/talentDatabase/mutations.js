import * as types from '@/store/types';

export default {
  [types.FETCH_TALENT_DATABASE_LIST_SUCCESS](state, talentList) {
    state.talentList = talentList;
  },

  [types.FETCH_TALENT_DATABASE_LIST_FAILURE](state) {
    state.talentList = {};
  },
};
