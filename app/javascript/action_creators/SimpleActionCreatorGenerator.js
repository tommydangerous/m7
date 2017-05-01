import { createGenericRequest } from './sharedActionCreators';
import SimpleActionGenerator from '../actions/SimpleActionGenerator';

export default function generate(opts = {}) {
  const {
    name: pluralName,
  } = opts;

  const actions = SimpleActionGenerator({ name: pluralName });

  return {
    attributesUpdated: (payload = {}) => {
      return {
        ...payload,
        type: actions.ATTRIBUTES.UPDATED,
      };
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

    },
  };
}
