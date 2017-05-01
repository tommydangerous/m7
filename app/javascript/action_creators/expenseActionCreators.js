import SimpleActionCreatorGenerator from './SimpleActionCreatorGenerator';

const generator = SimpleActionCreatorGenerator({
  name: 'expenses',
  singularName: 'expense',
});

export function attributesUpdated(opts) {
  return generator.attributesUpdated(opts);
}

export function create(opts) {
  return generator.create(opts);
}

export function index(opts) {
  return generator.index(opts);
}

export function selfSelected(obj) {
  return generator.selfSelected(obj);
}
