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

    const data = {
      // dataType: 'json',
      method,
      credentials: 'include',
      // credentials: 'same-origin',
      // mode: 'cors',
    };

    if (isLoggedIn()) {
      // const {
      //   session_id: sessionId,
      //   session_name: sessionName,
      // } = getCurrentSession();

      queryParams = {
        // session_name: sessionId,
        // z_ca: 42137,
        ...queryParams,
      };
      // queryParams[sessionName] = sessionId;

      // document.cookie = `${sessionName}=${sessionId}`;

      // const headers = new Headers({
        // 'Content-Type': 'application/json',
        // 'Cookie': `${sessionName}=${sessionId}`,
        // 'Cookie': 'IMPRESARIO=tsukcilka56g7mmqkst4am97l2',
        // 'Authorization': ' ',
        // 'User-Agent': null,
        // 'Accept': 'application/json',
        // 'Connection': 'keep-alive',
        // 'Origin': null,
        // 'Content-Type': 'application/json',
        // 'Cache': 'no-cache',
      // });

      // data.headers = headers;

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
    // debugger
    return fetch(request);
  }
}
