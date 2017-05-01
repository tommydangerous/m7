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
  errors: expenseSelectors.rootSelector(state).errors,
  modalVisible: modalSelectors.rootSelector(state).visible,
});

const mapDispatchToProps = dispatch => ({
  expenseActions: bindActionCreators(expenseActionCreators, dispatch),
  modalActions: bindActionCreators(modalActionCreators, dispatch),
});

class ExpensesMainApp extends React.Component {
  render() {
    const {
      errors,
      expenseActions,
      expenses,
      modalActions,
      modalVisible,
    } = this.props;

    const closeModal = () => {
      expenseActions.selfSelected(null);
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
              Add expense
            </a>
            <h1>
              Expenses
            </h1>
            {errors.index && (
              <div className="background-red panel-body-small space-1 text-center text-contrast">
                {errors.index.message}
              </div>
            )}
            <ExpensesTable
              onEdit={() => modalActions.show()}
            />
          </div>
        </div>

        <Modal onClose={closeModal} visible={modalVisible}>
          {modalVisible && (
            <ExpenseForm
              error={errors.create ? errors.create.message : null}
              onClickCancel={closeModal}
            />
          )}
        </Modal>
      </div>
    );
  }
}

ExpensesMainApp.propTypes = {
  error: PropTypes.object,
};

ExpensesMainApp.defaultProps = {
  error: null,
};

export default connect(mapStateToProps, mapDispatchToProps)(ExpensesMainApp);
