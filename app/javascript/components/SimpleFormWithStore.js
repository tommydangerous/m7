import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import SimpleForm from './SimpleForm';

export default function({ actionCreators, selector }) {
  const mapStateToProps = state => ({
    ...selector(state),
  });

  const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(actionCreators, dispatch),
  });

  class SimpleFormWithStore extends SimpleForm {
    onChangeInput(e) {
      const hash = {};
      hash[e.target.name] = e.target.value;
      actions.updateAttributes(hash);
    }

    submitFormPayload() {
      const _this = this;
      const payload = {};
      this.props.fields.forEach(hash => {
        payload[hash.name] = _this.props[hash.name];
      });
      return payload;
    }
  };
  return connect(mapStateToProps, mapDispatchToProps)(SimpleFormWithStore);
}
