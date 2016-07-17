import Vue from 'vue'
import store from '../vuex/store'
import DoorLayout from '../component/doorlayout.vue'

new Vue({
  el: '#component1',
  store,
  data: {
  },
  components: {
    DoorLayout
  }
});
