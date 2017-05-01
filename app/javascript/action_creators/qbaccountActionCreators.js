import SimpleActionCreatorGenerator from './SimpleActionCreatorGenerator';

const generator = SimpleActionCreatorGenerator({ name: 'qbaccounts' });

export function index(opts) {
  return generator.index(opts);
}
