import jquery from 'jquery'

export const setModuleName = ({ dispatch, state }, moduleName) => {
  dispatch('SETMODULENAME', moduleName);
}

export const getitems = ({ dispatch, state }) => {
  var filter = {};
  var filterForm = state.formCol['item_filter'];
  for (var property in filterForm) {
    if (filterForm[property]) {
      filter[property] = filterForm[property];
    }
  }
  var url = '/data/' + state.moduleName + '/get';
  jquery.get(url, filter, function(data) {
    console.log('getitems:', data);
    dispatch('SETITEMS', data.docs);
  });
}

export const setitems = ({ dispatch, state }, items) => {
  dispatch('SETITEMS', items)
}

export const changeitem = ({ dispatch, state }, index, column, value) => {
  dispatch('CHANGEITEM', index, column, value)
}

export const setForm = ({ dispatch, state }, form) => {
  dispatch('SETFORM', form)
}

export const setFormByName = ({ dispatch, state }, name, form) => {
  dispatch('SETFORMBYNAME', name, form)
}

export const sendFormChange = (store, name, field, value) => {
  console.log('sendFormChange:', name, field, value);
  if (name == 'item_filter') {
    getitems(store);
  }
}

export const submitForm = ({ dispatch, state }, formName, cb) => {
  var url = '/data/' + state.moduleName + '/add';
  var form = state.formCol[formName];
  console.log('submitForm:', formName, JSON.stringify(form));
  jquery.post(url, form, function(data) {
    var formdata = data.docs && data.docs[0] || null;
    console.log('form save result:', data);
    console.log('formdata:', formdata);
    if (formdata) {
      dispatch('SETFORMBYNAME', formName, formdata);
    }
    cb && cb();
  });
}

export const cancelForm = ({ dispatch, state }, formName, cb) => {
  console.log('cancelForm:', formName);
  /*
  var form = state['form'];
  console.log('cancelForm:', formName, JSON.stringify(form));
  for (var property in form) {
    form[property] = '';
  }
  dispatch('SETFORM', form);
  */
  cb && cb();
}
