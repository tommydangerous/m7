import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import cx from 'classnames';
import React from 'react';

import { getCurrentUser, isLoggedIn } from '../../../../stores/appLocalStorage';

import * as loginActionCreators from '../../../../action_creators/loginActionCreators';
import * as modalActionCreators from '../../../../action_creators/modalActionCreators';
import * as timerActionCreators from '../../../../action_creators/timerActionCreators';
import * as timesheetActionCreators from '../../../../action_creators/timesheetActionCreators';

import * as modalSelectors from '../../../../selectors/modalSelectors';
import * as timerSelectors from '../../../../selectors/timerSelectors';

import Modal from '../../../../components/Modal';
import TimesheetForm from '../../../timesheets/main/components/TimesheetForm';
import TimeTracker from '../../../timer/components/TimeTracker';

const mapStateToProps = state => ({
  modalVisible: modalSelectors.rootSelector(state).visible,
  timer: timerSelectors.rootSelector(state),
});

const mapDispatchToProps = dispatch => ({
  loginActions: bindActionCreators(loginActionCreators, dispatch),
  modalActions: bindActionCreators(modalActionCreators, dispatch),
  timerActions: bindActionCreators(timerActionCreators, dispatch),
  timesheetActions: bindActionCreators(timesheetActionCreators, dispatch),
});

function HeaderMainApp({
  loginActions,
  modalActions,
  modalVisible,
  timer,
  timerActions,
  timesheetActions,
}) {
  if (!isLoggedIn()) {
    return <div />;
  }

  const user = getCurrentUser();

  const closeModal = () => {
    timerActions.unsave();
    timesheetActions.selfSelected(null);
    modalActions.hide();
  };

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
            <i
              className={cx('fa fa-clock-o', { 'color-green': timer.active })}
              aria-hidden="true"
            />
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

      <Modal onClose={closeModal} visible={modalVisible}>
        {modalVisible && !timer.saved && (
          <TimeTracker
            onClickCancel={closeModal}
          />
        )}

        {modalVisible && timer.saved && (
          <TimesheetForm
            duration={
              Math.round(((timer.endTime - timer.startTime) / 10) / (60 * 60)) / 100
            }
            onClickCancel={closeModal}
          />
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
