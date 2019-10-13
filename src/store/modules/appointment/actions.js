import axios from 'axios';
import * as types from '@/store/types';
import AuditionService from '@/services/AuditionService';

export default {
  async fetch({ commit }, audition) {
    try {
      const { data: { data } } = await axios.get(`appointments/auditions/${audition}`);
      console.log(data);
      commit(types.FETCH_APPOINTMENTS_SUCCESS, data);
    } catch (e) {
      commit(types.FETCH_APPOINTMENTS_FAILURE);
    }
  },
};
