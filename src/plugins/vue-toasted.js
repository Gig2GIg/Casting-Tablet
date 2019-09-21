import Vue from 'vue';
import Toasted from 'vue-toasted';

Vue.use(Toasted, {
  position: 'bottom-left',
  duration: 5000,
  type: 'success',
  theme: 'bubble',
});

Vue.toasted.success = message => Vue.toasted.show(message, {
  type: 'success',
  icon: {
    name: 'check',
    after: true,
  },
});

Vue.toasted.error = message => Vue.toasted.show(message, {
  type: 'error',
  icon: {
    name: 'error_outline',
    after: true,
  },
});
