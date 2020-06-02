import * as types from '@/store/types';
import TokenService from '../../../services/core/TokenService';

export default {
  [types.FETCH_PROFILE_SUCCESS](state, user) {
    state.user = user;
    TokenService.setUserData(state.user);
  },

  [types.FETCH_PROFILE_FAILURE](state) {
    state.user = {};
  },

  [types.FETCH_PROFILE_T_SUCCESS](state, tuser) {
    state.tuser = tuser;
  },

  [types.FETCH_PROFILE_T_FAILURE](state) {
    state.tuser = {};
  },

  [types.FETCH_MY_CALENDAR_SUCCESS](state, calendar) {
    state.calendar = calendar;
  },

  [types.FETCH_MY_CALENDAR_FAILURE](state) {
    state.calendar = {};
  },

  [types.FETCH_CONTRACT_SUCCESS](state, contract) {
    state.contract = contract;
  },

  [types.FETCH_CONTRACT_FAILURE](state) {
    state.contract = {};
  },
};
