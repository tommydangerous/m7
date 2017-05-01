import { PropTypes } from 'prop-types';
import React from 'react';

// defaultValue: The default value of the select field
// name: The name of the select parameter
const propTypes = {
  checked: PropTypes.bool,
  name: PropTypes.string.isRequired,
  onChangeInput: PropTypes.func.isRequired,
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
    const {
      // defaultValue,
      checked,
      name,
      value,
    } = this.props;
    return (
      <div className="checkbox">
        <input
          checked={checked}
          name={name}
          onChange={this.onChangeInput}
          type="checkbox"
        />
      </div>
    );
  }
};

SimpleCheckbox.propTypes = propTypes;

SimpleCheckbox.defaultProps = {
  checked: false,
};

export default SimpleCheckbox;
