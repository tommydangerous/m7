import { createGenericRequest } from './sharedActionCreators';
import Api from '../api/Api';

import {
  LOGIN_FAILED,
  LOGIN_RECEIVED,
  LOGIN_REQUESTED,
  LOGIN_VALUE_CHANGED,
  LOGOUT_RECEIVED,
} from '../actions/loginActions';

export function login(query) {
  return dispatch => {
    dispatch(started());
    return Promise.resolve(Api.request('POST', '/api/login', { query }))
      .then(resp => resp.json())
      .then(json => dispatch(succeeded(json)))
      .catch(error => {
        dispatch(failed(error));
      });
  };
}

export function logOut() {
  return {
    type: LOGOUT_RECEIVED,
  };
}

export function updateInputValue(key, value) {
  return {
    type: LOGIN_VALUE_CHANGED,
    key,
    value,
  };
}

function failed() {
  return { type: LOGIN_FAILED };
}

function started() {
  return { type: LOGIN_REQUESTED };
}

function succeeded(response) {
  return { type: LOGIN_RECEIVED, response };
}
