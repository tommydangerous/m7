import 'whatwg-fetch';
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

export default {
  request(method, endpoint, opts = {}) {
    const {
      payload,
      query,
    } = opts;

    let queryParams = {
      api_key: getApiData('clientKey'),
    };

    if (isLoggedIn()) {
      queryParams = {
        session_name: getCurrentSession().session_id,
        ...queryParams,
      };
    }

    if (payload) {
      const transformedPayload = {};
      Object.keys(payload).forEach(key => {
        const val1 = payload[key];
        if (typeof val1 === "object") {
          Object.keys(val1).forEach(key2 => {
            transformedPayload[`${key}[${key2}]`] = val1[key2];
          });
        } else {
          transformedPayload[key] = val1;
        }
      });
      queryParams = { ...transformedPayload, ...queryParams };
    }

    if (query) {
      queryParams = { ...query, ...queryParams };
    }

    const data = {
      method,
    };

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

    return fetch(`${BASE_URI}${pathWithQuery}&signature=${signature}`, data);
  }
}
