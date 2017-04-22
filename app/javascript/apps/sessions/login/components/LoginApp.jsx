import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import React from 'react';

import * as loginActionCreators from '../../../../action_creators/loginActionCreators';
import LoginForm from './LoginForm';

const mapStateToProps = state => ({
  login: state.login,
});

const mapDispatchToProps = dispatch => ({
  loginActions: bindActionCreators(loginActionCreators, dispatch),
});

function LoginApp({ login, loginActions }) {
  const {
    email,
    loading,
    password,
  } = login;

  return (
    <div className="page-container">
      <div className="row">
        <div className="col-sm-6 col-center">
          <LoginForm
            email={email}
            loading={loading}
            onInputChange={loginActions.updateInputValue}
            onSubmit={loginActions.login}
            password={password}
          />
        </div>
      </div>
    </div>
  );
}

LoginApp.propTypes = {
  email: PropTypes.string,
  loading: PropTypes.bool,
  password: PropTypes.string,
};

LoginApp.defaultProps = {
  email: '',
  loading: false,
  password: '',
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginApp);
