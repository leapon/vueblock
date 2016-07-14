import Vue from 'vue'
import store from './vuex/store'
import { setModuleName, getitems, setitems } from './vuex/actions'

import SmartForm from './components/SmartForm.vue'
import SmartFormInfo from './components/SmartFormInfo.vue'
import SmartSheet from './components/SmartSheet.vue'
import SmartSheetInfo from './components/SmartSheetInfo.vue'

var itemFilterForm = new Vue({
  el: '#item_filter',
  store,
  data: {
    name: 'item_filter',
    filter_config: {
      mode: 'inline',
      showbuttons: false
    },
    filter_columns: [
      {
        name:'start_year',
        display:'Year',
        placeholder:'year',
        type:'select-one',
        field_type:'select-one',
        data_type: 'string',
        values:['', '2016', '2015', '2014']
      },
      {
        name:'status',
        display:'Status',
        type:'select-one',
        field_type:'select-one',
        data_type: 'string',
        values:['', 'draft', 'pending', 'approved']
      }
    ]
  },
  components: {
    SmartForm
  }
});

$().ready(function() {
  console.log('in test page');
});
