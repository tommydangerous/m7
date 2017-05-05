import moment from 'moment';

import {
  TIMER_PAUSE,
  TIMER_RESET,
  TIMER_SAVE,
  TIMER_START,
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
  startTime: null,
};
const INITIAL_STATE = combine(RESET_STATE, getStateFromStorage());

export default function reducers(state = INITIAL_STATE, action) {
  const {
    endTime,
    startTime,
    type,
  } = action;

  switch (type) {
    case TIMER_RESET: {
      resetTimer();
      return combine(state, RESET_STATE);
    }
    case TIMER_SAVE: {
      console.log('TIMER_SAVE');
      return combine(state, {});
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

      return combine(combine(state, RESET_STATE), getStateFromStorage());
    }
    case TIMER_PAUSE: {
      saveTimer({
        active: 0,
        endTime: moment().valueOf(),
      });
      return combine(state, getStateFromStorage());
    }
    default: {
      return state;
    }
  }
}
