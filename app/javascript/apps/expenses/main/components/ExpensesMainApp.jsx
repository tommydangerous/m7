import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import React from 'react';

import * as expenseActionCreators from '../../../../action_creators/expenseActionCreators';
import { rootSelector } from '../../../../selectors/expenseSelectors';

import ExpensesTable from './ExpensesTable';

const mapStateToProps = state => ({
  expenses: rootSelector(state).expenses,
  loading: rootSelector(state).loading,
});

const mapDispatchToProps = dispatch => ({
  expenseActions: bindActionCreators(expenseActionCreators, dispatch),
});

class ExpensesMainApp extends React.Component {
  componentDidMount() {
    const { expenseActions } = this.props;
    expenseActions.fetchExpenses({
      startDate: '2017-04-01',
      endDate: '2017-05-01',
    });
  }

  render() {
    const { expenses, loading } = this.props;

    return (
      <div className="page-container">
        <ExpensesTable expenses={expenses} loading={loading} />
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
