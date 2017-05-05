import {
  TIMER_PAUSE,
  TIMER_RESET,
  TIMER_SAVE,
  TIMER_START,
} from '../actions/timerActions';

export function pause() {
  return {
    type: TIMER_PAUSE,
  };
}

export function reset() {
  return {
    type: TIMER_RESET,
  };
}

export function save() {
  return {
    type: TIMER_SAVE,
  };
}

export function start() {
  return {
    type: TIMER_START,
  };
}
