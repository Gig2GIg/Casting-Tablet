import axios from 'axios';
import * as types from '@/store/types';
import AuditionService from '@/services/AuditionService';
import _ from "lodash";

export default {
  async fetch({ commit }) {
    try {
      const { data } = await AuditionService.all();
      commit(types.FETCH_AUDITIONS_SUCCESS, data);
    } catch (e) {
      commit(types.FETCH_AUDITIONS_FAILURE);
    }
  },

  async fetchUpcoming({ commit }) {
    try {
      const { data: { data } } = await axios.get('/t/auditions/upcoming');
      commit(types.FETCH_UPCOMING_AUDITIONS_SUCCESS, data);
    } catch (e) {
      console.log(e);
      commit(types.FETCH_UPCOMING_AUDITIONS_FAILURE);
    }
  },

  async fetchPassed({ commit }) {
    try {
      const { data: { data } } = await axios.get('/t/auditions/passed');
      commit(types.FETCH_PASSED_AUDITIONS_SUCCESS, data);
    } catch (e) {
      commit(types.FETCH_PASSED_AUDITIONS_FAILURE);
    }
  },

  async fetchUserList({ commit }, audition) {
    try {
      let { data: { data } } = await axios.get(`/appointments/auditions/${audition}`);
      data = _.orderBy(data, 'time', 'asc'); 
      commit(types.FETCH_USER_LIST_AUDITION_SUCCESS, data);
    } catch (e) {
      commit(types.FETCH_USER_LIST_AUDITION_FAILURE);
    }
  },
  async fetchIndividualUserList({ commit }, audition) {
    try {
      let { data: { data } } = await axios.get(`/t/auditions/${audition}/individualPerformers`);
      data = _.orderBy(data, 'time', 'asc'); 
      commit(types.FETCH_USER_LIST_AUDITION_SUCCESS, data);
    } catch (e) {
      commit(types.FETCH_USER_LIST_AUDITION_FAILURE);
    }
  },

  async fetchFinalCastList({ commit }, audition) {
    try {
      const { data: { data } } = await axios.get(`/t/finalcast/${audition}/audition`);
      commit(types.FETCH_FINAL_CAST_LIST_AUDITION_SUCCESS, data);
    } catch (e) {
      commit(types.FETCH_FINAL_CAST_LIST_AUDITION_FAILURE);
    }
  },

  async fetchAuditionData({ commit }, audition) {
    try {
      const { data: { data } } = await axios.get(`/auditions/show/${audition}`);

      commit(types.FETCH_AUDITION_DATA_SUCCESS, data);z
    } catch (e) {
      commit(types.FETCH_AUDITION_DATA_FAILURE);
    }
  },

  async fetchAuditionDataNew({ commit }, audition) {
    try {
      const { data: { data } } = await axios.get(`/auditions/show/${audition}`);

      commit(types.FETCH_AUDITION_DATA_SUCCESS, data);
      return data;
    } catch (e) {
      commit(types.FETCH_AUDITION_DATA_FAILURE);
      return {};
    }
  },

  async fetchOnlineMedia({ commit }, item) {
    try {
      const { data: { data } } = await axios.get(`/media/online?appointment_id=${item.round}&performer_id=${item.user}`);
      commit(types.FETCH_ONLINE_MEDIA_SUCCESS, data);
    } catch (e) {
      console.log(e);
      commit(types.FETCH_ONLINE_MEDIA_FAILURE);
    }
  },

  async getVideosListByRound({ commit }, audition) {
    try {
      // console.log(
      //   "audition", audition
      // );
      const { data: { data } } = await axios.get(`/t/audition/${audition.id}/round/${audition.round}/videos`);

      commit(types.FETCH_AUDITION_VIDEOS_SUCCESS, data);
    } catch (e) {
      commit(types.FETCH_AUDITION_VIDEOS_FAILURE);
    }
  },

  async deleteVideo({ commit }, params) {
    try {
      const { data: { data } } = await axios.delete(`/t/auditions/video/delete/${params.id}/${params.audition_id}`);
      commit(types.VIDEO_DELETE_SUCCESS, data);
    } catch (e) {
      commit(types.VIDEO_DELETE_FAILURE);
    }
  },

  async listVideos({ commit }, audition) {
    try {
      const { data: { data } } = await axios.get(`/t/auditions/video/list/${audition}`);
      commit(types.FETCH_AUDITION_VIDEOS_SUCCESS, data);
    } catch (e) {
      commit(types.FETCH_AUDITION_VIDEOS_FAILURE);
    }
  },

  async openAudition({ commit }, audition) {
    try {
      const { data: { data } } = await axios.put(`/t/auditions/open/${audition}`);
      commit(types.OPEN_AUDITION_SUCCESS, data);
    } catch (e) {
      commit(types.OPEN_AUDITION_FAILURE);
    }
  },

  async closeAudition({ commit }, audition) {
    try {
      const { data: { data } } = await axios.put(`/t/auditions/close/${audition}`);
      commit(types.OPEN_AUDITION_SUCCESS, data);
    } catch (e) {
      commit(types.OPEN_AUDITION_FAILURE);
    }
  },

  async fetchTeamFeedback({ commit }, audition) {
    try {
      const { data: { data } } = await axios.get(`/t/feedbacks/list?appointment_id=${audition.appointment_id}&performer=${audition.performer}`);
      commit(types.FETCH_TEAM_FEEDBACK_SUCCESS, data);
    } catch (e) {
      commit(types.FETCH_TEAM_FEEDBACK_FAILURE);
    }
  },
  async addPerformer({ commit }, performer) {
    try {
      const { data: { data } } = await axios.post('/t/finalcast', performer);
      commit(types.ADD_FINAL_CAST_PERFORMER_SUCCESS, data);
      return data;
    } catch (e) {
      commit(types.ADD_FINAL_CAST_PERFORMER_FAILURE);
    }
  },
  async removePerformer({ commit }, performer) {
    try {
      const { data: { data } } = await axios.delete(`/t/finalcast/${performer}`);
      commit(types.DELETE_FINAL_CAST_PERFORMER_SUCCESS, data);
    } catch (e) {
      commit(types.DELETE_FINAL_CAST_PERFORMER_FAILURE);
    }
  },
};
