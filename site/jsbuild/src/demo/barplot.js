import Vue from 'vue'
import store from '../vuex/store'
import Barplot from '../component/barplot.vue'

var layout = {
  width: 360,
  height: 320
};
var categorydata = {
  x: ['Apple', 'Orange'],
  y: [23, 18]
};
var categorydata2 = {
  x: ['A', 'B', 'C', 'D', 'E'],
  y: [21, 35, 48, 42, 15]
};

new Vue({
  el: '#component1',
  store,
  data: {
    label: 'barplot',
    layout: layout,
    data: categorydata,
    data2: categorydata2
  },
  components: {
    Barplot
  }
});
