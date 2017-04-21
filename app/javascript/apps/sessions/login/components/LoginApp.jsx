import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import React from 'react';

import * as loginActionCreators from '../../../../action_creators/loginActionCreators';

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
      <div className="panel panel-body">
        <h1>Login</h1>
        <form
          action="#"
          method="POST"
          onSubmit={(e) => {
            e.preventDefault();
            loginActions.login();
          }}
        >
          <input
            className="space-1"
            onChange={(e) => loginActions.updateInputValue('email', e.target.value)}
            placeholder="Email"
            type="text"
            value={email}
          />

          <input
            className="space-1"
            autoComplete="off"
            onChange={(e) => loginActions.updateInputValue('password', e.target.value)}
            placeholder="Password"
            type="password"
            value={password}
          />

          <button
            className={`btn ${loading ? 'loading' : ''}`}
            disabled={loading}
            onClick={loginActions.login}
          >
            Login
          </button>
        </form>
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
