import { combine } from '../utils/reducer';

import {
  EXPENSES_RECEIVED,
  EXPENSES_REQUESTED,
} from '../actions/expenseActions';

const mockExpenses = [
  {
    employee: { id: 1, first_name: 'Tommy' },
  },
  {
    employee: { id: 2, first_name: 'Kylo' },
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
