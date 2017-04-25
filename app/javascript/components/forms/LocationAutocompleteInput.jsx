import { PropTypes } from 'prop-types';
import React from 'react';

const propTypes = {
  className: PropTypes.string,
  defaultValue: PropTypes.string,
  id: PropTypes.string,
  name: PropTypes.string,
  onAutocomplete: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
};

const defaultProps = {
  id: 'location-autocomplete',
  name: 'location',
};

export default class LocationAutocompleteInput extends React.Component {
  constructor(props) {
    super(props);
    this.initializeAutocomplete = this.initializeAutocomplete.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
  }

  componentDidMount() {
    this.initializeAutocomplete();
  }

  initializeAutocomplete() {
    initializeAutocomplete(
      document.getElementById(this.props.id), this.props.onAutocomplete
    );
  }

  onKeyDown(e) {
    if (e.keyCode === 13) {
      e.preventDefault();
    }
  }

  render() {
    return (
      <input
        className={this.props.className}
        defaultValue={this.props.defaultValue}
        id={this.props.id}
        name={this.props.name}
        onKeyDown={this.onKeyDown}
        placeholder={this.props.placeholder}
        type="text"
      />
    );
  }
};

LocationAutocompleteInput.propTypes = propTypes;
LocationAutocompleteInput.defaultProps = defaultProps;
