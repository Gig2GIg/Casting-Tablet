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

  async fetchUserAudition({ commit }, appointment) {
    try {
      const {data: { data }} = await axios.get(`t/appointments/auditions?user=${appointment.userId}&role_id=${appointment.rolId}&appointment_id=${appointment.appointmentId}`);
      console.log(data);
      commit(types.FETCH_USER_APPOINTMENT_SUCCESS, data);
    } catch (e) {
      commit(types.FETCH_USER_APPOINTMENT_FAILURE);
    }
  },

  async fetchAppointmentNotWalk({ commit }, appointment) {
    try {
      const {data: { data }} = await axios.get(`appointments/show/${appointment}/notwalk`);
      console.log(data);
      commit(types.FETCH_APPOINTMENT_NOT_WALK_SUCCESS, data);
    } catch (e) {
      commit(types.FETCH_APPOINTMENT_NOT_WALK_FAILURE);
    }
  },

  async saveCheckIn({ commit }, userData) {
    try {
      const {data: { data }} = await axios.post("appointments/auditions", userData);
      console.log(data);
      commit(types.SAVE_USER_CHECKIN_SUCCESS, data);
      return true;
    } catch (e) {
      console.log(e);
      commit(types.SAVE_USER_CHECKIN_FAILURE);
      return false;
    }
  },
};
