import jquery from 'jquery'

export const setItemByName = ({ dispatch, state }, name, item) => {
  dispatch('SETITEMBYNAME', name, item);
}

export const setFormByName = ({ dispatch, state }, name, form) => {
  dispatch('SETFORMBYNAME', name, form)
}
