import moment from 'moment';

import SimpleActionCreatorGenerator from './SimpleActionCreatorGenerator';

import { roundNumber } from '../utils/numberTransformers';

const calculateDuration = (startTime, endTime) => {
  let hours = 0;
  let minutes = 0;

  if (startTime && endTime) {
    const arr1 = startTime.split(':')
    const arr2 = endTime.split(':')

    if (arr1[0] || arr2[0]) {
      hours = Math.abs(parseInt(arr2[0] || 0) - parseInt(arr1[0] || 0));
    }

    if (arr1[1] || arr2[1]) {
      minutes = Math.abs(parseInt(arr2[1] || 0) - parseInt(arr1[1] || 0)) / 60;
    }
  }
  return hours + minutes;
};

const sharedPayloadParser = payload => {
  let duration = payload.duration;
  let employeeId;
  let endTime = payload.end_time;
  let startTime = payload.start_time;
  let type;

  if (!!payload.employee_id) {
    employeeId = payload.employee_id;
    type = 'Employee';
  } else if (!!payload.vendor_id) {
    employeeId = payload.vendor_id;
    type = 'Vendor';
  }

  if (duration) {
    if (!endTime && !startTime) {
      const now = moment();
      endTime = `${now.hours()}:${now.minutes() < 10 ? 0 : ''}${now.minutes()}`;

      const durationToSeconds = duration * 60 * 60;
      const beforeNow = moment(now.valueOf() - (durationToSeconds * 1000));
      startTime = `${beforeNow.hours()}:${beforeNow.minutes() < 10 ? 0 : ''}${beforeNow.minutes()}`;
    }
  } else if (endTime && startTime) {
    duration = roundNumber(calculateDuration(startTime, endTime));
  }

  return {
    'TimeEntry': {
      ...payload,
      billable: payload.billable ? 'Yes' : 'No',
      duration,
      employee_id: employeeId,
      end_time: endTime,
      start_time: startTime,
      type,
    },
  };
};

const generator = SimpleActionCreatorGenerator({
  name: 'timesheets',
  payloadParsers: {
    create: sharedPayloadParser,
    update: sharedPayloadParser,
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
