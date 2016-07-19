<template>
  <div class="multiselect-container">
    <p>{{ treedata.name }}</p>
    <multiselect
      :options="treedata.values",
      :selected.sync="value[treedata.name]",
      :multiple="false",
      :searchable="true",
      placeholder="Select from list",
      label="name",
      :close-on-select="true"
      :on-change="selectValueChange"
      key="name"
    ></multiselect>
  </div>
  <div class="multiselect-container" v-for="childNode in childNodes" track-by="name">
    <p>{{ childNode.name }}</p>
    <multiselect
      :options="childNode.values",
      :selected.sync="value[childNode.name]",
      :multiple="false",
      :searchable="true",
      placeholder="Select from list",
      label="name",
      :close-on-select="true"
      key="name"
    ></multiselect>
  </div>
</template>

<script>
import Multiselect from 'vue-multiselect'
import store from '../vuex/store'
import { setItemByName } from '../vuex/actions'
import { getArryItemByProperty, getConditionMatchValues, cloneObject } from '../services/support'

export default {
  props: ['name', 'label', 'treedata'],
  components: { Multiselect },
  vuex: {
    getters: {
      value: state => state.item
    }
  },
  data () {
    return {
      source: this.treedata.values,
      childNodes: []
    }
  },
  methods: {
    selectValueChange: function(value) {
      this.value[this.treedata.name] = value;
      var matchValues = getConditionMatchValues(value, this.treedata.conditions);
      var currentValue = cloneObject(this.value);
      this.childNodes = [];
      for (var i = 0; i < matchValues.length; i++) {
        var matchValue = matchValues[i];
        var node = getArryItemByProperty(this.treedata.nodes, 'name', matchValue);
        this.childNodes.push(node);
      }
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
