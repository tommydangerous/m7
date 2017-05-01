import SimpleActionCreatorGenerator from './SimpleActionCreatorGenerator';

const generator = SimpleActionCreatorGenerator({ name: 'inventoryitems' });

export function index(opts) {
  return generator.index(opts);
}
