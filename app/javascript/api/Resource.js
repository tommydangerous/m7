import 'whatwg-fetch';

import {
  BASE_PATH,
  GET,
  FORMAT,
  POST,
  SCHEME,
} from './constants';

import { getBootstrapData } from '../utils/bootstrapData';
import { getCurrentSession, isLoggedIn } from '../stores/appLocalStorage';

const hashToUrlParamsString = query => {
  return Object.keys(query).map(key => `${key}=${query[key]}`).filter(s => s.length >= 1).join('&');
};

const apiData = () => getBootstrapData('api');

const fullPath = (resource, action) => {
  const api = apiData();
  const str = hashToUrlParamsString({
    api_key: api.key,
    // format: FORMAT,
    signature: api.signature,
  });
  let url = `${SCHEME}://${BASE_PATH}/api/${resource}`;
  if (action) {
    url = `${url}/${action}`
  }
  return `${url}?${str}`;
};

const fullPathWithQuery = (resource, action, query = {}) => {
  let url = fullPath(resource, action);
  if (Object.values(query).length >= 1) {
    url = `${url}&${hashToUrlParamsString(query)}`;
  }
  return url;
};

export default class Resource {
  constructor(props) {
    this.name = props.name;
  }

  create(payload = {}) {
    return this._fetch({
      action: null,
      method: POST,
      payload,
    });
  }

  index(query = {}) {
    return this._fetch({
      action: 'view',
      method: GET,
      query,
    });
  }

  _fetch(opts) {
    const {
      action,
      headers,
      method,
      payload,
      query,
    } = opts;
    let initialUrl = fullPathWithQuery(this.name, action, query);
    const extraUrlParams = {};
    if (isLoggedIn()) {
      const {
        session_id: sessionId,
        session_name: sessionName,
      } = getCurrentSession();
      // rcgc19g3motgm5h5dt8fr97me4
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
