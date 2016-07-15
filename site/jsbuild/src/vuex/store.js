import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// app initial state
const state = {
  // moduleName is used in ajax query
  moduleName: '',
  // for single use of sheet and form
  columns: [],
  items: [],
  form: {},
  // for multiple use of sheets and forms
  columnsCol: {
    main: []
  },
  itemsCol: {
    main: []
  },
  formCol: {
    filter:{},
    main:{},
    item_filter: {},
    item_form: {}
  }
}

// define possible mutations
const mutations = {
  SETMODULENAME(state, moduleName) {
    state.moduleName = moduleName;
  },
  // for single use of sheet and form
  SETITEMS(state, items) {
    state.items = items;
  },
  CHANGEITEM(state, index, column, value) {
    state.items[index][column] = value;
  },
  SETFORM(state, form) {
    state.form = form;
  },
  // for multiple use of sheets and forms
  SETITEMSBYNAME(state, name, items) {
    state.itemsCol[name] = items;
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
