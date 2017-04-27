import { createGenericRequest } from './sharedActionCreators';

import Resource from '../api/Resource';

import {
  EXPENSES_FAILED,
  EXPENSES_RECEIVED,
  EXPENSES_RECEIVED_CREATED,
  EXPENSES_REQUESTED,
  EXPENSES_REQUESTED_CREATED,
} from '../actions/expenseActions';

const resource = new Resource({ name: 'expenses' });

export function createExpense(payload) {
  return dispatch => {
    dispatch(requestedCreate());
    return new Promise((resolve, reject) => {
      dispatch(receivedCreate({ expense: { ...payload, id: 777 } }));
    });
  }

  // return createGenericRequest('POST', '/api/expenses/add', payload, {
  //   // failedActionType: EXPENSES_FAILED,
  //   startedActionType: EXPENSES_REQUESTED_CREATED,
  //   succeededActionType: EXPENSES_RECEIVED_CREATED,
  // });
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
    failedActionType: EXPENSES_FAILED,
    startedActionType: EXPENSES_REQUESTED,
    succeededActionType: EXPENSES_RECEIVED,
  });
}

function received(json) {
  const { expenses } = json;
  return {
    type: EXPENSES_RECEIVED,
    expenses,
  };
}

function receivedCreate({ expense }) {
  return {
    type: EXPENSES_RECEIVED_CREATED,
    expense,
  };
}

function requested() {
  return {
    type: EXPENSES_REQUESTED,
  };
}

function requestedCreate() {
  return {
    type: EXPENSES_REQUESTED_CREATED,
  };
}
