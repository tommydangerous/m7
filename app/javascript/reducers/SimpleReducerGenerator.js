import { combine } from '../utils/reducer';
import SimpleActionGenerator from '../actions/SimpleActionGenerator';

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
      current: state,
      initial,
      reset,
    },
  } = opts;
  const {
    errors,
    loading,
  } = state;

  const {
    CREATE,
    DELETE,
    INDEX,
    SHOW,
    UPDATE,
  } = SimpleActionGenerator({ name: pluralName });

  const objectsByIdKey = `${pluralName}ById`;
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
        console.log(obj);
        objectsByIdUpdated[objectsByIdKey][obj.id] = obj;
      });
      return combine(combine(state, reset), objectsByIdUpdated);
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
      return combine(combine(state, reset), objectsByIdUpdated);
    }

    default: {
      return state;
    }
  }
}
