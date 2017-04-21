import {
  LOGIN_REQUESTED,
  LOGIN_VALUE_CHANGED,
} from '../actions/loginActions';

import { combine } from '../utils/reducer';

const RESET_STATE = {
  loading: false,
  password: '',
};
const INITIAL_STATE = combine(RESET_STATE, {
  email: '',
});

export default function reducers(state = INITIAL_STATE, action) {
  const {
    key,
    type,
    value,
  } = action;

  const {
    email,
    password,
  } = state;

  switch (type) {
    case LOGIN_REQUESTED: {
      return combine(state, INITIAL_STATE);
    }
    case LOGIN_VALUE_CHANGED: {
      const fields = { email, password };
      fields[key] = value;
      return combine(state, fields);
    }
    default: {
      return state;
    }
  }
}
