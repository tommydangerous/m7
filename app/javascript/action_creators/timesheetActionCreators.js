import moment from 'moment';

import SimpleActionCreatorGenerator from './SimpleActionCreatorGenerator';

import { calculateDuration, durationToTime } from '../utils/timeFunctions';
import { roundNumber } from '../utils/numberTransformers';

const updatePayloadParser = payload => {
  let duration = payload.duration;
  // let employeeId;
  let endTime = payload.end_time;
  let startTime = payload.start_time;
  // let type;

  // if (!!payload.employee_id) {
  //   employeeId = payload.employee_id;
  //   type = 'Employee';
  // } else if (!!payload.vendor_id) {
  //   employeeId = payload.vendor_id;
  //   type = 'Vendor';
  // }

  if (duration) {
    if (!endTime && !startTime) {
      const {
        endTime: et,
        startTime: st,
      } = durationToTime(duration);
      endTime = et;
      startTime = st;
    }
  } else if (endTime && startTime) {
    duration = roundNumber(calculateDuration(startTime, endTime));
  }

  return {
    TimeEntry: {
      ...payload,
      billable: payload.billable ? 'Yes' : 'No',
      duration,
      // employee_id: employeeId,
      end_time: endTime,
      start_time: startTime,
      // type,
    },
  };
};

const createPayloadParser = payload => {
  const data = updatePayloadParser(payload).TimeEntry;
  if (payload.hours_off_duty) {
    data.duration = data.duration - payload.hours_off_duty;
  }

  return {
    TimeEntry: {
      ...data,
    },
  };
};

const generator = SimpleActionCreatorGenerator({
  name: 'timesheets',
  payloadParsers: {
    create: createPayloadParser,
    update: updatePayloadParser,
  },
});

export function attributesUpdated(opts) {
  return generator.attributesUpdated(opts);
}

export function create(opts) {
  return generator.create(opts);
}

export function deleteObject(id, opts) {
  return generator.deleteObject(id, opts);
}

export function index(opts) {
  return generator.index(opts);
}

export function selfSelected(obj) {
  return generator.selfSelected(obj);
}

export function update(id, opts) {
  return generator.update(id, opts);
}
