import * as types from '@/store/types';

export default {
  [types.FETCH_APPOINTMENTS_SUCCESS](state, appointments) {
    state.appointments = appointments;
  },

  [types.FETCH_APPOINTMENTS_FAILURE](state) {
    state.appointments = {};
  },

  [types.FETCH_USER_APPOINTMENT_SUCCESS](state, userAppointment) {
    state.userAppointment = userAppointment;
  },

  [types.FETCH_USER_APPOINTMENT_FAILURE](state) {
    state.appointments = {};
  },

  [types.FETCH_APPOINTMENT_NOT_WALK_SUCCESS](state, appointmentNotWalk) {
    state.appointmentNotWalk = appointmentNotWalk;
  },

  [types.FETCH_APPOINTMENT_NOT_WALK_FAILURE](state) {
    state.appointments = {};
  },
};
