import 'whatwg-fetch';

import {
  LOGIN_RECEIVED,
  LOGIN_REQUESTED,
  LOGIN_VALUE_CHANGED,
} from '../actions/loginActions';

export function login({ email, password }) {
  return function(dispatch) {
    dispatch(requested());
    return fetch('/login', {
      body: JSON.stringify({
        email,
        password,
      }),
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
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
  const { session, user } = json;
  return {
    type: LOGIN_RECEIVED,
    session,
    user,
  };
}

function requested() {
  return {
    type: LOGIN_REQUESTED,
  };
}
