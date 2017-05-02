import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import React from 'react';

import SimpleForm from './SimpleForm';

export default function generate(opts = {}) {
  const {
    actionCreators,
    selector,
  } = opts;

  const mapStateToProps = state => ({
    ...selector(state),
  });

  const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(actionCreators, dispatch),
  });

  class SimpleFormWithStore extends SimpleForm {
    onChangeCheckbox(e) {
      const name = e.target.name;
      const value = !this.props[name];
      this.onChangeInput({
        target: {
          name,
          value,
        },
      });
    }

    onChangeInput(e) {
      const dict = {};
      dict[e.target.name] = e.target.value;
      this.props.actions.attributesUpdated(dict);
    }

    submitFormPayload() {
      const payload = {  };
      this.fields().forEach(obj => {
        payload[obj.name] = this.props[obj.name];
      });
      return payload;
    }
  };

  return connect(mapStateToProps, mapDispatchToProps)(SimpleFormWithStore);
}
