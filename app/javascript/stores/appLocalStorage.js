import {
  LOCAL_STORAGE_KEY_SESSION,
  LOCAL_STORAGE_KEY_USER,
} from '../utils/constants';

export function getCurrentSession() {
  return localStorage.getItem(LOCAL_STORAGE_KEY_SESSION);
}

export function getCurrentUser() {
  return localStorage.getItem(LOCAL_STORAGE_KEY_USER);
}

export function isLoggedIn() {
  return !!(getCurrentSession() && getCurrentUser());
}
