import SimpleReducerGenerator from './SimpleReducerGenerator';

const RESET_STATE = {};
const INITIAL_STATE = {};

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
      update: singleObjectParser,
    },
    saveParsers: {
      create: singleObjectParser,
      update: singleObjectParser,
    },
    singularName: 'expense',
    states: {
      current: state,
      initial: INITIAL_STATE,
      reset: RESET_STATE,
    },
  });
}
