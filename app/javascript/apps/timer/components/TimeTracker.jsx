import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import cx from 'classnames';
import moment from 'moment';
import React from 'react';

import { rootSelector } from '../../../selectors/timerSelectors';

import * as timerActionCreators from '../../../action_creators/timerActionCreators';

const MILLISECONDS = 1000;

const mapStateToProps = state => ({
  ...rootSelector(state),
});

const mapDispatchToProps = dispatch => ({
  timerActions: bindActionCreators(timerActionCreators, dispatch),
});

const renderSeconds = (time, now) => {
  return Math.round((now - time) / MILLISECONDS);
};

class TimeTracker extends React.Component {
  constructor(props) {
    super(props);

    this.mounted = false;
    this.state = {
      seconds: null,
    };
    this.timerInterval = null;
  }

  componentWillMount() {
    const {
      active,
      endTime,
      startTime,
    } = this.props;
    const now = moment().valueOf();

    if (startTime) {
      if (!active && endTime) {
        this.setState({ seconds: (endTime - startTime) / MILLISECONDS });
      } else {
        this.setState({ seconds: renderSeconds(startTime, now) });
      }
    }
  }

  componentDidMount() {
    const {
      active,
    } = this.props;

    this.mounted = true;

    if (active) {
      this.startTimer();
    }
  }

  componentWillUnmount() {
    this.mounted = false;
    this.stopTimer();
  }

  startTimer() {
    if (!this.timerInterval) {
      this.timerInterval = setInterval(() => {
        if (this.mounted) {
          const {
            startTime,
          } = this.props;
          const now = moment().valueOf();
          this.setState({ seconds: renderSeconds(startTime, now) });
        }
      }, MILLISECONDS);
    }
  }

  stopTimer() {
    clearInterval(this.timerInterval);
    this.timerInterval = null;
  }

  renderHours() {
    const { seconds } = this.state;
    if (seconds) {
      return Math.floor(seconds / (60 * 60));
    }
  }

  renderMinutes() {
    const { seconds } = this.state;
    if (seconds) {
      const r = seconds - (this.renderHours() * 60 * 60);
      return Math.floor(r / 60);
    }
  }

  renderSeconds() {
    const { seconds } = this.state;
    if (seconds) {
      const r = seconds - ((this.renderHours() * 60 * 60) + (this.renderMinutes() * 60));
      return Math.floor(r);
    }
  }

  render() {
    const {
      active,
      endTime,
      startTime,
      onClickCancel,
      timerActions,
      timesheetActions,
    } = this.props;
    const {
      seconds,
    } = this.state;

    return (
      <div className="panel">
        <div className="panel-header">
          Time Tracker
        </div>

        <div className="panel-body">
          <div className="row">
            <div className="col-sm-4 text-center">
              <p className="text-muted">
                HOURS
              </p>
              <h2>
                {startTime ? this.renderHours() : '00'}
              </h2>
            </div>

            <div className="col-sm-4 text-center">
              <p className="text-muted">
                MINUTES
              </p>
              <h2>
                {startTime ? this.renderMinutes() : '00'}
              </h2>
            </div>

            <div className="col-sm-4 text-center">
              <p className="text-muted">
                SECONDS
              </p>
              <h2>
                {startTime ? this.renderSeconds() : '00'}
              </h2>
            </div>
          </div>
        </div>

        <div className="panel-footer">
          <div className="pull-left">
            <a
              className="btn"
              href="#"
              onClick={e => {
                e.preventDefault();
                onClickCancel();
              }}
            >
              Close
            </a>
          </div>

          <div>
            {startTime && (
              <button
                className={cx('btn', { 'link-disabled': active })}
                disabled={active}
                onClick={e => {
                  e.preventDefault();
                  timerActions.save();
                }}
              >
                Save
              </button>
            )}

            <button
              className={cx('btn', { 'btn-primary': !active })}
              onClick={e => {
                e.preventDefault();
                if (active) {
                  this.stopTimer();
                  timerActions.pause();
                } else {
                  this.startTimer();
                  timerActions.start();
                }
              }}
            >
              {active ? 'Pause' : 'Start'}
            </button>
          </div>
        </div>
      </div>
    );
  }
}

TimeTracker.propTypes = {
};

TimeTracker.defaultProps = {
};

export default connect(mapStateToProps, mapDispatchToProps)(TimeTracker);
