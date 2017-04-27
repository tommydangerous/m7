import { createGenericRequest } from './sharedActionCreators';

import Resource from '../api/Resource';

import {
  EXPENSES_FAILED_INDEX,
  EXPENSES_FAILED_CREATE,
  EXPENSES_RECEIVED_INDEX,
  EXPENSES_RECEIVED_CREATE,
  EXPENSES_REQUESTED_INDEX,
  EXPENSES_REQUESTED_CREATE,
  EXPENSES_UPDATED,
} from '../actions/expenseActions';

const resource = new Resource({ name: 'expenses' });

const mockExpense = (payload) => {
  return {
    ...payload,
    id: String(new Date()),
  };
}

export function createExpense(payload) {
  // return dispatch => {
  //   dispatch(requestedCreate());
  //   return new Promise((resolve, reject) => {
  //     const expense = mockExpense(payload);
  //     dispatch(receivedCreate({ expense }));
  //     if (true) {
  //       resolve({ expense });
  //     } else {
  //       reject({});
  //     }
  //   });
  // }

  return createGenericRequest('POST', '/api/expenses/add', { payload }, {
    failedActionType: EXPENSES_FAILED_CREATE,
    startedActionType: EXPENSES_REQUESTED_CREATE,
    succeededActionType: EXPENSES_RECEIVED_CREATE,
  });
}

export function fetchExpenses(query = {}) {
  // const queryTransformed = {}
  // if (query.startDate) {
  //   queryTransformed.search_start_date = query.startDate;
  // }
  // if (query.endDate) {
  //   queryTransformed.search_end_date = query.endDate;
  // }
  // return function(dispatch) {
  //   dispatch(requested());
  //   return resource.index(queryTransformed)
  //     .then(response => response.json())
  //     .then(json => dispatch(received(json)));
  // };
  return createGenericRequest('GET', '/api/expenses/view', { query }, {
    failedActionType: EXPENSES_FAILED_INDEX,
    startedActionType: EXPENSES_REQUESTED_INDEX,
    succeededActionType: EXPENSES_RECEIVED_INDEX,
  });
}

export function updateAttributes(opts = {}) {
  return {
    type: EXPENSES_UPDATED,
    ...opts,
  };
}

function received(json) {
  const { expenses } = json;
  return {
    type: EXPENSES_RECEIVED_INDEX,
    expenses,
  };
}

function receivedCreate({ expense }) {
  return {
    type: EXPENSES_RECEIVED_CREATE,
    expense,
  };
}

function requested() {
  return {
    type: EXPENSES_REQUESTED_INDEX,
  };
}

function requestedCreate() {
  return {
    type: EXPENSES_REQUESTED_CREATE,
  };
}
