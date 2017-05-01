import SimpleActionCreatorGenerator from './SimpleActionCreatorGenerator';

const generator = SimpleActionCreatorGenerator({ name: 'qbclasses' });

export function index(opts) {
  return generator.index(opts);
}
