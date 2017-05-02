/* eslint-disable import/prefer-default-export */

export function combine(previousProps, nextProps) {
  const prev = previousProps || {};
  const next = nextProps || {};
  return {
    ...prev,
    ...next,
  };
}
