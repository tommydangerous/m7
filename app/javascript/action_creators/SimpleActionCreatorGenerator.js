import { createGenericRequest } from './sharedActionCreators';
import { singularize } from '../utils/stringTransformers';
import SimpleActionGenerator from '../actions/SimpleActionGenerator';

export default function generate(opts = {}) {
  const {
    name: pluralName,
    payloadParsers,
    singularName,
  } = opts;

  const actions = SimpleActionGenerator({ name: pluralName });
  const nameSingular = singularName || singularize(pluralName);

  return {
    attributesUpdated: (payload = {}) => {
      const dict = { type: actions.ATTRIBUTES.UPDATED };
      dict[nameSingular] = { ...dict[nameSingular], ...payload };
      return dict;
    },

    selfSelected: obj => {
      const dict = { type: actions.SELF.SELECTED };
      dict[nameSingular] = obj;
      return dict;
    },

    create: (payload = {}) => {
      let dict = { ...payload };
      if (payloadParsers.create) {
        dict = payloadParsers.create(dict);
      }
      if (!!dict.id) {
        delete dict.id;
      }
      return createGenericRequest('POST', `/api/${pluralName}/add`, { payload: dict }, {
        failedActionType: actions.CREATE.FAILED,
        startedActionType: actions.CREATE.STARTED,
        succeededActionType: actions.CREATE.SUCCEEDED,
      });
    },

    deleteObject: (id, query = {}) => {
      const updatedQuery = {
        ...query,
        id,
      };
      return createGenericRequest('POST', `/api/${pluralName}/delete`, { query: updatedQuery }, {
        failedActionType: actions.DELETE.FAILED,
        startedActionType: actions.DELETE.STARTED,
        succeededActionType: actions.DELETE.SUCCEEDED,
      });
    },

    index: (query = {}) => {
      return createGenericRequest('GET', `/api/${pluralName}/view`, { query }, {
        failedActionType: actions.INDEX.FAILED,
        startedActionType: actions.INDEX.STARTED,
        succeededActionType: actions.INDEX.SUCCEEDED,
      });
    },

    show: (id, query = {}) => {

    },

    update: (id, payload = {}) => {
      let dict = { ...payload };
      if (payloadParsers.update) {
        dict = payloadParsers.update(dict);
      }
      if (!!dict.id) {
        delete dict.id;
      }
      // dict.id = id;
      return createGenericRequest('POST', `/api/${pluralName}/edit`, { payload: dict }, {
        failedActionType: actions.UPDATE.FAILED,
        startedActionType: actions.UPDATE.STARTED,
        succeededActionType: actions.UPDATE.SUCCEEDED,
      });
    },
  };
}
