import axios from 'axios';
import * as types from '@/store/types';
import AuditionService from '@/services/AuditionService';

export default {
  async fetchUserFeedback({ commit }, audition) {
    try {
      const { data: { data } } = await axios.get(`/t/auditions/${audition.round}/feedbacks/details?user_id=${audition.user}`);
      commit(types.FETCH_USER_FEEDBACK_SUCCESS, data);
    } catch (e) {
      commit(types.FETCH_USER_FEEDBACK_FAILURE);
    }
  },

  async storeTag({ commit }, audition){
    try {
      const { data: { data } } = await axios.post(`/t/auditions/feedbacks/tags`, audition);
      return true;
      // commit(types.ADD_TAGS_SUCCESS, data);
    } catch (e) {
      return false;
      // commit(types.ADD_TAGS_FAILURE);
    }
  },

  async storeRecommendation({ commit }, audition){
    try {
      const { data: { data } } = await axios.post(`/t/auditions/feeback/recommendations-marketplaces`, audition);
      return true;
      // commit(types.ADD_TAGS_SUCCESS, data);
    } catch (e) {
      return false;
      // commit(types.ADD_TAGS_FAILURE);
    }
  },

  async fetchTags({ commit }, audition) {
    try {
      const { data: { data } } = await axios.get(`/t/auditions/${audition.round}/user/tags?user_id=${audition.user}`);
      commit(types.FETCH_TAGS_SUCCESS, data);
    } catch (e) {
      commit(types.FETCH_TAGS_FAILURE);
    }
  },

  async fetchRecommendation({ commit }, audition) {
    try {
      const { data: { data } } = await axios.get(`/t/auditions/${audition.round}/feeback/recommendations-marketplaces-by-user?user_id=${audition.user}`);
      commit(types.FETCH_RECOMMENDATION_SUCCESS, data);
    } catch (e) {
      commit(types.FETCH_RECOMMENDATION_FAILURE);
    }
  },

  async searchMarketplace({ commit }, search) {
    try {
      const { data: { data } } = await axios.get(`/t/marketplaces/search?value=${search}`);
      commit(types.SEARCH_MARKETPLACE_SUCCESS, data);
    } catch (e) {
      commit(types.SEARCH_MARKETPLACE_FAILURE);
    }
  },

  
  
  async delete({ commit }, tag) {
    try {
      const { data: { data } } = await axios.delete(`/t/auditions/feedbacks/tags/${tag.id}/delete`);
      // commit(types.CLOSE_ROUND_SUCCESS, data);
    } catch (e) {
      // commit(types.CLOSE_ROUND_FAILURE);
    }
  },

  async deleteRecommendation({ commit }, recommendation) {
    try {
      const { data: { data } } = await axios.delete(`/t/auditions/feeback/recommendations-marketplaces/${recommendation.id}/delete`);
      // commit(types.CLOSE_ROUND_SUCCESS, data);
    } catch (e) {
      // commit(types.CLOSE_ROUND_FAILURE);
    }
  },
};
