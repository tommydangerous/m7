import SimpleReducerGenerator from './SimpleReducerGenerator';

const RESET_STATE = {};
const INITIAL_STATE = {};

export default function reducers(state, action) {
  return SimpleReducerGenerator({
    action,
    name: 'qbaccounts',
    responseParsers: {
      index: resp => resp.QbAccounts.map(obj => obj.QbAccount),
    },
    states: {
      current: state,
      initial: INITIAL_STATE,
      reset: RESET_STATE,
    },
  });
}
