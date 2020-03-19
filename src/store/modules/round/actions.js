import axios from 'axios';
import * as types from '@/store/types';
import AuditionService from '@/services/AuditionService';

export default {
  async fetch({ commit }, audition) {
    try {
      const { data: { data } } = await axios.get(`t/appointment/${audition}/rounds`);
      commit(types.FETCH_ROUNDS_SUCCESS, data);
    } catch (e) {
      commit(types.FETCH_ROUNDS_FAILURE);
    }
  },

  
  async closeRound({ commit }, closeRound) {
    try {
      const { data: { data } } = await axios.put(`/t/appointment/${closeRound}/rounds`, {"status": false});
      // commit(types.CLOSE_ROUND_SUCCESS, data);
    } catch (e) {
      // commit(types.CLOSE_ROUND_FAILURE);
    }
  },
};
