import { combine } from '../utils/reducer';

import {
  EXPENSES_FAILED_INDEX,
  EXPENSES_FAILED_CREATE,
  EXPENSES_RECEIVED_INDEX,
  EXPENSES_RECEIVED_CREATE,
  EXPENSES_REQUESTED_INDEX,
  EXPENSES_REQUESTED_CREATE,
} from '../actions/expenseActions';

const mockExpenses = {
  123: {
    amount: 525.50,
    customer_id: 109,
    date: '2017-12-25',
    description: 'We bought Nobu for everyone.',
    expenses_grouping_id: 1448,
    id: 123,
    qb_account_id: 431,
    qb_class_id: 1559,
    vendor_id: 2530,
  },
  13: {
    amount: 25.50,
    customer_id: 19,
    date: '2017-12-25',
    description: 'Drinks for everyone.',
    expenses_grouping_id: 148,
    id: 13,
    qb_account_id: 31,
    qb_class_id: 59,
    vendor_id: 530,
  },
};

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
  expensesById: mockExpenses,
});

export default function reducers(state = INITIAL_STATE, action) {
  const {
    error,
    expense,
    expenses,
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
      const expensesByIdUpdated = { ...expensesById };
      expenses.forEach(obj => {
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
