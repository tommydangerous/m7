import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import { withRouter } from 'react-router-dom'
import cx from 'classnames';
import React from 'react';

import { durationToTime } from '../../../../utils/timeFunctions';

import { getCurrentUser, isLoggedIn } from '../../../../stores/appLocalStorage';

import * as headerActionCreators from '../../../../action_creators/headerActionCreators';
import * as loginActionCreators from '../../../../action_creators/loginActionCreators';
import * as modalActionCreators from '../../../../action_creators/modalActionCreators';
import * as timerActionCreators from '../../../../action_creators/timerActionCreators';
import * as timesheetActionCreators from '../../../../action_creators/timesheetActionCreators';

import * as headerSelectors from '../../../../selectors/headerSelectors';
import * as modalSelectors from '../../../../selectors/modalSelectors';
import * as timerSelectors from '../../../../selectors/timerSelectors';
import * as timesheetSelectors from '../../../../selectors/timesheetSelectors';

import Modal from '../../../../components/Modal';
import TimesheetForm from '../../../timesheets/main/components/TimesheetForm';
import TimeTracker from '../../../timer/components/TimeTracker';

const mapStateToProps = state => ({
  header: headerSelectors.rootSelector(state),
  successes: timesheetSelectors.rootSelector(state).successes,
  timer: timerSelectors.rootSelector(state),
  timesheets: timesheetSelectors.rootSelector(state),
});

const mapDispatchToProps = dispatch => ({
  headerActions: bindActionCreators(headerActionCreators, dispatch),
  loginActions: bindActionCreators(loginActionCreators, dispatch),
  timerActions: bindActionCreators(timerActionCreators, dispatch),
  timesheetActions: bindActionCreators(timesheetActionCreators, dispatch),
});

class HeaderMainApp extends React.Component {
  constructor(props) {
    super(props);

    this.closeModal = this.closeModal.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    const {
      successes: {
        create: c1,
        update: u1,
      },
    } = prevProps;
    const {
      successes: {
        create: c2,
        update: u2,
      },
    } = this.props;
    if (c2 > c1 || u2 > u1) {
      this.closeModal();
    }
  }

  closeModal() {
    const {
      timerActions,
      timesheetActions,
    } = this.props;
    timerActions.hideModal();
    timerActions.unsave();
    timesheetActions.selfSelected(null);
  }

  timesheetFormInitialState() {
    const {
      timer,
    } = this.props;
    const duration = Math.round(((timer.endTime - timer.startTime) / 10) / (60 * 60)) / 100
    const {
      endTime,
      startTime,
    } = durationToTime(duration)
    return {
      duration,
      end_time: endTime,
      start_time: startTime,
    };
  }

  render() {
    const {
      header,
      headerActions,
      history,
      loginActions,
      timer,
      timerActions,
      timesheetActions,
      timesheets,
    } = this.props;
    const {
      active,
      saved,
      visible,
    } = timer;
    const user = getCurrentUser();
    const dropdownItemClasses =
      'link-block link-media link-reset menu-item space-left-4 space-right-4';

    if (!isLoggedIn()) {
      return <div />;
    }

    return (
      <div className="header--primary">
        <header>
          <ul className="nav pull-right list-unstyled">
            <li className="pull-left">
              <a
                className="link-block link-reset"
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  headerActions.hide();
                  timerActions.showModal();
                }}
              >
                <i
                  className={cx('fa fa-clock-o', { 'color-green': !active, 'color-red': active })}
                  aria-hidden="true"
                />
              </a>
            </li>

            <li className="pull-left hide-sm">
              <a
                className="link-block link-reset"
                onClick={e => {
                  e.preventDefault();
                  headerActions.hide();
                  history.push('/timesheets');
                }}
              >
                Timesheets
              </a>
            </li>

            <li className="pull-left hide-sm">
              <a
                className="link-block link-reset"
                onClick={e => {
                  e.preventDefault();
                  headerActions.hide();
                  history.push('/expenses');
                }}
              >
                Expenses
              </a>
            </li>

            <li className="pull-left">
              <a
                className="link-block link-reset"
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  if (header.visible) {
                    headerActions.hide();
                  } else {
                    headerActions.show();
                  }
                }}
              >
                {user.first_name}
              </a>

              {header.visible && (
                <div className="header__dropdown-menu">
                  <ul className="list-unstyled">
                    <li className="show-sm">
                      <a
                        className={`border-bottom ${dropdownItemClasses}`}
                        onClick={e => {
                          e.preventDefault();
                          headerActions.hide();
                          history.push('/timesheets');
                        }}
                      >
                        Timesheets
                      </a>
                    </li>
                    <li className="show-sm">
                      <a
                        className={`border-bottom ${dropdownItemClasses}`}
                        onClick={e => {
                          e.preventDefault();
                          headerActions.hide();
                          history.push('/expenses');
                        }}
                      >
                        Expenses
                      </a>
                    </li>
                    <li>
                      <a
                        className={dropdownItemClasses}
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          headerActions.hide();
                          loginActions.logOut();
                          history.push('/login');
                        }}
                      >
                        Log Out
                      </a>
                    </li>
                  </ul>
                </div>
              )}
            </li>
          </ul>

          <Modal onClose={this.closeModal} visible={visible}>
            {visible && !saved && (
              <TimeTracker
                onClickCancel={this.closeModal}
              />
            )}

            {visible && saved && (
              <TimesheetForm
                initialState={this.timesheetFormInitialState()}
                onClickCancel={this.closeModal}
              />
            )}
          </Modal>
        </header>
      </div>
    );
  }
}

HeaderMainApp.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  loginActions: PropTypes.object,
  user: PropTypes.object,
};

HeaderMainApp.defaultProps = {
  loginActions: {},
  user: {},
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HeaderMainApp));
