import {
  LOCAL_STORAGE_KEY_SESSION,
  LOCAL_STORAGE_KEY_TIMER_ACTIVE,
  LOCAL_STORAGE_KEY_TIMER_END,
  LOCAL_STORAGE_KEY_TIMER_START,
  LOCAL_STORAGE_KEY_USER,
} from '../utils/constants';

export function getCurrentSession() {
  return getObject(LOCAL_STORAGE_KEY_SESSION);
}

export function getCurrentUser() {
  return getObject(LOCAL_STORAGE_KEY_USER);
}

export function getTimer() {
  return {
    active: localStorage.getItem(LOCAL_STORAGE_KEY_TIMER_ACTIVE),
    endTime: localStorage.getItem(LOCAL_STORAGE_KEY_TIMER_END),
    startTime: localStorage.getItem(LOCAL_STORAGE_KEY_TIMER_START),
  };
}

export function isLoggedIn() {
  return !!getCurrentSession() && !!getCurrentUser();
}

export function logIn({ session, user }) {
  setObject(LOCAL_STORAGE_KEY_SESSION, session);
  setObject(LOCAL_STORAGE_KEY_USER, user);
}

export function logOut() {
  localStorage.removeItem(LOCAL_STORAGE_KEY_SESSION);
  localStorage.removeItem(LOCAL_STORAGE_KEY_USER);
  resetTimer();
}

export function resetTimer() {
  localStorage.removeItem(LOCAL_STORAGE_KEY_TIMER_ACTIVE);
  localStorage.removeItem(LOCAL_STORAGE_KEY_TIMER_END);
  localStorage.removeItem(LOCAL_STORAGE_KEY_TIMER_START);
}

export function saveTimer({ active, endTime, startTime }) {
  if (typeof active !== 'undefined') {
    localStorage.setItem(LOCAL_STORAGE_KEY_TIMER_ACTIVE, active);
  }

  if (endTime) {
    localStorage.setItem(LOCAL_STORAGE_KEY_TIMER_END, endTime);
  }

  if (startTime) {
    localStorage.setItem(LOCAL_STORAGE_KEY_TIMER_START, startTime);
  }
}

function getObject(key) {
  const obj = localStorage.getItem(key);
  if (obj !== 'undefined') {
    return JSON.parse(obj);
  }
}

function setObject(key, object) {
  localStorage.setItem(key, JSON.stringify(object));
}
