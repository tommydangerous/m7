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
  errors: timesheetSelectors.rootSelector(state).errors,
  modalVisible: modalSelectors.rootSelector(state).visible,
});

const mapDispatchToProps = dispatch => ({
  modalActions: bindActionCreators(modalActionCreators, dispatch),
  timesheetActions: bindActionCreators(timesheetActionCreators, dispatch),
});

function TimesheetMainApp({
  errors,
  modalActions,
  modalVisible,
  timesheetActions,
}) {
  const closeModal = () => {
    timesheetActions.selfSelected(null);
    modalActions.hide();
  };

  return (
    <div className="page-container">
      <div className="row space-bottom-lg space-top-lg">
        <div className="col-sm-12">
          <a
            className="btn btn-primary pull-right"
            href="#"
            onClick={(e) => {
              e.preventDefault();
              modalActions.show();
            }}
          >
            Add time
          </a>
          <h1>
            Timesheets
          </h1>
          {errors.index && (
            <div className="background-red panel-body-small space-1 text-center text-contrast">
              {errors.index.message}
            </div>
          )}
          <TimesheetTable
            onEdit={() => modalActions.show()}
          />
        </div>
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

TimesheetMainApp.propTypes = {
  errors: PropTypes.object,
};

TimesheetMainApp.defaultProps = {
  errors: null,
};

export default connect(mapStateToProps, mapDispatchToProps)(TimesheetMainApp);
