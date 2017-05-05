import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import React from 'react';

import { getCurrentUser, isLoggedIn } from '../../../../stores/appLocalStorage';

import * as loginActionCreators from '../../../../action_creators/loginActionCreators';
import * as modalActionCreators from '../../../../action_creators/modalActionCreators';

import * as modalSelectors from '../../../../selectors/modalSelectors';

import Modal from '../../../../components/Modal';
import TimeTracker from '../../../timer/components/TimeTracker';

const mapStateToProps = state => ({
  modalVisible: modalSelectors.rootSelector(state).visible,
});

const mapDispatchToProps = dispatch => ({
  loginActions: bindActionCreators(loginActionCreators, dispatch),
  modalActions: bindActionCreators(modalActionCreators, dispatch),
});

function HeaderMainApp({
  loginActions,
  modalActions,
  modalVisible,
}) {
  if (!isLoggedIn()) {
    return <div />;
  }

  const user = getCurrentUser();

  return (
    <div>
      <ul className="nav pull-right list-unstyled">
        <li className="hide-sm pull-left">
          <a
            className="link-block link-reset"
            href="#"
            onClick={(e) => {
              e.preventDefault();
              modalActions.show();
            }}
          >
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

      <Modal onClose={modalActions.hide} visible={modalVisible}>
        {modalVisible && (
          <TimeTracker onClickCancel={modalActions.hide} />
        )}
      </Modal>
    </div>
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
