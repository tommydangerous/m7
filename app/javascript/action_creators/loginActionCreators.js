import { createGenericRequest } from './sharedActionCreators';

import {
  LOGIN_FAILED,
  LOGIN_RECEIVED,
  LOGIN_REQUESTED,
  LOGIN_VALUE_CHANGED,
  LOGOUT_RECEIVED,
} from '../actions/loginActions';

export function login(payload) {
  return createGenericRequest('POST', '/api/login', { payload }, {
    failedActionType: LOGIN_FAILED,
    startedActionType: LOGIN_REQUESTED,
    succeededActionType: LOGIN_RECEIVED,
  })
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
