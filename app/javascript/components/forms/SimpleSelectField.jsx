import { PropTypes } from 'prop-types';
import React from 'react';

// defaultValue: The default value of the select field
// name: The name of the select parameter
// onChangeSelect: The function that is called when the select field changes
// options: An array of option hashes for the select field
const propTypes = {
  defaultValue: PropTypes.oneOfType([PropTypes.bool, PropTypes.number, PropTypes.string]),
  name: PropTypes.string.isRequired,
  onChangeSelect: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(PropTypes.shape({
    disabled: PropTypes.bool,
    text: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([PropTypes.bool, PropTypes.number, PropTypes.string]).isRequired,
  })).isRequired,
};

class SimpleSelectField extends React.Component {
  constructor(props) {
    super(props);
    this.onChangeSelect = this.onChangeSelect.bind(this);
  }

  onChangeSelect(e) {
    this.props.onChangeSelect(e);
  }

  render() {
    let firstLoop = false;
    let initiallySelectedOption;
    const selectOptions = this.props.options.map((selectOption) => {
      // If the first option is not disabled, set the state to use that value
      if (!firstLoop && !selectOption.disabled) {
        initiallySelectedOption = selectOption.value;
      }
      firstLoop = true;
      return (
        <option
          disabled={selectOption.disabled && this.props.defaultValue}
          key={selectOption.value}
          type={selectOption.type}
          value={selectOption.value}
        >
          {selectOption.text}
        </option>
      );
    });
    return (
      <div className="select select-block">
        <select
          name={this.props.name}
          onChange={this.onChangeSelect}
          value={this.props.defaultValue}
        >
          {selectOptions}
        </select>
      </div>
    );
  }
};

SimpleSelectField.propTypes = propTypes;

export default SimpleSelectField;
