import { PropTypes } from 'prop-types';
import React from 'react';

const propTypes = {
  autoComplete: PropTypes.string,
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  numberOnly: PropTypes.bool,
  onChangeInput: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  scale: PropTypes.number,
  value: PropTypes.string,
};

const defaultProps = {
  autoComplete: 'off',
  numberOnly: false,
  placeholder: null,
  scale: 0,
};

export default class SimpleTextField extends React.Component {
  constructor(props) {
    super(props);
    this.onChangeInput = this.onChangeInput.bind(this);
  }

  onChangeInput(e) {
    if (this.props.numberOnly) {
      let regex = new RegExp(`[0-9]*`);
      if (this.props.scale > 0) {
        regex = new RegExp(`[0-9]*[.]{0,1}[0-9]{0,${this.props.scale}}`);
      }
      e.target.value = e.target.value.match(regex);
    }
    this.props.onChangeInput(e);
  }

  render() {
    return (
      <div>
        {this.props.label && (
          <label>
            {this.props.label}
          </label>
        )}
        <input
          autoComplete={this.props.autoComplete}
          defaultValue={this.props.value}
          name={this.props.name}
          onChange={this.onChangeInput}
          placeholder={this.props.placeholder}
          type="text"
        />
      </div>
    );
  }
};

SimpleTextField.defaultProps = defaultProps;
SimpleTextField.propTypes = propTypes;
