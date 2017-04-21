import {
  LOGIN_REQUESTED,
  LOGIN_VALUE_CHANGED,
} from '../actions/loginActions';

export function login() {
  return {
    type: LOGIN_REQUESTED,
  };
}

export function updateInputValue(key, value) {
  return {
    type: LOGIN_VALUE_CHANGED,
    key,
    value,
  };
}
