import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import React from 'react';

import { isLoggedIn } from '../../../../stores/appLocalStorage';
import * as loginActionCreators from '../../../../action_creators/loginActionCreators';
import LoginForm from './LoginForm';

const mapStateToProps = state => ({
  login: state.login,
});

const mapDispatchToProps = dispatch => ({
  loginActions: bindActionCreators(loginActionCreators, dispatch),
});

function LoginApp({ login, loginActions, redirect_url }) {
  const {
    email,
    loading,
    password,
  } = login;

  if (isLoggedIn()) {
    window.location = '/timesheets';
    return <div />;
  }

  return (
    <div className="page-container">
      <div className="row space-bottom-lg space-top-lg">
        <div className="col-md-6 col-center">
          <h1>Hello</h1>

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
  redirect_url: PropTypes.string,
};

LoginApp.defaultProps = {
  email: '',
  loading: false,
  password: '',
  redirect_url: null,
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginApp);
