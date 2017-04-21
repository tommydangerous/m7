import {
  MODAL_HIDE,
  MODAL_SHOW,
} from '../actions/modalActions';

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
    case MODAL_HIDE: {
      return combine(state, RESET_STATE);
    }
    case MODAL_SHOW: {
      return combine(state, { visible: true });
    }
    default: {
      return state;
    }
  }
}
