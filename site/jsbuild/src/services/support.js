export function updateItem (item) {
  item.fullname = item.firstname + '/' + item.lastname;
  return item;
}
