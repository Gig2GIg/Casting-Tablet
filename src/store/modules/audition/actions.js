import * as types from '@/store/types';
import AuditionService from '@/services/AuditionService';
import axios from "axios";

export default {
  async fetch({ commit }) {
    try {
      const { data } = await AuditionService.all();
      console.log(data);
      commit(types.FETCH_AUDITIONS_SUCCESS, data);
    } catch (e) {
      commit(types.FETCH_AUDITIONS_FAILURE);
    }
  },

  async fetchUpcoming({ commit }) {
    try {
      const {data: { data }}  = await axios.get("/t/auditions/upcoming");
      console.log(data);
      commit(types.FETCH_UPCOMING_AUDITIONS_SUCCESS, data);
    } catch (e) {
      console.log(e);
      commit(types.FETCH_UPCOMING_AUDITIONS_FAILURE);
    }
  },

  async fetchPassed({ commit }) {
    try {
      const {data: { data }} = await axios.get("/t/auditions/passed");
      console.log(data);
      commit(types.FETCH_PASSED_AUDITIONS_SUCCESS, data);
    } catch (e) {
      commit(types.FETCH_PASSED_AUDITIONS_FAILURE);
    }
  },

  async fetchUserList({ commit }, audition) {
    try {
      const {data: { data }} = await axios.get(`/appointments/auditions/${audition}`);
      console.log(data);
      commit(types.FETCH_USER_LIST_AUDITION_SUCCESS, data);
    } catch (e) {
      commit(types.FETCH_USER_LIST_AUDITION_FAILURE);
    }
  },

  async fetchAuditionData({ commit }, audition) {
    try {
      const {data: { data }} = await axios.get(`/auditions/show/${audition}`);
      console.log(data);
      commit(types.FETCH_AUDITION_DATA_SUCCESS, data);
    } catch (e) {
      commit(types.FETCH_AUDITION_DATA_FAILURE);
    }
  },
};
