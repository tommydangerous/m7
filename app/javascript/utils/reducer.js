/* eslint-disable import/prefer-default-export */

export function combine(previousProps, nextProps) {
  return {
    ...previousProps,
    ...nextProps,
  };
}
