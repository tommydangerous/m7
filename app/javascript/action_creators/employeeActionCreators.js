import SimpleActionCreatorGenerator from './SimpleActionCreatorGenerator';

const generator = SimpleActionCreatorGenerator({ name: 'employees' });

export function index(opts) {
  return generator.index(opts);
}
