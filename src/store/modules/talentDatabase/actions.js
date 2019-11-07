import axios from 'axios';
import * as types from '@/store/types';
import AuditionService from '@/services/AuditionService';

export default {
  async fetch ({ commit }) {
    try {
      const { data: { data } } = await axios.get('/t/performers/list');
      debugger;
      commit(types.FETCH_TALENT_DATABASE_LIST_SUCCESS, data);
    } catch (e) {
      console.log(e);
      commit(types.FETCH_TALENT_DATABASE_LIST_FAILURE);
    }
  },

  async filter ({ commit }, item) {
    try {
      const { data: { data } } = await axios.post('/t/performers/filter', item);
      debugger;
      commit(types.FETCH_TALENT_DATABASE_LIST_SUCCESS, data);
    } catch (e) {
      console.log(e);
      commit(types.FETCH_TALENT_DATABASE_LIST_FAILURE);
    }
  },
  
};
