import Vue from 'vue'
import store from '../vuex/store'
import Clock from '../component/clock.vue'

new Vue({
  el: '#component1',
  store,
  data: {
    timezone: 'America/New_York'
  },
  components: {
    Clock
  }
});
