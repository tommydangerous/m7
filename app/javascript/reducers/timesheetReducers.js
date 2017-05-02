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
      update: resp => {
        const {
          id,
          TimeEntry,
        } = resp.m7;
        return {
          ...TimeEntry,
          id,
        };
      },
    },
    states: {
      current: state,
      initial: INITIAL_STATE,
      reset: RESET_STATE,
    },
  });
}
