import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import React from 'react';

import * as timesheetActionCreators from '../../../../action_creators/timesheetActionCreators';
import * as modalActionCreators from '../../../../action_creators/modalActionCreators';

import * as timesheetSelectors from '../../../../selectors/timesheetSelectors';
import * as modalSelectors from '../../../../selectors/modalSelectors';

import TimesheetForm from './TimesheetForm';
import TimesheetTable from './TimesheetTable';
import Modal from '../../../../components/Modal';

const mapStateToProps = state => ({
  modalVisible: modalSelectors.rootSelector(state).visible,
  successes: timesheetSelectors.rootSelector(state).successes,
});

const mapDispatchToProps = dispatch => ({
  modalActions: bindActionCreators(modalActionCreators, dispatch),
  timesheetActions: bindActionCreators(timesheetActionCreators, dispatch),
});

class TimesheetMainApp extends React.Component {
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
      this.props.modalActions.hide();
    }
  }

  render() {
    const {
      modalActions,
      modalVisible,
      timesheetActions,
    } = this.props;

    const closeModal = () => {
      timesheetActions.selfSelected(null);
      modalActions.hide();
    };

    return (
      <div className="page-container">
        <div className="space-bottom-lg space-top-lg">
          <a
            className="btn btn-primary pull-right space-bottom-sm"
            href="#"
            onClick={(e) => {
              e.preventDefault();
              modalActions.show();
            }}
          >
            Add time
          </a>

          <TimesheetTable
            onEdit={() => modalActions.show()}
          />
        </div>

        <Modal onClose={closeModal} visible={modalVisible}>
          {modalVisible && (
            <TimesheetForm
              onClickCancel={closeModal}
            />
          )}
        </Modal>
      </div>
    );
  }
}

TimesheetMainApp.propTypes = {};

TimesheetMainApp.defaultProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(TimesheetMainApp);
