import { combine } from '../utils/reducer';
import { OFFLINE_MODE } from '../utils/constants';

import {
  EXPENSES_FAILED_INDEX,
  EXPENSES_FAILED_CREATE,
  EXPENSES_RECEIVED_INDEX,
  EXPENSES_RECEIVED_CREATE,
  EXPENSES_REQUESTED_INDEX,
  EXPENSES_REQUESTED_CREATE,
} from '../actions/expenseActions';

import { mock } from '../mocks/expense';

const initialExpensesById = {};

if (OFFLINE_MODE) {
  [mock(), mock(), mock(), mock(), mock()].forEach(expense => {
    initialExpensesById[expense.id] = expense;
  });
}

const RESET_STATE = {
  errors: {
    create: null,
    index: null,
  },
  loading: {
    create: null,
    index: null,
  },
};
const INITIAL_STATE = combine(RESET_STATE, {
  expensesById: initialExpensesById,
});

export default function reducers(state = INITIAL_STATE, action) {
  const {
    error,
    expense,
    response,
    type,
  } = action;
  const {
    errors,
    expensesById,
    loading,
  } = state;

  switch (type) {
    case EXPENSES_FAILED_INDEX: {
      return combine(state, {
        errors: { ...errors, index: error },
        loading: { ...loading, index: false },
      });
    }
    case EXPENSES_FAILED_CREATE: {
      return combine(state, {
        errors: { ...errors, create: error },
        loading: { ...loading, create: false },
      });
    }
    case EXPENSES_RECEIVED_INDEX: {
      const {
        ExpenseEntries: expenses,
      } = response;
      const expensesByIdUpdated = { ...expensesById };
      expenses.forEach(({ ExpenseEntry: obj }) => {
        console.log(obj);
        expensesByIdUpdated[obj.id] = obj;
      });
      return combine(combine(state, RESET_STATE), { expensesById: expensesByIdUpdated });
    }
    case EXPENSES_RECEIVED_CREATE: {
      const expensesByIdUpdated = { ...expensesById };
      expensesByIdUpdated[expense.id] = expense;
      return combine(combine(state, RESET_STATE), { expensesById: expensesByIdUpdated });
    }
    case EXPENSES_REQUESTED_INDEX: {
      return combine(state, { loading: { ...loading, index: false } });
    }
    case EXPENSES_REQUESTED_CREATE: {
      return combine(state, { loading: { ...loading, create: false } });
    }
    default: {
      return state;
    }
  }
}
