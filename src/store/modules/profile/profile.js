import mutations from './mutations';
import actions from './actions';
import getters from './getters';

const state = {
  user: {},
  tuser:{},
  calendar: [],
  contract:[],
};

export default {
  state,
  mutations,
  actions,
  getters,
};
