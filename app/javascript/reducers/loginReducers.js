import {
  LOGIN_RECEIVED,
  LOGIN_REQUESTED,
  LOGIN_VALUE_CHANGED,
} from '../actions/loginActions';

import { combine } from '../utils/reducer';

const RESET_STATE = {
  loading: false,
  password: '',
  session: null,
  user: null,
};
const INITIAL_STATE = combine(RESET_STATE, {
  email: '',
});

export default function reducers(state = INITIAL_STATE, action) {
  const {
    key,
    session,
    type,
    user,
    value,
  } = action;

  const {
    email,
    password,
  } = state;

  switch (type) {
    case LOGIN_RECEIVED: {
      return combine(state, { session, user });
    }
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
