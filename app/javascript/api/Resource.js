import fetch from 'isomorphic-fetch';

import {
  API_KEY,
  BASE_PATH,
  FORMAT,
  SCHEME,
  SIGNATURE,
} from './constants';

const hashToUrlParamsString = query => {
  return Object.keys(query).map(key => `${key}=${query[key]}`).join('&');
};

const fullPath = (resource, action) => {
  const str = hashToUrlParamsString({
    api_key: API_KEY,
    format: FORMAT,
    signature: SIGNATURE,
  });
  return `${SCHEME}://${BASE_PATH}/api/${resource}/${action}?${str}`;
};

const fullPathWithQuery = (resource, action, query = {}) => {
  return `${fullPath(resource, action)}&${hashToUrlParamsString(query)}`;
};

export default class Resource {
  constructor(props) {
    this.name = props.name;
  }

  index(query = {}) {
    return fetch(fullPathWithQuery(this.name, 'view', query));
  }
}
