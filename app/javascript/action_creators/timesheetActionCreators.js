import SimpleActionCreatorGenerator from './SimpleActionCreatorGenerator';

const generator = SimpleActionCreatorGenerator({
  name: 'timesheets',
});

export function attributesUpdated(opts) {
  return generator.attributesUpdated(opts);
}

export function create(opts) {
  return generator.create(opts);
}

export function deleteObject(id, opts) {
  return generator.deleteObject(id, opts);
}

export function index(opts) {
  return generator.index(opts);
}

export function selfSelected(obj) {
  return generator.selfSelected(obj);
}

export function update(id, opts) {
  return generator.update(id, opts);
}
