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
  const dict = {
    'ATTRIBUTES': {
      'UPDATED': `${resource}_ATTRIBUTES_UPDATED`,
    },
    'SELF': {
      'SELECTED': `${resource}_SELF_SELECTED`,
    },
  };

  METHODS.forEach(method => {
    dict[method] = {};
    STAGES.forEach(stage => {
      const actionType = `${resource}_${method}_${stage}`;
      dict[method][stage] = actionType;
    });
  });

  return dict;
}
