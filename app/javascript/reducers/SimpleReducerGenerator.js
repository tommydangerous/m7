import { combine } from '../utils/reducer';
import { singularize } from '../utils/stringTransformers';
import SimpleActionGenerator from '../actions/SimpleActionGenerator';

const DEFAULT_RESET_STATES = {
  create: null,
  delete: null,
  index: null,
  show: null,
  update: null,
};

const DEFAULT_RESET_STATES_FOR_SUCCESSES = {
  create: 0,
  delete: 0,
  index: 0,
  show: 0,
  update: 0,
};

const DEFAULT_RESET_STATE = {
  errors: { ...DEFAULT_RESET_STATES },
  loading: { ...DEFAULT_RESET_STATES },
};

const updateSuccesses = (key, dict) => {
  const updated = { ...dict };
  updated[key] += 1;
  return updated;
};

export default function generate(opts = {}) {
  const {
    action,
    name: pluralName,
    responseParsers,
    saveParsers,
    singularName,
    states: {
      current,
      initial,
      reset,
    },
  } = opts;

  const {
    error,
    payload,
    query,
    response,
    type,
  } = action;

  const {
    CREATE,
    DELETE,
    INDEX,
    SHOW,
    UPDATE,

    ATTRIBUTES,
    SELF,
  } = SimpleActionGenerator({ name: pluralName, singularName });
  const objectsByIdKey = `${pluralName}ById`;

  const resetState = { ...DEFAULT_RESET_STATE };
  const nameSingular = singularName || singularize(pluralName);
  resetState[nameSingular] = null;

  const initialState = combine(resetState, {
    successes: { ...DEFAULT_RESET_STATES_FOR_SUCCESSES },
  });
  initialState[objectsByIdKey] = {};

  const state = current || combine(initialState, initial || {});
  const {
    errors,
    loading,
    successes,
  } = state;

  const objectsByIdUpdated = {};
  objectsByIdUpdated[objectsByIdKey] = { ...state[objectsByIdKey] };

  switch(type) {
    case CREATE.FAILED: {
      return combine(state, {
        errors: { ...errors, create: error },
        loading: { ...loading, create: false },
      });
    }
    case CREATE.STARTED: {
      return combine(state, { loading: { ...loading, create: true } });
    }
    case CREATE.SUCCEEDED: {
      const obj = responseParsers.create(response);
      const id = obj.id;

      let updatedPayload = payload;
      if (saveParsers.create) {
        updatedPayload = saveParsers.create(payload);
      }

      objectsByIdUpdated[objectsByIdKey][id] = {
        id,
        ...obj,
        // This is required since the server response is incomplete
        ...updatedPayload,
      };

      return combine(
        combine(
          state,
          combine(DEFAULT_RESET_STATE, reset || {}),
        ),
        {
          ...objectsByIdUpdated,
          successes: updateSuccesses('create', successes),
        },
      );
    }

    case DELETE.FAILED: {
      return combine(state, {
        errors: { ...errors, delete: error },
        loading: { ...loading, delete: false },
      });
    }
    case DELETE.STARTED: {
      return combine(state, { loading: { ...loading, delete: true } });
    }
    case DELETE.SUCCEEDED: {
      delete objectsByIdUpdated[objectsByIdKey][query.id];
      return combine(
        combine(
          state,
          combine(DEFAULT_RESET_STATE, reset),
        ),
        objectsByIdUpdated,
      );
    }

    case INDEX.FAILED: {
      return combine(state, {
        errors: { ...errors, index: error },
        loading: { ...loading, index: false },
      });
    }
    case INDEX.STARTED: {
      return combine(state, { loading: { ...loading, index: true } });
    }
    case INDEX.SUCCEEDED: {
      responseParsers.index(response).forEach(obj => {
        objectsByIdUpdated[objectsByIdKey][obj.id] = obj;
      });
      return combine(
        combine(
          state,
          combine(DEFAULT_RESET_STATE, reset),
        ),
        objectsByIdUpdated,
      );
    }

    case UPDATE.FAILED: {
      return combine(state, {
        errors: { ...errors, update: error },
        loading: { ...loading, update: false },
      });
    }
    case UPDATE.STARTED: {
      return combine(state, { loading: { ...loading, update: true } });
    }
    case UPDATE.SUCCEEDED: {
      const id = payload.id;
      const currentObj = objectsByIdUpdated[objectsByIdKey][id];
      let updatedObj = {};
      if (responseParsers.update) {
        updatedObj = responseParsers.update(response);
      }

      let updatedPayload = payload;
      if (saveParsers.update) {
        updatedPayload = saveParsers.update(payload);
      }

      objectsByIdUpdated[objectsByIdKey][id] = {
        ...currentObj,
        ...updatedObj,
        // This is required since the server response is incomplete
        ...updatedPayload,
      };
      return combine(
        combine(
          state,
          combine(DEFAULT_RESET_STATE, reset),
        ),
        {
          ...objectsByIdUpdated,
          successes: updateSuccesses('update', successes),
        },
      );
    }

    case ATTRIBUTES.UPDATED: {
      const dict = {};
      dict[nameSingular] = combine(state[nameSingular], action[nameSingular]);
      return combine(state, dict);
    }

    case SELF.SELECTED: {
      const dict = {};
      dict[nameSingular] = action[nameSingular];
      return combine(state, dict);
    }

    default: {
      return state;
    }
  }
}
