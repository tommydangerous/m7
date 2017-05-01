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
  constructor() {
    super();
    this.onAutocompleteLocation = this.onAutocompleteLocation.bind(this);
    this.onChangeInput = this.onChangeInput.bind(this);
    this.onChangeCheckbox = this.onChangeCheckbox.bind(this);
    this.onClickCancel = this.onClickCancel.bind(this);
    this.onSubmitForm = this.onSubmitForm.bind(this);
    this.state = this.initialState();
  }

  initialState() {
    return {
      // errors: null,
      // loading: false,
      timestamp: new Date(),
    };
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

  onChangeInput(e) {
    this.state[e.target.name] = e.target.value;
  }

  onChangeCheckbox(e) {
    this.state[e.target.name] = !this.state[e.target.name];
  }

  onClickCancel(e) {
    e.preventDefault();
    this.props.onClickCancel();
  }

  onSubmitForm(e) {
    // This method (this.props.onSubmitForm) needs to return a promise
    e.preventDefault();
    // this.setState({ loading: true });
    const _this = this;
    const promise = this.props.onSubmitForm(this.submitFormPayload());

    promise.then(
      function(opts) {
        _this.reset(opts ? opts.response : {});
      },
      function(xhr) {
        _this.setState({
          // errors: handleError(xhr),
          loading: false,
        });
      });
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
          if (a.order > b.order) {
            return 1;
          } else if (a.order < b.order) {
            return -1;
          }
          return 0;
        });
      return sorted;
    }
    return fields;
  }

  submitFormPayload() {
    const payload = Object.assign({}, this.state);
    // delete payload['errors'];
    // delete payload['loading'];
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
    return (
      <SimpleCheckbox
        defaultValue={this.props[hash.name]}
        name={hash.name}
        onChangeInput={this.onChangeCheckbox}
        value={this.props[hash.name]}
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
    const { error } = this.props;
    if (error) {
      return (
        <div className="background-red panel-body-small text-center text-contrast">
          {error}
        </div>
      );
    }
  }

  renderField() {
    const _this = this;
    return this.fields().map(function(hash) {
      var header;
      if (hash.label) {
        header = (
          <label>
            {hash.label}
          </label>
        );
      }
      var field;
      switch (hash.type) {
        case 'date':
          field = _this.renderDateField(hash);
          break;
        case 'checkbox':
          field = _this.renderCheckbox(hash);
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
      return (
        <div className="space-2" key={hash.name}>
          {header}
          {field}
        </div>
      )
    });
  }

  renderHeader() {
    if (this.props.header) {
      return (
        <div className="panel-header">
          {this.props.header}
        </div>
      );
    }
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
        onChangeSelect={this.onChangeInput}
        options={hash.options}
      />
    );
  }

  renderTextarea(hash) {
    return (
      <textarea
        autoComplete="off"
        defaultValue={this.props[hash.name]}
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
        value={this.props[hash.name]}
      />
    );
  }

  render() {
    const {
      loading,
    } = this.props;

    return (
      <div key={this.state.timestamp}>
        {this.renderErrors()}
        <div className="panel">
          {this.renderHeader()}
          <form action="#" onSubmit={this.onSubmitForm}>
            <div className="panel-body">
              {this.renderField()}
              {this.props.children}
            </div>

            <div className="panel-footer">
              <div>
                {this.renderCancelButton()}
                <button
                  className={cx("btn btn-primary", { loading: loading })}
                  disabled={loading}
                >
                  {this.props.submitFormButtonText ? this.props.submitFormButtonText : "Save"}
                </button>
              </div>
            </div>
          </form>
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
  submitFormButtonText: PropTypes.string,
};

SimpleForm.defaultProps = {
  header: null,
  error: null,
  loading: false,
  onClickCancel() {},
  submitFormButtonText: null,
};
