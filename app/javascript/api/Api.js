import 'whatwg-fetch';

import {
  BASE_PATH,
  GET,
  POST,
  SCHEME,
} from './constants';

import { getBootstrapData } from '../utils/bootstrapData';
import { getCurrentSession, isLoggedIn } from '../stores/appLocalStorage';

const hashToUrlParamsString = query => {
  return Object.keys(query).map(key => `${key}=${query[key]}`).filter(s => s.length >= 1).join('&');
};

const apiData = () => getBootstrapData('api');

const fullPath = (path) => {
  const api = apiData();
  const str = hashToUrlParamsString({
    api_key: api.key,
    signature: api.signature,
  });
  const url = `${SCHEME}://${BASE_PATH}${path}`;
  return `${url}?${str}`;
};

const fullPathWithQuery = (path, query = {}) => {
  let url = fullPath(path);
  if (Object.values(query).length >= 1) {
    url = `${url}&${hashToUrlParamsString(query)}`;
  }
  return url;
};

export default {
  request(method, endpoint, opts = {}) {
    const {
      headers,
      payload,
      query,
    } = opts;
    let initialUrl = fullPathWithQuery(endpoint, query);
    const extraUrlParams = {};
    if (isLoggedIn()) {
      const {
        session_id: sessionId,
        session_name: sessionName,
      } = getCurrentSession();
      extraUrlParams.session_name = sessionName;
    }

    const data = {
      method: method,
      headers: {
        // 'Content-Type': 'application/x-www-form-urlencoded',
        // 'Content-Type': 'application/json',
        // 'Cookie': `IMPRESARIO=${apiData().signature}`,
        // 'Cookie': 'IMPRESARIO=hmiti3s5hp14mqrlfkop5eul62',
      },
      // encodeURIComponent()
    };

    if (payload) {
      // data.body = JSON.stringify(payload);
      Object.keys(payload).forEach(key => extraUrlParams[key] = encodeURIComponent(payload[key]));
    }
    if (Object.keys(extraUrlParams).length >= 1) {
      initialUrl = `${initialUrl}&${hashToUrlParamsString(extraUrlParams)}`;
    }
    if (headers) {
      data.headers = Object.assign(data.headers, headers);
    }
    return fetch(initialUrl, data);
  }
}
