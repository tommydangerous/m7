import {
  HEADER_DROPDOWN_HIDE,
  HEADER_DROPDOWN_SHOW,
} from '../actions/headerActions';

export function hide() {
  return { type: HEADER_DROPDOWN_HIDE };
}

export function show() {
  return { type: HEADER_DROPDOWN_SHOW };
}
