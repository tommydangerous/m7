import { PropTypes } from 'prop-types';
import React from 'react';

// defaultValue: The default value of the select field
// name: The name of the select parameter
const propTypes = {
  defaultValue: PropTypes.oneOfType([PropTypes.bool, PropTypes.number, PropTypes.string]),
  name: PropTypes.string.isRequired,
  onChangeInput: PropTypes.func.isRequired,
  value: PropTypes.oneOfType([PropTypes.bool, PropTypes.number, PropTypes.string]),
};

class SimpleCheckbox extends React.Component {
  constructor(props) {
    super(props);
    this.onChangeInput = this.onChangeInput.bind(this);
  }

  onChangeInput(e) {
    this.props.onChangeInput(e);
  }

  render() {
    return (
      <div className="checkbox">
        <input
          defaultValue={this.props.defaultValue}
          name={this.props.name}
          onChange={this.onChangeInput}
          type="checkbox"
          value={this.props.value}
        />
      </div>
    );
  }
};

SimpleCheckbox.propTypes = propTypes;

export default SimpleCheckbox;
