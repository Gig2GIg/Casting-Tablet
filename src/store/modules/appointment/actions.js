import axios from 'axios';
import * as types from '@/store/types';
import AuditionService from '@/services/AuditionService';

export default {
  async fetch({ commit }, audition) {
    try {
      const { data: { data } } = await axios.get(`appointments/auditions/${audition}`);
      commit(types.FETCH_APPOINTMENTS_SUCCESS, data);
    } catch (e) {
      commit(types.FETCH_APPOINTMENTS_FAILURE);
    }
  },

  async fetchUserAudition({ commit }, appointment) {
    try {
      const {data: { data }} = await axios.get(`t/appointments/auditions?user=${appointment.userId}&role_id=${appointment.rolId}&appointment_id=${appointment.appointmentId}`);
      commit(types.FETCH_USER_APPOINTMENT_SUCCESS, data);
    } catch (e) {
      commit(types.FETCH_USER_APPOINTMENT_FAILURE);
    }
  },

  async fetchAppointmentNotWalk({ commit }, appointment) {
    try {
      const {data: { data }} = await axios.get(`appointments/show/${appointment}/walk`);      
      commit(types.FETCH_APPOINTMENT_NOT_WALK_SUCCESS, data);
    } catch (e) {
      commit(types.FETCH_APPOINTMENT_NOT_WALK_FAILURE);
    }
  },

  async fetchAllAppointments({ commit }, appointment) {
    try {
      const {data: { data }} = await axios.get(`appointments/show/${appointment}/allWithUsers`);
      commit(types.FETCH_APPOINTMENTS_SUCCESS, data);
    } catch (e) {
      commit(types.FETCH_APPOINTMENTS_FAILURE);
    }
  },

  async saveCheckIn({ commit }, userData) {
    try {
      const {data: { data }} = await axios.post("appointments/auditions", userData);
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  },
};
