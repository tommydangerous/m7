import SimpleActionCreatorGenerator from './SimpleActionCreatorGenerator';

const generator = SimpleActionCreatorGenerator({ name: 'customers' });

export function index(opts) {
  return generator.index(opts);
}
