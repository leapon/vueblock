import Vue from 'vue'
import store from '../vuex/store'
import treeselect from '../component/treeselect.vue'

var treedata = [
  {
    name: "category",
    values: ["food", "non-food"],
    children: [
      {
        condition: ["==", "food"],
        values: ["fruit", "vegetable"]
      },
      {
        condition: ["!=", "food"],
        values: ["supply"]
      },
      {
        condition: true,
        values: ["container"]
      }
    ],
    support: [
      {
        name: "fruit",
        values: [
          "apple",
          "melon",
          "orange",
          "peach"
        ]
      },
      {
        name: "vegetable",
        values: [
          "cucumber",
          "tomato",
          "zucchini"
        ]
      },
      {
        name: "supply",
        values: [
          "paper towel",
          "napkin",
          "fork"
        ]
      },
      {
        name: "container",
        values: [
          "plastic bag",
          "paper bag"
        ]
      }
    ]
  }
];

new Vue({
  el: '#component1',
  store,
  data: {
    name: 'grocery_item',
    label: 'Select grocery item',
    treedata: treedata
  },
  components: {
    treeselect
  }
});
