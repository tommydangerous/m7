import { combine } from '../utils/reducer';

import {
  EXPENSES_RECEIVED,
  EXPENSES_REQUESTED,
} from '../actions/expenseActions';

const mockExpenses = [
  {
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
  {
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
];

const RESET_STATE = {
  loading: false,
};
const INITIAL_STATE = combine(RESET_STATE, {
  expenses: mockExpenses,
});

export default function reducers(state = INITIAL_STATE, action) {
  const {
    expenses,
    type,
  } = action;

  switch (type) {
    case EXPENSES_RECEIVED: {
      return combine(combine(state, RESET_STATE), { expenses });
    }
    case EXPENSES_REQUESTED: {
      return combine(state, { loading: true });
    }
    default: {
      return state;
    }
  }
}
