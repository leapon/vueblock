<template>
  <div class="multiselect-container">
    <p>{{ label }}</p>

    <multiselect
      :options="source",
      :selected.sync="value",
      :multiple="false",
      :searchable="true",
      placeholder="Select from list",
      label="name",
      :close-on-select="true"
      :on-change="selectValueChange"
      key="name"
    ></multiselect>
    
  </div>
  
  <div class="multiselect-container" v-for="childNode in childNodes">
    <p>{{ childNode.name }}</p>
  </div>
  
</template>

<script>
import Multiselect from 'vue-multiselect'
import { getArryItemByProperty, getConditionMatchValues } from '../services/support.js'

/*
{
  name: "category",
  values: ["food", "non-food"],
  conditions: [
    {
      condition: ["==", "food"],
      values: ["fruit", "vegetable"]
    }
  ],
  nodes: [
    {
      name: "fruit",
      values: [
        "apple",
        "melon"
      ]
    }
  ]
}
*/

export default {
  props: ['name', 'label', 'treedata'],
  components: { Multiselect },
  data () {
    return {
      value: null,
      source: this.treedata.values,
      childNodes: []
    }
  },
  methods: {
    selectValueChange: function(value) {
      console.log('selectValueChange:', value);
      var matchValues = getConditionMatchValues(value, this.treedata.conditions);
      console.log('matchValues:', matchValues);
      this.childNodes = [];
      for (var i = 0; i < matchValues.length; i++) {
        var matchValue = matchValues[i];
        var node = getArryItemByProperty(this.treedata.nodes, 'name', matchValue);
        console.log('match node:', matchValue, JSON.stringify(node));
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
