import { createGenericRequest } from './sharedActionCreators';

import {
  EXPENSES_FAILED_INDEX,
  EXPENSES_FAILED_CREATE,
  EXPENSES_RECEIVED_INDEX,
  EXPENSES_RECEIVED_CREATE,
  EXPENSES_REQUESTED_INDEX,
  EXPENSES_REQUESTED_CREATE,
  EXPENSES_UPDATED,
} from '../actions/expenseActions';

const mockExpense = (payload) => {
  return {
    ...payload,
    id: String(new Date()),
  };
}

export function createExpense(payload) {
  return createGenericRequest('POST', '/api/expenses/add', { payload }, {
    failedActionType: EXPENSES_FAILED_CREATE,
    startedActionType: EXPENSES_REQUESTED_CREATE,
    succeededActionType: EXPENSES_RECEIVED_CREATE,
  });
}

export function fetchExpenses(query = {}) {
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
