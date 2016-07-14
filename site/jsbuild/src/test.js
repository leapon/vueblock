import Vue from 'vue'
import store from './vuex/store'
import { setModuleName, getitems, setitems, setStoreItem } from './vuex/actions'

import SmartForm from './components/SmartForm.vue'
import SmartFormInfo from './components/SmartFormInfo.vue'
import SmartSheet from './components/SmartSheet.vue'
import SmartSheetInfo from './components/SmartSheetInfo.vue'

var itemSheet = new Vue({
  el: '#item_sheet',
  store,
  data: {
    caption: 'Headcount List',
    columns: [
      { name:'function_name', display:'Function', type:'view' },
      { name:'position_title', display:'Position Name', type:'view' },
      { name:'start_year', display:'Start Year', type:'view' },
      { name:'start_quarter', display:'Start Quarter', type:'view' },
      { name:'program', display:'Key Program', type:'view' },
      { name:'position_type', display:'Position Type', type:'view' },
      { name:'report_to', display:'Report To', type:'view' }
    ]
  },
  components: {
    SmartSheet
  }
});

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
        display:'Headcount for',
        placeholder:'year',
        type:'select-one',
        field_type:'select-one',
        data_type: 'string',
        values:['', '2016', '2015', '2014']
      },
      {
        name:'function_name',
        display:'Function',
        type:'select-one',
        field_type:'select-one',
        data_type: 'string',
        values:[
          '',
          'Biometrics',
          'Business Development',
          'Clinical Operations',
          'Clinical Science',
          'Clinical Development',
          'Commercial',
          'Corporate Operations',
          'Drug Safety/Pharmacovigilance',
          'Executives',
          'Finance',
          'HR',
          'Information Technology',
          'Legal',
          'Medical Affairs',
          'Medical Writing',
          'Nonclinical',
          'Program Management',
          'Quality',
          'Regulatory Affairs',
          'Research',
          'Technical Operations'
        ]
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

var info1 = new Vue({
  el: '#item_filter_info',
  store,
  data: {
    name: 'item_filter'
  },
  components: {
    SmartFormInfo
  }
});

var itemEditForm = new Vue({
  el: '#addItemModal',
  store,
  data: {
    name: 'item_form',
    config: {
      mode: 'vertical',
      popupContainerId: 'addItemModal',
      showbuttons: true
    },
    columns: [
      { name:'function_name', display:'Function', type:'input', required:true },
      { name:'position_title', display:'Position', type:'input', required:true },
      { name:'start_year', display:'Start Year', type:'input', required:true },
      { name:'start_quarter', display:'Start Quarter', type:', required:trueinput', required:true },
      { name:'program', display:'Key Program', type:'input', required:true },
      { name:'position_type', display:'Position Type', type:'input', required:true },
      { name:'report_to', display:'Report To', type:'input' },
      { name:'status', display:'Status', type:'input' }
    ]
  },
  components: {
    SmartForm
  }
});

var itemInfo = new Vue({
  el: '#item_info',
  store,
  data: {
    name: 'items'
  },
  components: {
    SmartSheetInfo
  }
});

$().ready(function() {
  console.log('in headcount page');
  setModuleName(store, 'headcount');
  getitems(store);

  $('#addItemPopup').click(function() {
    var itemModalOption = {
      backdrop: true
    };
    $('#addItemModal').modal(itemModalOption);
    return false;
  });
});
