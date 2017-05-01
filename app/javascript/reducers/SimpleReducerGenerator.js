import { combine } from '../utils/reducer';
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

const DEFAULT_INITIAL_STATE = combine(DEFAULT_RESET_STATE, {});

export default function generate(opts = {}) {
  const {
    action: {
      error,
      response,
      type,
    },
    name: pluralName,
    responseParsers,
    states: {
      current,
      initial,
      reset,
    },
  } = opts;

  const {
    CREATE,
    DELETE,
    INDEX,
    SHOW,
    UPDATE,
  } = SimpleActionGenerator({ name: pluralName });
  const objectsByIdKey = `${pluralName}ById`;

  const initialState = { ...DEFAULT_INITIAL_STATE };
  initialState[objectsByIdKey] = {};
  const state = current || combine(initialState, initial);
  const {
    errors,
    loading,
  } = state;

  const objectsByIdUpdated = {};
  objectsByIdUpdated[objectsByIdKey] = { ...state[objectsByIdKey] };

  switch(type) {
    case INDEX.FAILED: {
      return combine(state, {
        errors: { ...errors, index: error },
        loading: { ...loading, index: false },
      });
    }
    case INDEX.STARTED: {
      return combine(state, { loading: { ...loading, index: false } });
    }
    case INDEX.SUCCEEDED: {
      responseParsers.index(response).forEach(obj => {
        // console.log(obj);
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

    case CREATE.FAILED: {
      return combine(state, {
        errors: { ...errors, create: error },
        loading: { ...loading, create: false },
      });
    }
    case CREATE.STARTED: {
      return combine(state, { loading: { ...loading, create: false } });
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

    default: {
      return state;
    }
  }
}
