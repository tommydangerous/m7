import jsSHA from 'jssha';

import {
  BASE_PATH,
  GET,
  POST,
  SCHEME,
} from './constants';

import { getApiData } from '../utils/bootstrapData';
import { getCurrentSession, isLoggedIn } from '../stores/appLocalStorage';

const BASE_URI = `${SCHEME}://${BASE_PATH}`;

const generateSignature = (pathWithQuery) => {
  const stringForDigest = `${getApiData('privateKey')}${pathWithQuery}`;
  const shaObj = new jsSHA('SHA-512', 'TEXT');
  shaObj.update(stringForDigest);
  return shaObj.getHash('HEX');
};

const transformBoolean = val => {
  if (typeof val === 'boolean') {
    if (val) {
      return 'Yes';
    } else {
      return 'No';
    }
  }
  return val;
}

const transformPayload = (payload) => {
  const dict = {};
  Object.keys(payload).forEach(key1 => {
    const val1 = payload[key1];
    if (typeof val1 === 'object') {
      Object.keys(val1).forEach(key2 => {
        const val2 = val1[key2];
        if (typeof val2 === 'object') {
          Object.keys(val2).forEach(key3 => {
            const val3 = val2[key3];
            dict[`${key1}[${key2}][${key3}]`] = val3;
          });
        } else {
          dict[`${key1}[${key2}]`] = val2;
        }
      });
    } else {
      dict[key1] = val1;
    }
  });
  return dict;
};

export default {
  request(method, endpoint, opts = {}) {
    const {
      payload,
      query,
    } = opts;

    let queryParams = {
      api_key: getApiData('clientKey'),
    };

    const data = {
      credentials: 'include',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      method,
    };

    if (isLoggedIn()) {
      const {
        session_id: sessionId,
        session_name: sessionName,
      } = getCurrentSession();

      queryParams = {
        // session_name: sessionId,
        ...queryParams,
      };
    }

    if (method === POST) {
      if (payload) {
        data.body = $.param({ ...transformPayload(payload) });
      }
    }

    if (query) {
      queryParams = { ...query, ...queryParams };
    }

    const urlParamsSortedByKey = Object.keys(queryParams)
      .sort((a, b) => {
        if (a > b) {
          return 1;
        } else if (a < b) {
          return -1;
        }
        return 0;
      })
      .map(key => `${key}=${encodeURIComponent(queryParams[key])}`)
      .join('&');

    const pathWithQuery = `${endpoint}?${urlParamsSortedByKey}`;
    const signature = generateSignature(pathWithQuery);

    const request = new Request(`${BASE_URI}${pathWithQuery}&signature=${signature}`, data);
    return fetch(request);
  }
}
