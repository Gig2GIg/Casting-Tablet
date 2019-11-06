import mutations from './mutations';
import actions from './actions';
import getters from './getters';

const state = {
  feedback: [],
  tags:[],
  marketplace:[],
  recommendations:[]
};

export default {
  state,
  mutations,
  actions,
  getters,
};
