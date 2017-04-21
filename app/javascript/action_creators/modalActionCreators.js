import {
  MODAL_HIDE,
  MODAL_SHOW,
} from '../actions/modalActions';

export function hide() {
  return {
    type: MODAL_HIDE,
  };
}

export function show() {
  return {
    type: MODAL_SHOW,
  };
}
