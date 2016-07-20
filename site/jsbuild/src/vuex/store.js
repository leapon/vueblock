import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// app initial state
const state = {
  item: {},
  itemCol: {
    item1: {},
    item2: {}
  },
  formCol: {
    item1: {},
    item2: {}
  }
}

// define possible mutations
const mutations = {
  SETITEMBYNAME(state, name, item) {
    state.itemCol[name] = item;
  },
  SETFORMBYNAME(state, name, form) {
    state.formCol[name] = form;
  }
}

// create the store
export default new Vuex.Store({
  state,
  mutations
})
