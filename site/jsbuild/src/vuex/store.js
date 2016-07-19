import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// app initial state
const state = {
  item: {},
  itemCol: {}
}

// define possible mutations
const mutations = {
  SETITEMBYNAME(state, name, item) {
    state.itemCol[name] = item;
  }
}

// create the store
export default new Vuex.Store({
  state,
  mutations
})
