import {
  LOCAL_STORAGE_KEY_SESSION,
  LOCAL_STORAGE_KEY_USER,
} from '../utils/constants';

export function getCurrentSession() {
  return getObject(LOCAL_STORAGE_KEY_SESSION);
}

export function getCurrentUser() {
  return getObject(LOCAL_STORAGE_KEY_USER);
}

export function isLoggedIn() {
  return !!getCurrentSession() && !!getCurrentUser();
}

export function logOut() {
  localStorage.removeItem(LOCAL_STORAGE_KEY_SESSION);
  localStorage.removeItem(LOCAL_STORAGE_KEY_USER);
}

function getObject(key) {
  const obj = localStorage.getItem(key);
  if (obj !== 'undefined') {
    return JSON.parse(obj);
  }
}
