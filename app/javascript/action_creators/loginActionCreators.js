import { createGenericRequest } from './sharedActionCreators';

import {
  LOGIN_RECEIVED,
  LOGIN_REQUESTED,
  LOGIN_VALUE_CHANGED,
} from '../actions/loginActions';

export function login(payload) {
  return createGenericRequest('POST', '/api/login', { payload }, {
    startedActionType: LOGIN_REQUESTED,
    succeededActionType: LOGIN_RECEIVED,
  })
}

export function updateInputValue(key, value) {
  return {
    type: LOGIN_VALUE_CHANGED,
    key,
    value,
  };
}
