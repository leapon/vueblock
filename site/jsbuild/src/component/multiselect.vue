<template>
  <div class="multiselect-container">
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
.multiselect-container {
  margin-top: 10px;
  margin-bottom: 10px;
}
.multiselect-container input.multiselect__input {
  font-size: 1.4em;
}
.multiselect-container .multiselect__tag {
  font-size: 1.4em;
}
.multiselect-container .multiselect__option {
  font-size: 1.4em;
}
</style>
