import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import cx from 'classnames';
import React from 'react';

import { TABLE_HEADERS } from '../utils/constants';

import * as customerActionCreators from '../../../../action_creators/customerActionCreators';
import * as expenseActionCreators from '../../../../action_creators/expenseActionCreators';
import * as vendorActionCreators from '../../../../action_creators/vendorActionCreators';

import * as customerSelectors from '../../../../selectors/customerSelectors';
import * as expenseSelectors from '../../../../selectors/expenseSelectors';
import * as vendorSelectors from '../../../../selectors/vendorSelectors';

import { OFFLINE_MODE } from '../../../../utils/constants';

import SimpleTable from '../../../../components/SimpleTable';

import ExpenseShape from '../../../../shapes/ExpenseShape';

const mapStateToProps = state => ({
  customersById: customerSelectors.rootSelector(state).customersById,
  errors: expenseSelectors.rootSelector(state).errors,
  loading: expenseSelectors.rootSelector(state).loading,
  expenses: expenseSelectors.sortedObjects(state),
  vendorsById: vendorSelectors.rootSelector(state).vendorsById,
});

const mapDispatchToProps = dispatch => ({
  customerActions: bindActionCreators(customerActionCreators, dispatch),
  expenseActions: bindActionCreators(expenseActionCreators, dispatch),
  vendorActions:bindActionCreators(vendorActionCreators, dispatch),
});

class ExpensesTable extends React.Component {
  componentDidMount() {
    const {
      customerActions,
      expenseActions,
      vendorActions,
    } = this.props;

    customerActions.index();
    vendorActions.index();

    if (!OFFLINE_MODE) {
      // TODO: can we render expenses from other vendors?
      expenseActions.index({
        // search_end_date: '2018-01-01',
        // search_start_date: '2016-01-01',
        expense_vendor_id: 'All',
      });
    }
  }

  render() {
    const {
      customersById,
      errors,
      expenseActions,
      expenses,
      loading,
      onEdit,
      vendorsById,
    } = this.props;

    const renderTableRow = obj => {
      const customerName = (customersById[obj.customer_id] || {}).name;
      const vendorName = (vendorsById[obj.vendor_id] || {}).name;

      return (
        <tr key={obj.id}>
          <td>{vendorName}</td>
          <td>{customerName}</td>
          <td>{`$${obj.amount}`}</td>
          <td>{obj.date}</td>
          <td>
            <a
              href="#"
              onClick={e => {
                e.preventDefault();
                expenseActions.selfSelected(obj);
                onEdit();
              }}
            >
              Edit
            </a>
            {" / "}
            <a
              href="#"
              onClick={e => {
                e.preventDefault();
                expenseActions.deleteObject(obj.id);
              }}
            >
              Delete
            </a>
          </td>
        </tr>
      );
    };

    return (
      <div>
        <h1 className="hide-sm">
          Expenses
        </h1>
        {errors.index && (
          <div className="background-red panel-body-small space-1 text-center text-contrast">
            {errors.index.message}
          </div>
        )}

        <div className={cx({ loading: loading.delete || loading.index })}>
          <SimpleTable
            objects={expenses}
            renderTableRow={renderTableRow}
            tableHeaders={TABLE_HEADERS}
          />
        </div>
      </div>
    );
  }
}

ExpensesTable.propTypes = {
  errors: PropTypes.shape({
    delete: PropTypes.object,
    index: PropTypes.object,
  }).isRequired,
  expenses: PropTypes.arrayOf(ExpenseShape),
  loading: PropTypes.shape({
    delete: PropTypes.bool,
    index: PropTypes.bool,
  }).isRequired,
  onEdit: PropTypes.func,
};

ExpensesTable.defaultProps = {
  expenses: [],
  onEdit() {},
};

export default connect(mapStateToProps, mapDispatchToProps)(ExpensesTable);
