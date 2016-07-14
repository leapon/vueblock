<template>
  <pre>{{ form|json 4 }}</pre>
</template>

<script>
export default {
  props: ['name'],
  data: function() {
    return {};
  },
  vuex: {
    getters: {
      //form: state => state.form
    }
  },
  computed: {
    form: function() {
      var formCol = this.$store.state['formCol'];
      var formName = this.$get('name');
      console.log('>>> formName', formName);
      console.log('>>> formCol', formCol);
      console.log('>>> form', formCol[formName]);
      return formCol[formName];
    }
  }
}
</script>

<style>
</style>
