export function calculateDuration(startTime, endTime) {
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

export function durationToTime(duration) {
  const now = moment();
  const endTime = `${now.hours()}:${now.minutes() < 10 ? 0 : ''}${now.minutes()}`;

  const durationToSeconds = duration * 60 * 60;
  const beforeNow = moment(now.valueOf() - (durationToSeconds * 1000));
  const startTime =
    `${beforeNow.hours()}:${beforeNow.minutes() < 10 ? 0 : ''}${beforeNow.minutes()}`;

  return {
    endTime,
    startTime,
  };
}
