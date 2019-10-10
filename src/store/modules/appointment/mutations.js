import * as types from '@/store/types';

export default {
  [types.FETCH_APPOINTMENTS_SUCCESS](state, appointments) {
    state.appointments = appointments;
  },

  [types.FETCH_APPOINTMENTS_FAILURE](state) {
    state.appointments = {};
  },
};
