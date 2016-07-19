import jquery from 'jquery'

export const setItemByName = ({ dispatch, state }, name, item) => {
  dispatch('SETITEMBYNAME', name, item);
}
