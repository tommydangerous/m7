import SimpleReducerGenerator from './SimpleReducerGenerator';

const RESET_STATE = {};
const INITIAL_STATE = {};

export default function reducers(state, action) {
  return SimpleReducerGenerator({
    action,
    name: 'customers',
    responseParsers: {
      index: resp => resp.Customers.map(obj => obj.Customer),
    },
    states: {
      current: state,
      initial: INITIAL_STATE,
      reset: RESET_STATE,
    },
  });
}
