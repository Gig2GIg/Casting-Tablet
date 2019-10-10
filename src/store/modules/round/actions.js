import * as types from '@/store/types';
import AuditionService from '@/services/AuditionService';
import axios from "axios";

export default {
  async fetch({ commit }, audition) {
    try {
      const {data: { data }} = await axios.get(`t/appointment/${audition}/rounds`);
      console.log(data);
      commit(types.FETCH_ROUNDS_SUCCESS, data);
    } catch (e) {
      commit(types.FETCH_ROUNDS_FAILURE);
    }
  },
};
