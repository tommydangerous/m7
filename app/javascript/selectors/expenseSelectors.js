export function rootSelector(state) {
  return state.expense;
}

export function sortedObjects(state) {
  const objectsById = rootSelector(state).expensesById;
  return Object
    .keys(objectsById)
    .map(key => objectsById[key])
    .sort((a, b) => {
      if (a.date > b.date) {
        return -1;
      } else if (a.date < b.date) {
        return 1;
      }
      return 0;
    });
}
