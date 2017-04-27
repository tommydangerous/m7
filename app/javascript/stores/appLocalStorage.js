import { getApiData } from '../utils/bootstrapData';
import {
  LOCAL_STORAGE_KEY_SESSION,
  LOCAL_STORAGE_KEY_USER,
} from '../utils/constants';

export function getCurrentSession() {
  // return JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY_SESSION));
  return getApiData('session');
}

export function getCurrentUser() {
  // return localStorage.getItem(LOCAL_STORAGE_KEY_USER);
  return getApiData('user');
}

export function isLoggedIn() {
  return !!getCurrentSession() && !!getCurrentUser();
}

export function logOut() {
  localStorage.removeItem(LOCAL_STORAGE_KEY_SESSION);
  localStorage.removeItem(LOCAL_STORAGE_KEY_USER);
}
