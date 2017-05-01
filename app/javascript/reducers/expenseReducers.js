import { combine } from '../utils/reducer';
import { OFFLINE_MODE } from '../utils/constants';
import SimpleReducerGenerator from './SimpleReducerGenerator';

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
  return SimpleReducerGenerator({
    action,
    name: 'expenses',
    responseParsers: {
      index: resp => resp.ExpenseEntries.map(obj => obj.ExpenseEntry),
      create: resp => resp.ExpenseEntry,
    },
    states: {
      current: state,
      initial: INITIAL_STATE,
      reset: RESET_STATE,
    },
  });
}
