import Vue from 'vue'
import store from '../vuex/store'
import multiselect from '../component/multiselect.vue'

new Vue({
  el: '#component1',
  store,
  data: {
    name: 'state',
    label: 'State',
    values: [
      { name: 'MD' },
      { name: 'VA' },
      { name: 'DC' }
    ]
  },
  components: {
    multiselect
  }
});
