import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import React from 'react';

import * as expenseActionCreators from '../../../../action_creators/expenseActionCreators';
import * as modalActionCreators from '../../../../action_creators/modalActionCreators';
import * as expenseRootSelector from '../../../../selectors/expenseSelectors';
import * as modalRootSelector from '../../../../selectors/modalSelectors';

import { CREATE_FORM_FIELDS } from '../utils/constants';

import ExpensesTable from './ExpensesTable';
import Modal from '../../../../components/Modal';
import SimpleForm from '../../../../components/SimpleForm';

const mapStateToProps = state => ({
  errors: expenseRootSelector.rootSelector(state).errors,
  expensesById: expenseRootSelector.rootSelector(state).expensesById,
  loading: expenseRootSelector.rootSelector(state).loading,
  modalVisible: modalRootSelector.rootSelector(state).visible,
});

const mapDispatchToProps = dispatch => ({
  expenseActions: bindActionCreators(expenseActionCreators, dispatch),
  modalActions: bindActionCreators(modalActionCreators, dispatch),
});

class ExpensesMainApp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      show: false,
    };
  }
  componentDidMount() {
    const { expenseActions } = this.props;
    expenseActions.fetchExpenses({
      startDate: '2017-04-01',
      endDate: '2017-05-01',
    });
  }

  render() {
    const {
      errors,
      expenseActions,
      expensesById,
      loading,
      modalActions,
      modalVisible,
    } = this.props;

    // TODO: sort by created_at
    const expenses = Object.keys(expensesById).map(key => expensesById[key]);

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
            <ExpensesTable expenses={expenses} loading={loading.index} />
          </div>
        </div>

        <Modal onClose={modalActions.hide} visible={modalVisible}>
          <SimpleForm
            error={errors.create ? errors.create.message : null}
            header="Add a new expense"
            fields={CREATE_FORM_FIELDS}
            loading={loading.create}
            onClickCancel={modalActions.hide}
            onSubmitForm={(payload) => {
              // return new Promise((resolve, reject) => {
              //   expenseActions.createExpense(payload).
              //     then(response => resolve(response), xhr => reject(xhr));
              // });
              return expenseActions.createExpense({ 'TimeEntry': payload })
                .then(response => {
                  if (!error) {
                    modalActions.hide();
                  }
                });
            }}
          />
        </Modal>
      </div>
    );
  }
}

ExpensesMainApp.propTypes = {
  error: PropTypes.object,
  expensesById: PropTypes.object,
  loading: PropTypes.object,
};

ExpensesMainApp.defaultProps = {
  error: null,
  expensesById: {},
  loading: false,
};

export default connect(mapStateToProps, mapDispatchToProps)(ExpensesMainApp);
