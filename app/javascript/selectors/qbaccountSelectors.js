export function rootSelector(state) {
  return state.qbaccount;
}

export function sortedObjects(state) {
  const objectsById = rootSelector(state).qbaccountsById;
  return Object
    .keys(objectsById)
    .map(key => objectsById[key])
    .sort((a, b) => {
      if (a.name > b.name) {
        return 1;
      } else if (a.name < b.name) {
        return -1;
      }
      return 0;
    });
}
