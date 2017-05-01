import { createGenericRequest } from './sharedActionCreators';
import { singularize } from '../utils/stringTransformers';
import SimpleActionGenerator from '../actions/SimpleActionGenerator';

export default function generate(opts = {}) {
  const {
    name: pluralName,
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
      return createGenericRequest('POST', `/api/${pluralName}/add`, { payload }, {
        failedActionType: actions.CREATE.FAILED,
        startedActionType: actions.CREATE.STARTED,
        succeededActionType: actions.CREATE.SUCCEEDED,
      });
    },

    delete: (id, query = {}) => {

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
      const updatedPayload = {
        ...payload,
        id,
      };
      return createGenericRequest('POST', `/api/${pluralName}/edit`, { payload: updatedPayload }, {
        failedActionType: actions.UPDATE.FAILED,
        startedActionType: actions.UPDATE.STARTED,
        succeededActionType: actions.UPDATE.SUCCEEDED,
      });
    },
  };
}
