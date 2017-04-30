import {
  LOGIN_FAILED,
  LOGIN_RECEIVED,
  LOGIN_REQUESTED,
  LOGIN_VALUE_CHANGED,
  LOGOUT_RECEIVED,
} from '../actions/loginActions';

import { logIn, logOut } from '../stores/appLocalStorage';
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
    response,
    type,
    value,
  } = action;

  const {
    email,
    password,
  } = state;

  switch (type) {
    case LOGIN_FAILED: {
      return combine(state, RESET_STATE);
    }
    case LOGIN_RECEIVED: {
      const {
        logininfo: {
          AccountUser: user,
          session,
        },
      } = response;
      logIn({ session, user });
      return combine(state, { session, user });
    }
    case LOGIN_RECEIVED: {
      return combine(state, { session, user });
    }
    case LOGIN_REQUESTED: {
      return combine(state, { loading: true });
    }
    case LOGIN_VALUE_CHANGED: {
      const fields = { email, password };
      fields[key] = value;
      return combine(state, fields);
    }
    case LOGOUT_RECEIVED: {
      logOut();
      return combine(combine(state, RESET_STATE), INITIAL_STATE);
    }
    default: {
      return state;
    }
  }
}
