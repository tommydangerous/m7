import SimpleReducerGenerator from './SimpleReducerGenerator';

const RESET_STATE = {};
const INITIAL_STATE = {};

const singleObjectParser = resp => {
  const { TimeEntry } = resp;
  return {
    ...TimeEntry,
    billable: TimeEntry.billable.toLowerCase() === 'yes',
  };
};

export default function reducers(state, action) {
  return SimpleReducerGenerator({
    action,
    name: 'timesheets',
    responseParsers: {
      index: resp => resp.TimeEntries.map(obj => singleObjectParser(obj)),
      create: singleObjectParser,
      update: resp => {
        const {
          id,
        } = resp.m7;
        return {
          ...singleObjectParser(resp.m7),
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
