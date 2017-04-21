import Resource from '../api/Resource';

import {
  EXPENSES_RECEIVED,
  EXPENSES_REQUESTED,
} from '../actions/expenseActions';

const resource = new Resource({ name: 'expenses' });

export function fetchExpenses(query = {}) {
  const queryTransformed = {}
  if (query.startDate) {
    queryTransformed.search_start_date = query.startDate;
  }
  if (query.endDate) {
    queryTransformed.search_end_date = query.endDate;
  }
  return function(dispatch) {
    dispatch(requested());
    return resource.index(queryTransformed)
      .then(response => response.json())
      .then(json => dispatch(received(json)));
  };
}

function received(json) {
  const { expenses } = json;
  return {
    type: EXPENSES_RECEIVED,
    expenses,
  };
}

function requested() {
  return {
    type: EXPENSES_REQUESTED,
  };
}
