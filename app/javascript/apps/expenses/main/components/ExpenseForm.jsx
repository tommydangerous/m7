import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import React from 'react';

import * as customerActionCreators from '../../../../action_creators/customerActionCreators';
import * as expensegroupingActionCreators
  from '../../../../action_creators/expensegroupingActionCreators';
import * as qbaccountActionCreators from '../../../../action_creators/qbaccountActionCreators';
import * as qbclassActionCreators from '../../../../action_creators/qbclassActionCreators';
import * as vendorActionCreators from '../../../../action_creators/vendorActionCreators';

import * as customerSelectors from '../../../../selectors/customerSelectors';
import * as expensegroupingSelectors from '../../../../selectors/expensegroupingSelectors';
import * as qbaccountSelectors from '../../../../selectors/qbaccountSelectors';
import * as qbclassSelectors from '../../../../selectors/qbclassSelectors';
import * as vendorSelectors from '../../../../selectors/vendorSelectors';

import SimpleForm from '../../../../components/SimpleForm';

import { CREATE_FORM_FIELDS } from '../utils/constants';

const selectOptions = array => {
  const arr = array.map(obj => {
    return {
      text: obj.name,
      value: obj.id,
    };
  });
  return [{
    disabled: true,
    text: '',
    value: '',
  }].concat(arr);
};

const mapStateToProps = state => ({
  customers: customerSelectors.sortedObjects(state),
  expensegroupings: expensegroupingSelectors.sortedObjects(state),
  qbaccounts: qbaccountSelectors.sortedObjects(state),
  qbclasses: qbclassSelectors.sortedObjects(state),
  vendors: vendorSelectors.sortedObjects(state),
});

const mapDispatchToProps = dispatch => ({
  customerActions: bindActionCreators(customerActionCreators, dispatch),
  expensegroupingActions: bindActionCreators(expensegroupingActionCreators, dispatch),
  qbaccountActions: bindActionCreators(qbaccountActionCreators, dispatch),
  qbclassActions: bindActionCreators(qbclassActionCreators, dispatch),
  vendorActions:bindActionCreators(vendorActionCreators, dispatch),
});

class ExpenseForm extends React.Component {
  componentDidMount() {
    this.props.customerActions.index();
    this.props.expensegroupingActions.index();
    this.props.qbaccountActions.index();
    this.props.qbclassActions.index();
    this.props.vendorActions.index();
  }

  render() {
    const {
      customers,
      error,
      expensegroupings,
      loading,
      onClickCancel,
      onSubmitForm,
      qbaccounts,
      qbclasses,
      vendors,
    } = this.props;

    const fields = { ...CREATE_FORM_FIELDS };
    fields.customer_id.options = selectOptions(customers);
    fields.vendor_id.options = selectOptions(vendors);

    if (Object.keys(expensegroupings).length === 0) {
      delete fields.expense_grouping_id;
    } else {
      fields.expense_grouping_id.options = selectOptions(expensegroupings);
    }

    if (Object.keys(qbaccounts).length === 0) {
      delete fields.qb_account_id;
    } else {
      fields.qb_account_id.options = selectOptions(qbaccounts);
    }

    if (Object.keys(qbclasses).length === 0) {
      delete fields.qb_class_id;
    } else {
      fields.qb_class_id.options = selectOptions(qbclasses);
    }

    return (
      <SimpleForm
        error={error}
        header="Add a new expense"
        fields={fields}
        loading={loading}
        onClickCancel={onClickCancel}
        onSubmitForm={onSubmitForm}
      />
    );
  }
}

ExpenseForm.propTypes = {
  customers: PropTypes.arrayOf(PropTypes.object),
  expensegroupings: PropTypes.arrayOf(PropTypes.object),
  qbaccounts: PropTypes.arrayOf(PropTypes.object),
  qbclasses: PropTypes.arrayOf(PropTypes.object),
  vendors: PropTypes.arrayOf(PropTypes.object),
};

ExpenseForm.defaultProps = {
  customers: [],
  expensegroupings: [],
  qbaccounts: [],
  qbclasses: [],
  vendors: [],
};

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseForm);
