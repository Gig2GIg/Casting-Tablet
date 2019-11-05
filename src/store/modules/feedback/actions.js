import axios from 'axios';
import * as types from '@/store/types';
import AuditionService from '@/services/AuditionService';

export default {
  async fetchUserFeedback({ commit }, audition) {
    try {
      const { data: { data } } = await axios.get(`/t/auditions/${audition.round}/feedbacks/details?user_id=${audition.user}`);
      console.log(data);
      commit(types.FETCH_USER_FEEDBACK_SUCCESS, data);
    } catch (e) {
      commit(types.FETCH_USER_FEEDBACK_FAILURE);
    }
  },

  async addTags({ commit }, audition){
    try {
      const { data: { data } } = await axios.put(`/t/auditions/${audition.round}/feedbacks/user/tags`, audition);
      // commit(types.ADD_TAGS_SUCCESS, data);
    } catch (e) {
      // commit(types.ADD_TAGS_FAILURE);
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
