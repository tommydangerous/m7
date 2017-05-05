import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import React from 'react';

import * as loginActionCreators from '../../../../action_creators/loginActionCreators';
import { getCurrentUser, isLoggedIn } from '../../../../stores/appLocalStorage';

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => ({
  loginActions: bindActionCreators(loginActionCreators, dispatch),
});

function HeaderMainApp({ loginActions }) {
  if (!isLoggedIn()) {
    return <div />;
  }

  const user = getCurrentUser();

  return (
    <ul className="nav pull-right list-unstyled">
      <li className="hide-sm pull-left">
        <a className="link-block link-reset" href="#" onClick={e => e.preventDefault()}>
          <i className="fa fa-clock-o" aria-hidden="true"></i>
        </a>
      </li>

      <li className="pull-left">
        <a className="link-block link-reset" href="/timesheets">
          Timesheets
        </a>
      </li>

      <li className="pull-left">
        <a className="link-block link-reset" href="/expenses">
          Expenses
        </a>
      </li>

      <li className="pull-left">
        <a
          className="link-block link-reset"
          href="#"
          onClick={(e) => {
            e.preventDefault();
            loginActions.logOut();
            window.location = '/login';
          }}
        >
          Log Out
        </a>
      </li>
    </ul>
  );
}

HeaderMainApp.propTypes = {
  loginActions: PropTypes.object,
  user: PropTypes.object,
};

HeaderMainApp.defaultProps = {
  loginActions: {},
  user: {},
};

export default connect(mapStateToProps, mapDispatchToProps)(HeaderMainApp);
