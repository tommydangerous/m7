const METHODS = [
  'CREATE',
  'DELETE',
  'INDEX',
  'SHOW',
  'UPDATE',
];

const STAGES = [
  'FAILED',
  'STARTED',
  'SUCCEEDED',
];

export default function generate(opts = {}) {
  const {
    name: pluraName,
  } = opts;
  const resource = pluraName.toUpperCase();
  const dict = {};

  METHODS.forEach(method => {
    STAGES.forEach(stage => {
      const key = `${resource}_${method}_${stage}`;
      dict[key] = key;
    });
  });

  return dict;
}

// Object.defineProperty(this, singular, {
//   value: {},
//   enumerable: true,
//   configurable: true,
//   writable: true,
// });
