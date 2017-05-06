import moment from 'moment';

import {
  TIMER_MODAL_HIDE,
  TIMER_MODAL_SHOW,
  TIMER_PAUSE,
  TIMER_RESET,
  TIMER_SAVE,
  TIMER_START,
  TIMER_UNSAVE,
} from '../actions/timerActions';

import {
  getTimer,
  resetTimer,
  saveTimer,
} from '../stores/appLocalStorage';
import { combine } from '../utils/reducer';

const getStateFromStorage = () => {
  return {
    active: getTimer().active == 1,
    endTime: getTimer().endTime,
    startTime: getTimer().startTime,
  };
}

const RESET_STATE = {
  active: false,
  endTime: null,
  saved: false,
  startTime: null,
};
const INITIAL_STATE = combine(RESET_STATE, {
  ...getStateFromStorage(),
  visible: false,
});

export default function reducers(state = INITIAL_STATE, action) {
  const {
    type,
  } = action;

  switch (type) {
    case TIMER_MODAL_HIDE: {
      return combine(state, { visible: false });
    }
    case TIMER_MODAL_SHOW: {
      return combine(state, { visible: true });
    }
    case TIMER_RESET: {
      resetTimer();
      return combine(combine(state, RESET_STATE), getStateFromStorage());
    }
    case TIMER_SAVE: {
      return combine(state, { saved: true });
    }
    case TIMER_START: {
      const {
        endTime,
        startTime,
      } = state;

      const now = moment().valueOf();
      const data = {
        active: 1,
        endTime: null,
        startTime: now,
      };

      if (endTime && startTime) {
        data.startTime = now - (endTime - startTime);
      }
      saveTimer(data);

      return combine(state, getStateFromStorage());
    }
    case TIMER_PAUSE: {
      saveTimer({
        active: 0,
        endTime: moment().valueOf(),
      });
      return combine(state, getStateFromStorage());
    }
    case TIMER_UNSAVE: {
      return combine(state, { saved: false });
    }
    default: {
      return state;
    }
  }
}
