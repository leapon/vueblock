import Vue from 'vue'
import store from '../vuex/store'
import multiselect from '../component/multiselect.vue'

new Vue({
  el: '#component1',
  store,
  data: {
    state_name: 'state',
    state_label: 'State',
    state_values: [
      { name:'MD' },
      { name:'VA' },
      { name:'DC' }
    ],
    fruit_name: 'fruit',
    fruit_label: 'Fruit',
    fruit_values: [
      'Apple',
      'Melon',
      'Strawberry',
      'Blackberry',
      'Pear'
    ]
  },
  components: {
    multiselect
  }
});
