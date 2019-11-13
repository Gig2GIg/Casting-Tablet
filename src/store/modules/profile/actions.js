import axios from 'axios';
import * as types from '@/store/types';
import ProfileService from '@/services/ProfileService';
import TokenService from '@/services/core/TokenService';

export default {
  async fetch({ commit }) {
    try {
      const { data: { data } } = await axios.get(`/t/auditions/profile/user/${TokenService.getUserId()}`);
      commit(types.FETCH_PROFILE_SUCCESS, data);
    } catch (e) {
      commit(types.FETCH_PROFILE_FAILURE);
    }
  },

  async fetchData({ commit }, id) {
    try {
      const { data: { data } } = await axios.get(`/t/auditions/profile/user/${id}`);
      commit(types.FETCH_PROFILE_SUCCESS, data);
    } catch (e) {
      commit(types.FETCH_PROFILE_FAILURE);
    }
  },

  async myCalendar({ commit }, id) {
    try {
      const { data: { data } } = await axios.get(`/t/user/${id}/calendar`);
      commit(types.FETCH_MY_CALENDAR_SUCCESS, data);
    } catch (e) {
      commit(types.FETCH_MY_CALENDAR_FAILURE);
    }
  },
  
  async fetchContract({ commit }, id) {
    try {
      const { data: { data } } = await axios.get(`t/performers/contracts?user=${id}`);
      commit(types.FETCH_CONTRACT_SUCCESS, data);
    } catch (e) {
      commit(types.FETCH_CONTRACT_FAILURE);
    }
  },
};
