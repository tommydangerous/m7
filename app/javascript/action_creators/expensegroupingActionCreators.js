import SimpleActionCreatorGenerator from './SimpleActionCreatorGenerator';

const generator = SimpleActionCreatorGenerator({ name: 'expensegroupings' });

export function index(opts) {
  return generator.index(opts);
}
