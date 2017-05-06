import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import cx from 'classnames';
import moment from 'moment';
import React from 'react';

import { TABLE_HEADERS } from '../utils/constants';

import * as customerActionCreators from '../../../../action_creators/customerActionCreators';
import * as expenseActionCreators from '../../../../action_creators/expenseActionCreators';
import * as qbaccountActionCreators from '../../../../action_creators/qbaccountActionCreators';
import * as vendorActionCreators from '../../../../action_creators/vendorActionCreators';

import * as customerSelectors from '../../../../selectors/customerSelectors';
import * as expenseSelectors from '../../../../selectors/expenseSelectors';
import * as qbaccountSelectors from '../../../../selectors/qbaccountSelectors';
import * as vendorSelectors from '../../../../selectors/vendorSelectors';

import { OFFLINE_MODE } from '../../../../utils/constants';

import ExpenseShape from '../../../../shapes/ExpenseShape';

const mapStateToProps = state => ({
  customersById: customerSelectors.rootSelector(state).customersById,
  errors: expenseSelectors.rootSelector(state).errors,
  expenses: expenseSelectors.sortedObjects(state),
  loading: expenseSelectors.rootSelector(state).loading,
  qbaccountsById: qbaccountSelectors.rootSelector(state).qbaccountsById,
  vendorsById: vendorSelectors.rootSelector(state).vendorsById,
});

const mapDispatchToProps = dispatch => ({
  customerActions: bindActionCreators(customerActionCreators, dispatch),
  expenseActions: bindActionCreators(expenseActionCreators, dispatch),
  qbaccountActions: bindActionCreators(qbaccountActionCreators, dispatch),
  vendorActions:bindActionCreators(vendorActionCreators, dispatch),
});

class ExpensesTable extends React.Component {
  componentDidMount() {
    const {
      customerActions,
      expenseActions,
      qbaccountActions,
      vendorActions,
    } = this.props;

    customerActions.index();
    qbaccountActions.index();
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
      qbaccountsById,
      vendorsById,
    } = this.props;

    const renderRow = obj => {
      const accountName = (qbaccountsById[obj.qb_account_id] || {}).name;
      const vendorName = (vendorsById[obj.vendor_id] || {}).name;
      const customerName = (customersById[obj.customer_id] || {}).name;
      const date = moment(obj.date);
      const amount = `$${obj.amount % 1 === 0 ? Math.round(obj.amount) : obj.amount}`;

      return (
        <div className="row space-1" key={obj.id}>
          <div className="col-sm-12">
            <div
              className="panel panel-body link-hover"
              onClick={() => {
                onEdit();
                expenseActions.selfSelected(obj);
              }}
            >
              <div className="row">
                <div className="col-sm-8">
                  <b className="text-muted text-tiny text-uppercase">
                    {accountName}
                  </b>
                  <h5>
                    {vendorName}
                  </h5>
                </div>

                <div className="col-sm-4">
                  <div className="pull-right text-muted text-center">
                    <b className="text-tiny text-uppercase">
                      {date.format('MMM')}
                    </b>
                    <p>
                      {date.format('D')}
                    </p>
                  </div>
                </div>
              </div>


              <div className="row space-top-2">
                <div className="col-md-8 col-sm-12">
                  {obj.description && obj.description}
                  {!obj.description && (
                    <i className="text-muted">
                      No description
                    </i>
                  )}
                </div>
                <div className="col-md-4 col-sm-12 text-muted text-right-md text-tiny">
                  <div className="show-sm space-top-1" />
                  {amount}, {customerName}
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    };

    return (
      <div>
        <div className="clearfix">
          <h2 className="hide-sm">
            Expenses
          </h2>
          <h3 className="show-sm">
            Expenses
          </h3>
          {errors.index && (
            <div className="background-red panel-body-small space-1 text-center text-contrast">
              {errors.index.message}
            </div>
          )}
        </div>

        <div className={cx({ loading: loading.delete || loading.index })}>
          {expenses.map(obj => renderRow(obj))}
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
