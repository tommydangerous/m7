import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import React from 'react';

import * as expenseActionCreators from '../../../../action_creators/expenseActionCreators';
import * as modalActionCreators from '../../../../action_creators/modalActionCreators';
import * as expenseRootSelector from '../../../../selectors/expenseSelectors';
import * as modalRootSelector from '../../../../selectors/modalSelectors';

import ExpensesTable from './ExpensesTable';
import ExpenseForm from './ExpenseForm';
import Modal from '../../../../components/Modal';

const mapStateToProps = state => ({
  expenses: expenseRootSelector.rootSelector(state).expenses,
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
      expenses,
      loading,
      modalActions,
      modalVisible,
    } = this.props;

    return (
      <div className="page-container">
        <a
          className="btn btn-primary"
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

        <Modal onClose={modalActions.hide} visible={modalVisible}>
          <ExpenseForm />
        </Modal>
      </div>
    );
  }
}

ExpensesMainApp.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.object),
  loading: PropTypes.bool,
};

ExpensesMainApp.defaultProps = {
  expenses: PropTypes.arrayOf(PropTypes.object),
  loading: false,
};

export default connect(mapStateToProps, mapDispatchToProps)(ExpensesMainApp);
