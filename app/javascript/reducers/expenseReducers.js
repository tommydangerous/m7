import { combine } from '../utils/reducer';

import {
  EXPENSES_FAILED,
  EXPENSES_RECEIVED,
  EXPENSES_RECEIVED_CREATED,
  EXPENSES_REQUESTED,
  EXPENSES_REQUESTED_CREATED,
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
  loading: false,
};
const INITIAL_STATE = combine(RESET_STATE, {
  expensesById: mockExpenses,
});

export default function reducers(state = INITIAL_STATE, action) {
  const {
    expense,
    expenses,
    type,
  } = action;
  const {
    expensesById,
  } = state;

  switch (type) {
    case EXPENSES_FAILED: {
      return combine(state, { loading: false });
    }
    case EXPENSES_RECEIVED: {
      const expensesByIdUpdated = { ...expensesById };
      expenses.forEach(obj => {
        expensesByIdUpdated[obj.id] = obj;
      });
      return combine(combine(state, RESET_STATE), { expensesById: expensesByIdUpdated });
    }
    case EXPENSES_RECEIVED_CREATED: {
      const dict = combine({}, expensesById);
      dict[expense.id] = expense;
      console.log(dict);
      return combine(combine(state, RESET_STATE), { expensesById: dict });
    }
    case EXPENSES_REQUESTED: {
      return combine(state, { loading: true });
    }
    case EXPENSES_REQUESTED_CREATED: {
      return combine(state, { loading: true });
    }
    default: {
      return state;
    }
  }
}
