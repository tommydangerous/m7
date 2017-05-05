import SimpleReducerGenerator from './SimpleReducerGenerator';

const RESET_STATE = {};
const INITIAL_STATE = {};

export default function reducers(state, action) {
  return SimpleReducerGenerator({
    action,
    name: 'expensegroupings',
    responseParsers: {
      index: resp => Object.values(resp.ExpenseGroupings),
    },
    states: {
      current: state,
      initial: INITIAL_STATE,
      reset: RESET_STATE,
    },
  });
}
