export function rootSelector(state) {
  return state.timesheet;
}

export function sortedObjects(state) {
  const objectsById = rootSelector(state).timesheetsById;
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
