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
        <div className="row space-top-lg">
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
            <ExpensesTable expenses={expenses} loading={loading} />
          </div>
        </div>

        <Modal onClose={modalActions.hide} visible={modalVisible}>
          <SimpleForm
            header="Add a new expense"
            fields={CREATE_FORM_FIELDS}
            loading={loading}
            onClickCancel={modalActions.hide}
            onSubmitForm={(payload) => {
              console.log(payload);
              // return new Promise((resolve, reject) => {
              //   expenseActions.createExpense(payload).
              //     then(response => resolve(response), xhr => reject(xhr));
              // });
              return expenseActions.createExpense(payload);
            }}
          />
        </Modal>
      </div>
    );
  }
}

ExpensesMainApp.propTypes = {
  expensesById: PropTypes.object,
  loading: PropTypes.bool,
};

ExpensesMainApp.defaultProps = {
  expensesById: {},
  loading: false,
};

export default connect(mapStateToProps, mapDispatchToProps)(ExpensesMainApp);
