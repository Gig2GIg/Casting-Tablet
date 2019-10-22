import mutations from './mutations';
import actions from './actions';
import getters from './getters';

const state = {
  appointments: [],
  userAppointment:{},
  appointmentNotWalk:[],
};

export default {
  state,
  mutations,
  actions,
  getters,
};
