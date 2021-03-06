import { RESPONSE_APP_KEY } from '../api/constants';
import Api from '../api/Api';

export function requestFailed(type, error) {
  return {
    error,
    type,
  };
}

export function requestStarted(type) {
  return {
    type,
  };
}

export function requestSucceeded(type, response, data) {
  const {
    payload,
    query,
  } = data;
  return {
    payload,
    query,
    response,
    type,
  };
}

export function createGenericRequest(httpMethod, endpoint, data, options = {}) {
  const {
    failedActionType,
    startedActionType,
    succeededActionType,
  } = options;

  return (dispatch) => {
    if (startedActionType) {
      dispatch(requestStarted(startedActionType));
    }

    return Promise.resolve(Api.request(httpMethod, endpoint, {
      ...data,
    }))
    .then(response => {
      response.text().then(text => {
        let json = {};
        if (!!text) {
          json = JSON.parse(text);
        }
        if (json.error && failedActionType) {
          dispatch(requestFailed(failedActionType, json.error));
        } else if (succeededActionType) {
          dispatch(
            requestSucceeded(
              succeededActionType,
              !!json[RESPONSE_APP_KEY] ? json[RESPONSE_APP_KEY] : json,
              data,
            ),
          );
        }
      });
    })
    .catch(error => {
      if (failedActionType) {
        dispatch(requestFailed(failedActionType, error));
      }
    });
  };
}
