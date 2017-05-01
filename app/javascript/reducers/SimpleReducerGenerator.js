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

const DEFAULT_RESET_STATE = {
  errors: { ...DEFAULT_RESET_STATES },
  loading: { ...DEFAULT_RESET_STATES },
};

export default function generate(opts = {}) {
  const {
    action,
    name: pluralName,
    responseParsers,
    singularName,
    states: {
      current,
      initial,
      reset,
    },
  } = opts;

  const {
    error,
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
  resetState[nameSingular] = {};

  const initialState = combine(resetState, {});
  initialState[objectsByIdKey] = {};

  const state = current || combine(initialState, initial);
  const {
    errors,
    loading,
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
      objectsByIdUpdated[objectsByIdKey][obj.id] = obj;
      return combine(
        combine(
          state,
          combine(DEFAULT_RESET_STATE, reset),
        ),
        objectsByIdUpdated,
      );
    }

    case DELETE.FAILED: {
      return state;
    }
    case DELETE.STARTED: {
      return state;
    }
    case DELETE.SUCCEEDED: {
      return state;
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
