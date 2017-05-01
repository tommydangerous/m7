import SimpleReducerGenerator from './SimpleReducerGenerator';

const RESET_STATE = {};
const INITIAL_STATE = {};

export default function reducers(state, action) {
  return SimpleReducerGenerator({
    action,
    name: 'timesheets',
    responseParsers: {
      index: resp => resp.TimeEntries.map(obj => obj.TimeEntry),
      create: resp => resp.TimeEntry,
    },
    states: {
      current: state,
      initial: INITIAL_STATE,
      reset: RESET_STATE,
    },
  });
}
