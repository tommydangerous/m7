import Resource from '../api/Resource';

import {
  LOGIN_RECEIVED,
  LOGIN_REQUESTED,
  LOGIN_VALUE_CHANGED,
} from '../actions/loginActions';

const resource = new Resource({ name: 'login' });

export function login({ email, password }) {
  return function(dispatch) {
    dispatch(requested());
    return resource.create({
      email,
      password,
    })
      .then(response => response.json())
      .then(json => dispatch(received(json)));
  }
}

export function updateInputValue(key, value) {
  return {
    type: LOGIN_VALUE_CHANGED,
    key,
    value,
  };
}

function received(json) {
  const { logininfo: login } = json;
  return {
    type: LOGIN_RECEIVED,
    login,
  };
}

function requested() {
  return {
    type: LOGIN_REQUESTED,
  };
}
