<template>
  <pre>{{ items|json 4 }}</pre>
</template>

<script>
import store from '../vuex/store.js';

export default {
  store,
  props: ['name'],
  data: function() {
    return {};
  },
  vuex: {
    getters: {
      // items: state => state.items
    }
  },
  computed: {
    items: function() {
      return store.state[this.name];
    }
  }
}
</script>

<style>
</style>
