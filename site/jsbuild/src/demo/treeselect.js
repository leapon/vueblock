import Vue from 'vue'
import store from '../vuex/store'
import treeselect from '../component/treeselect.vue'

var treedata = {
  name: "grocery",
  label: "Grocery",
  values: ["food", "non-food"],
  conditions: [
    {
      condition: ["==", "food"],
      values: ["fruit", "vegetable"]
    },
    {
      condition: ["!=", "food"],
      values: ["supply"]
    },
    {
      condition: [true],
      values: ["container"]
    }
  ],
  nodes: [
    {
      name: "fruit",
      label: "Fruit",
      values: [
        "apple",
        "melon",
        "orange",
        "peach"
      ]
    },
    {
      name: "vegetable",
      label: "Vegetable",
      values: [
        "cucumber",
        "tomato",
        "zucchini"
      ]
    },
    {
      name: "supply",
      label: "Supply",
      values: [
        "paper towel",
        "napkin",
        "fork"
      ]
    },
    {
      name: "container",
      label: "Container",
      values: [
        "plastic bag",
        "paper bag"
      ]
    }
  ]
};

new Vue({
  el: '#component1',
  store,
  data: {
    name: 'item1',
    label: 'Select item',
    treedata: treedata
  },
  components: {
    treeselect
  }
});

// button handler
$('#btn1').click(function() {
  console.log('store.state:', JSON.stringify(store.state.item));
  $('#info1').text(JSON.stringify(store.state.item));
});
