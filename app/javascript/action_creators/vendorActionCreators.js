import SimpleActionCreatorGenerator from './SimpleActionCreatorGenerator';

const generator = SimpleActionCreatorGenerator({ name: 'vendors' });

export function index(opts) {
  return generator.index(opts);
}
