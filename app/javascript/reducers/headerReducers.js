import {
  HEADER_DROPDOWN_HIDE,
  HEADER_DROPDOWN_SHOW,
} from '../actions/headerActions';

import { combine } from '../utils/reducer';

const RESET_STATE = {
  visible: false,
};
const INITIAL_STATE = combine(RESET_STATE, {
});

export default function reducers(state = INITIAL_STATE, action) {
  const {
    type,
  } = action;

  switch (type) {
    case HEADER_DROPDOWN_HIDE: {
      return combine(state, RESET_STATE);
    }
    case HEADER_DROPDOWN_SHOW: {
      return combine(state, { visible: true });
    }
    default: {
      return state;
    }
  }
}
