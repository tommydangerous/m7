import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import cx from 'classnames';
import React from 'react';

import { TABLE_HEADERS } from '../utils/constants';

import * as expenseActionCreators from '../../../../action_creators/expenseActionCreators';

import * as expenseSelectors from '../../../../selectors/expenseSelectors';

import { OFFLINE_MODE } from '../../../../utils/constants';

import SimpleTable from '../../../../components/SimpleTable';

import ExpenseShape from '../../../../shapes/ExpenseShape';

const mapStateToProps = state => ({
  loading: expenseSelectors.rootSelector(state).loading,
  expense: expenseSelectors.rootSelector(state).expense,
  expenses: expenseSelectors.sortedObjects(state),
});

const mapDispatchToProps = dispatch => ({
  expenseActions: bindActionCreators(expenseActionCreators, dispatch),
});

class ExpensesTable extends React.Component {
  componentDidMount() {
    if (!OFFLINE_MODE) {
      const { expenseActions } = this.props;
      expenseActions.index({
        search_start_date: '2017-04-01',
        search_end_date: '2017-05-01',
      });
    }
  }

  render() {
    const {
      expenseActions,
      expenses,
      loading,
      onEdit,
    } = this.props;

    const renderTableRow = expense => {
      return (
        <tr key={expense.id}>
          <td>{expense.vendor_id}</td>
          <td>{expense.customer_id}</td>
          <td>{`$${expense.amount}`}</td>
          <td>{expense.date}</td>
          <td>
            <a
              href="#"
              onClick={e => {
                e.preventDefault();
                expenseActions.selfSelected(expense);
                onEdit();
              }}
            >
              Edit
            </a>
          </td>
          <td>
            <a
              href="#"
              onClick={e => {
                e.preventDefault();
                expenseActions.deleteObject(expense.id);
              }}
            >
              Delete
            </a>
          </td>
        </tr>
      );
    };

    return (
      <div className={cx({ loading: loading.index })}>
        <SimpleTable
          objects={expenses}
          renderTableRow={renderTableRow}
          tableHeaders={TABLE_HEADERS}
        />
      </div>
    );
  }
}

ExpensesTable.propTypes = {
  onEdit: PropTypes.func,
  expenses: PropTypes.arrayOf(ExpenseShape),
  loading: PropTypes.shape({
    index: PropTypes.bool,
  }).isRequired,
};

ExpensesTable.defaultProps = {
  onEdit() {},
  expenses: [],
};

export default connect(mapStateToProps, mapDispatchToProps)(ExpensesTable);
