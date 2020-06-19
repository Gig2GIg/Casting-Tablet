import axios from 'axios';
import * as types from '@/store/types';
import ProfileService from '@/services/ProfileService';
import TokenService from '@/services/core/TokenService';

export default {
  async fetch({ commit }) {
    try {
      const { data: { data } } = await axios.get(`/t/users/show/${TokenService.getUserId()}`);
      commit(types.FETCH_PROFILE_SUCCESS, data);
    } catch (e) {
      commit(types.FETCH_PROFILE_FAILURE);
    }
  },

  async removeProfile({ commit }) {
    await commit(types.FETCH_PROFILE_SUCCESS, {});
  },

  async setProfile({ commit }, data) {
    await commit(types.FETCH_PROFILE_SUCCESS, data);
  },

  async fetchData({ commit }, id) {
    try {
      const { data: { data } } = await axios.get(`/t/auditions/profile/user/${id}`);
      commit(types.FETCH_PROFILE_T_SUCCESS, data);
    } catch (e) {
      commit(types.FETCH_PROFILE_T_FAILURE);
    }
  },

  async fetchSharedData({ commit }, id) {
    try {
      const { data: { data } } = await axios.get(`/talentDatabase/auditions/profile/user/${id}`);
      commit(types.FETCH_PROFILE_T_SUCCESS, data);
    } catch (e) {
      commit(types.FETCH_PROFILE_T_FAILURE);
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

  async sharedCalendar({ commit }, id) {
    try {
      const { data: { data } } = await axios.get(`/talentDatabase/user/${id}/calendar`);
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
