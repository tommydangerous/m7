import { PropTypes } from 'prop-types';
import React from 'react';

export default class Modal extends React.Component {
  constructor() {
    super();
    this.close = this.close.bind(this);
    this.state = {
      visible: false,
    };
  }

  componentDidMount() {
    if (this.props.visible) {
      this.setState({ visible: this.props.visible });
    }
  }

  close(e) {
    const self = this;
    const classes = ['modal__container', 'modal__table', 'modal__cell', 'modal__close--button'];
    e.target.className.split(' ').forEach(function(name) {
      if (classes.indexOf(name) != -1) {
        e.preventDefault();
        self.props.onClose();
        if (self.props.terminal) {
          self.setState({ visible: false });
        }
        return;
      }
    });
  }

  render() {
    let isVisible;
    if (this.props.terminal) {
      isVisible = this.state.visible;
    } else {
      isVisible = this.props.visible;
    }
    return (
      <div
        aria-hidden={!isVisible}
        className="modal modal__container"
        onClick={this.close}
      >
        <div className="modal__table">
          <div className="modal__cell">
            <div className="modal__content">
              {this.props.children}
            </div>
          </div>
        </div>
      </div>
    );
  }
};

Modal.propTypes = {
  onClose: PropTypes.func,
  // Set terminal to true if you want to only use this modal once
  terminal: PropTypes.bool,
  visible: PropTypes.bool,
};

Modal.defaultProps = {
  onClose: function() {},
  terminal: false,
  visible: false,
};
