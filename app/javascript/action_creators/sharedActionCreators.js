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

export function requestSucceeded(type, response, query) {
  return {
    response,
    type,
    query,
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
    .then(response => response.json())
    .then(json => {
      if (succeededActionType) {
        dispatch(requestSucceeded(succeededActionType, json, data));
      }
    })
    .catch(error => {
      if (failedActionType) {
        dispatch(requestFailed(failedActionType, error));
      }
    });
  };
}
