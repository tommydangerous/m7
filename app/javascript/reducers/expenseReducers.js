import { OFFLINE_MODE } from '../utils/constants';
import SimpleReducerGenerator from './SimpleReducerGenerator';

import { mock } from '../mocks/expense';

const initialExpensesById = {};

if (OFFLINE_MODE) {
  [mock(), mock(), mock(), mock(), mock()].forEach(expense => {
    initialExpensesById[expense.id] = expense;
  });
}

const RESET_STATE = {};
const INITIAL_STATE = {
  expensesById: initialExpensesById,
};

const singleObjectParser = resp => {
  const { ExpenseEntry } = resp;
  return {
    ...ExpenseEntry,
    billable: ExpenseEntry.billable.toLowerCase() === 'yes',
  };
};

export default function reducers(state, action) {
  return SimpleReducerGenerator({
    action,
    name: 'expenses',
    responseParsers: {
      index: resp => resp.ExpenseEntries.map(obj => singleObjectParser(obj)),
      create: singleObjectParser,
    },
    singularName: 'expense',
    states: {
      current: state,
      initial: INITIAL_STATE,
      reset: RESET_STATE,
    },
  });
}
