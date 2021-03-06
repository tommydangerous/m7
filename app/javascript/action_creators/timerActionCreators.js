import {
  TIMER_MODAL_HIDE,
  TIMER_MODAL_SHOW,
  TIMER_PAUSE,
  TIMER_RESET,
  TIMER_SAVE,
  TIMER_START,
  TIMER_UNSAVE,
} from '../actions/timerActions';

export function hideModal() {
  return { type: TIMER_MODAL_HIDE };
}

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

export function showModal() {
  return { type: TIMER_MODAL_SHOW };
}

export function start() {
  return {
    type: TIMER_START,
  };
}

export function unsave() {
  return {
    type: TIMER_UNSAVE,
  };
}
