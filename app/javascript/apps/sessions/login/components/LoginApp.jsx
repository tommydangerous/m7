import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { withRouter } from 'react-router-dom'
import DocumentTitle from 'react-document-title';
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

class LoginApp extends React.Component {
  componentDidUpdate(prevProps, prevState) {
    if (isLoggedIn()) {
      this.props.history.push('/timesheets');
    }
  }

  render() {
    const {
      history,
      login: {
        email,
        error,
        loading,
        password,
      },
      loginActions,
    } = this.props;

    return (
      <div className="page-container">
        <DocumentTitle title="Login" />

        <div className="row space-bottom-lg space-top-lg">
          <div className="col-md-6 col-center">
            <div className="panel-body">
              <h2 className="space-bottom-sm">
                Minute7
              </h2>

              <LoginForm
                email={email}
                loading={loading}
                onInputChange={loginActions.updateInputValue}
                onSubmit={loginActions.login}
                password={password}
              />

              {error && (
                <p className="color-red space-top-sm">
                  {error}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

LoginApp.propTypes = {
  email: PropTypes.string,
  error: PropTypes.string,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  loading: PropTypes.bool,
  password: PropTypes.string,
};

LoginApp.defaultProps = {
  email: '',
  error: null,
  loading: false,
  password: '',
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LoginApp));
