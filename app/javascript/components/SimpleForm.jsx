import { PropTypes } from 'prop-types';
import cx from 'classnames';
import React from 'react';

// Utils
import handleError from '../utils/handleError';

// Components
import DatepickerInput from './forms/DatepickerInput';
import LocationAutocompleteInput from './forms/LocationAutocompleteInput';
import SimpleCheckbox from './forms/SimpleCheckbox';
import SimpleSelectField from './forms/SimpleSelectField';
import SimpleTextField from './forms/SimpleTextField';

export default class SimpleForm extends React.Component {
  constructor(props) {
    super(props);

    const initState = this.props.initialState || {};

    this.onAutocompleteLocation = this.onAutocompleteLocation.bind(this);
    this.onChangeInput = this.onChangeInput.bind(this);
    this.onChangeCheckbox = this.onChangeCheckbox.bind(this);
    this.onClickCancel = this.onClickCancel.bind(this);
    this.onSubmitForm = this.onSubmitForm.bind(this);
    this.state = this.initialState({
      ...initState,
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.initialState) {
      let changed = 0;
      Object.keys(nextProps.initialState).forEach(key => {
        if (nextProps.initialState[key] !== this.props.initialState[key]) {
          changed++;
        }
      });

      if (changed >= 1) {
        this.setState({ ...nextProps.initialState });
      }
    }
  }

  initialState(opts = {}) {
    const { error } = this.props;
    const state = {
      ...opts,
      error,
      timestamp: new Date(),
    };

    this.fields().forEach(obj => {
      if (obj.type === 'checkbox' && typeof obj.defaultValue !== 'undefined') {
        state[obj.name] = obj.defaultValue;
      }
    });

    return state;
  }

  onAutocompleteLocation(hash) {
    this.setState(hash);
  }

  onChangeDatepickerInput(name, date) {
    this.onChangeInput({
      target: {
        name: name,
        value: date,
      },
    });
  }

  onChangeCheckbox(e) {
    const name = e.target.name;
    const value = !this.state[name];
    this.onChangeInput({
      target: {
        name,
        value,
      },
    });
  }

  onChangeInput(e) {
    const newState = {};
    newState[e.target.name] = e.target.value;
    this.setState(newState);
  }

  onClickCancel(e) {
    e.preventDefault();
    this.props.onClickCancel();
  }

  onSubmitForm(e) {
    e.preventDefault();

    const _this = this;
    const payload = this.submitFormPayload();

    const errors = this.validatePayload(payload);
    if (Object.keys(errors).length === 0) {
      const promise = this.props.onSubmitForm(payload);
      promise.then(
        opts => {
          // _this.reset(opts ? opts.response : {});
          // _this.props.onSubmitFormCallback();
        },
        xhr => {});
    } else {
      const messages = Object.keys(errors).map(key => `${(errors[key].label)} is required`);
      this.setState({ error: messages[0] });
    }
  }

  fields() {
    const { fields } = this.props;
    if (!Array.isArray(fields)) {
      const sorted = Object
        .keys(fields)
        .map(key => {
          const obj = fields[key];
          obj.name = key;
          return obj;
        })
        .sort((a, b) => {
          const aOrder = Array.isArray(a.order) ? a.order[0] : a.order;
          const bOrder = Array.isArray(b.order) ? b.order[0] : b.order;
          if (aOrder > bOrder) {
            return 1;
          } else if (aOrder < bOrder) {
            return -1;
          }
          return 0;
        });
      return sorted;
    }
    return fields;
  }

  fieldsGroupedByOrder() {
    const group = {};
    this.fields().forEach(hash => {
      const order = Array.isArray(hash.order) ? hash.order[0] : hash.order;
      if (!group[order]) {
        group[order] = [];
      }
      group[order].push(hash);
    });
    return group;
  }

  submitFormPayload() {
    const payload = Object.assign({}, this.state);
    delete payload['error'];
    delete payload['timestamp'];
    return payload;
  }

  reset(response) {
    const state = this.state;
    const keys = Object.keys(this.state);
    for (var i = 0; i < keys.length; i++) {
      state[keys[i]] = null;
    }
    this.setState(Object.assign(state, this.initialState()));
  }

  validatePayload(payload) {
    const errors = {};
    const fields = this.fields();

    fields.forEach(obj => {
      const key = obj.name;
      if (!!obj.required && typeof payload[key] === 'undefined') {
        errors[key] = obj;
      }
    });

    return errors;
  }

  renderCancelButton() {
    if (this.props.cancelUrl) {
      return (
        <a className="btn" href={this.props.cancelUrl}>
          {"Cancel"}
        </a>
      );
    } else if (this.props.onClickCancel) {
      return (
        <a className="btn" href="#" onClick={this.onClickCancel}>
          {"Cancel"}
        </a>
      );
    }
  }

  renderCheckbox(hash) {
    let checked = this.props[hash.name];
    if (typeof checked === 'undefined') {
      checked = this.state[hash.name];
    }
    if (typeof checked === 'undefined') {
      checked = hash.defaultValue;
    }

    if (checked === 'Yes') {
      checked = true;
    } else if (checked === 'No') {
      checked = false;
    }

    return (
      <SimpleCheckbox
        checked={checked}
        name={hash.name}
        onChangeInput={this.onChangeCheckbox}
      />
    );
  }

  renderDateField(hash) {
    return (
      <DatepickerInput
        date={this.props[hash.name]}
        inputOnChange={this.onChangeDatepickerInput.bind(this, hash.name)}
        max_date={hash.maxDate}
        min_date={hash.minDate}
        name={hash.name}
      />
    )
  }

  renderErrors() {
    const {
      error,
    } = this.state;

    if (error) {
      return (
        <div className="background-red panel-body-small text-center text-contrast">
          {error}
        </div>
      );
    }
  }

  renderAllFields() {
    const _this = this;
    const group = this.fieldsGroupedByOrder();

    return Object.keys(group).sort((a, b) => a - b).map(order => {
      const arr = group[order];
      const row = arr.sort((c, d) => {
        if (Array.isArray(c.order) && Array.isArray(d.order)) {
          return c.order[1] - d.order[1];
        }
        return 0;
      }).map(hash => {
        let field;
        let header;

        const {
          label,
          name,
          type,
        } = hash;

        if (label) {
          header = (
            <label>
              {label}
            </label>
          );
        }

        switch (type) {
          case 'date':
            field = _this.renderDateField(hash);
            break;
          case 'checkbox':
            field = _this.renderCheckbox(hash);
            break;
          case 'hidden':
            field = _this.renderHiddenField(hash);
            break;
          case 'location':
            field = _this.renderLocationField(hash);
            break;
          case 'select':
            field = _this.renderSelectField(hash);
            break;
          case 'text':
            field = _this.renderTextField(hash);
            break;
          case 'textarea':
            field = _this.renderTextarea(hash);
            break;
        };

        const col = `col-sm-${12 / arr.length}`;

        return (
          <div className={`${col} space-2`} key={name}>
            {header}
            {field}
          </div>
        )
      });

      return (
        <div className="row" key={arr.map(h => h.name).join('-')}>
          {row}
        </div>
      );
    });
  }

  renderHeader() {
    if (this.props.header) {
      return (
        <div>
          <div className="panel-header">
            {this.props.header}
          </div>
          <div className="panel-header-divider" />
        </div>
      );
    }
  }

  renderHiddenField(hash) {
    return (
      <input
        name={hash.name}
        type="hidden"
        value={hash.value}
      />
    );
  }

  renderLocationField(hash) {
    const id = (new Date() + Math.random()).split(' ').join('');
    return (
      <LocationAutocompleteInput
        defaultValue={this.props[hash.name]}
        id={id}
        name={hash.name}
        onAutocomplete={this.onAutocompleteLocation}
        placeholder={hash.placeholder}
      />
    );
  }

  renderSelectField(hash) {
    return (
      <SimpleSelectField
        defaultValue={this.props[hash.name]}
        name={hash.name}
        onChangeSelect={e => {
          let el = e;
          if (hash.onChangeParser) {
            el = hash.onChangeParser(e);
          }
          this.onChangeInput(el);
        }}
        options={hash.options}
      />
    );
  }

  renderTextarea(hash) {
    return (
      <textarea
        autoComplete="off"
        name={hash.name}
        onChange={this.onChangeInput}
        placeholder={hash.placeholder}
        rows={hash.rows}
        value={this.props[hash.name]}
      />
    );
  }

  renderTextField(hash) {
    return (
      <SimpleTextField
        name={hash.name}
        numberOnly={!!hash.numberOnly}
        onChangeInput={this.onChangeInput}
        placeholder={hash.placeholder}
        scale={hash.scale}
        value={this.state[hash.name] || this.props[hash.name]}
      />
    );
  }

  render() {
    const {
      children,
      loading,
      submitFormButtonText,
    } = this.props;

    return (
      <div key={this.state.timestamp}>
        {this.renderErrors()}
        <div className="panel">
          {this.renderHeader()}

          <div>
            <form action="#" onSubmit={this.onSubmitForm}>

              <div className="panel-body">
                {this.renderAllFields()}
                {children}
              </div>

              <div className="panel-footer">
                <div>
                  {this.renderCancelButton()}
                  <button
                    className={cx("btn btn-primary", { loading: loading })}
                    disabled={loading}
                  >
                    {submitFormButtonText ? submitFormButtonText : "Save"}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
};

SimpleForm.propTypes = {
  error: PropTypes.string,
  header: PropTypes.string,
  fields: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.object),
    PropTypes.object,
  ]).isRequired,
  loading: PropTypes.bool,
  onClickCancel: PropTypes.func,
  onSubmitForm: PropTypes.func.isRequired,
  onSubmitFormCallback: PropTypes.func,
  submitFormButtonText: PropTypes.string,
};

SimpleForm.defaultProps = {
  header: null,
  error: null,
  loading: false,
  onClickCancel() {},
  onSubmitFormCallback() {},
  submitFormButtonText: null,
};
