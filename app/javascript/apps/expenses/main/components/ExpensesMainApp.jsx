import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import React from 'react';

import * as expenseActionCreators from '../../../../action_creators/expenseActionCreators';
import * as modalActionCreators from '../../../../action_creators/modalActionCreators';

import * as expenseSelectors from '../../../../selectors/expenseSelectors';
import * as modalSelectors from '../../../../selectors/modalSelectors';

import ExpenseForm from './ExpenseForm';
import ExpensesTable from './ExpensesTable';
import Modal from '../../../../components/Modal';

const mapStateToProps = state => ({
  modalVisible: modalSelectors.rootSelector(state).visible,
});

const mapDispatchToProps = dispatch => ({
  expenseActions: bindActionCreators(expenseActionCreators, dispatch),
  modalActions: bindActionCreators(modalActionCreators, dispatch),
});

function ExpensesMainApp({
  expenseActions,
  modalActions,
  modalVisible,
}) {
  const closeModal = () => {
    expenseActions.selfSelected(null);
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
          Add expense
        </a>

        <ExpensesTable
          onEdit={() => modalActions.show()}
        />
      </div>

      <Modal onClose={closeModal} visible={modalVisible}>
        {modalVisible && (
          <ExpenseForm
            onClickCancel={closeModal}
          />
        )}
      </Modal>
    </div>
  );
}

ExpensesMainApp.propTypes = {};

ExpensesMainApp.defaultProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ExpensesMainApp);
