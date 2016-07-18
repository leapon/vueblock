<template>
  <div>
    <p>{{ label }}</p>
    <multiselect
      :options="source",
      :selected.sync="value",
      :multiple="true",
      :searchable="true",
      placeholder="Pick states",
      label="name",
      :close-on-select="true"
      key="name"
    ></multiselect>
  </div>
</template>

<script>
import Multiselect from 'vue-multiselect'

export default {
  props: ['name', 'label', 'values'],
  components: { Multiselect },
  data () {
    return {
      value: null,
      source: this.$get('values')
    }
  }
}
</script>

<style>
</style>
