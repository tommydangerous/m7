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

const singleObjectParser = obj => {
  return {
    ...obj,
    billable: obj.billable.toLowerCase() === 'yes',
    id: parseInt(obj.id),
  };
};

export default function reducers(state, action) {
  return SimpleReducerGenerator({
    action,
    name: 'expenses',
    responseParsers: {
      index: resp => resp.ExpenseEntries.map(obj => singleObjectParser(obj.ExpenseEntry)),
      create: singleObjectParser,
      update: singleObjectParser,
    },
    saveParsers: {
      create: payload => singleObjectParser(payload.ExpenseEntry),
      update: payload => singleObjectParser(payload.ExpenseEntry),
    },
    singularName: 'expense',
    states: {
      current: state,
      initial: INITIAL_STATE,
      reset: RESET_STATE,
    },
  });
}
