export function rootSelector(state) {
  return state.login;
}

export function userSelector(state) {
  return rootSelector(state).user;
}
