import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import React from 'react';

import * as customerActionCreators from '../../../../action_creators/customerActionCreators';
import * as expenseActionCreators from '../../../../action_creators/expenseActionCreators';
import * as expensegroupingActionCreators
  from '../../../../action_creators/expensegroupingActionCreators';
import * as qbaccountActionCreators from '../../../../action_creators/qbaccountActionCreators';
import * as qbclassActionCreators from '../../../../action_creators/qbclassActionCreators';
import * as vendorActionCreators from '../../../../action_creators/vendorActionCreators';

import * as customerSelectors from '../../../../selectors/customerSelectors';
import * as expenseSelectors from '../../../../selectors/expenseSelectors';
import * as expensegroupingSelectors from '../../../../selectors/expensegroupingSelectors';
import * as qbaccountSelectors from '../../../../selectors/qbaccountSelectors';
import * as qbclassSelectors from '../../../../selectors/qbclassSelectors';
import * as vendorSelectors from '../../../../selectors/vendorSelectors';

import SimpleForm from '../../../../components/SimpleForm';
import SimpleFormWithStore from '../../../../components/SimpleFormWithStore';

import { CREATE_FORM_FIELDS } from '../utils/constants';

const FormWithStore = SimpleFormWithStore({
  actionCreators: expenseActionCreators,
  selector: state => expenseSelectors.rootSelector(state).expense,
});

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
  errors: expenseSelectors.rootSelector(state).errors,
  expense: expenseSelectors.rootSelector(state).expense,
  expensegroupings: expensegroupingSelectors.sortedObjects(state),
  loading: expenseSelectors.rootSelector(state).loading,
  qbaccounts: qbaccountSelectors.sortedObjects(state),
  qbclasses: qbclassSelectors.sortedObjects(state),
  vendors: vendorSelectors.sortedObjects(state),
});

const mapDispatchToProps = dispatch => ({
  customerActions: bindActionCreators(customerActionCreators, dispatch),
  expenseActions: bindActionCreators(expenseActionCreators, dispatch),
  expensegroupingActions: bindActionCreators(expensegroupingActionCreators, dispatch),
  qbaccountActions: bindActionCreators(qbaccountActionCreators, dispatch),
  qbclassActions: bindActionCreators(qbclassActionCreators, dispatch),
  vendorActions:bindActionCreators(vendorActionCreators, dispatch),
});

class ExpenseForm extends React.Component {
  componentDidMount() {
    const {
      customers,
      expensegroupings,
      qbaccounts,
      qbclasses,
      vendors,
      customerActions,
      expensegroupingActions,
      qbaccountActions,
      qbclassActions,
      vendorActions,
    } = this.props;

    [
      [customers, customerActions],
      [expensegroupings, expensegroupingActions],
      [qbaccounts, qbaccountActions],
      [qbclasses, qbclassActions],
      [vendors, vendorActions],
    ].forEach(arr => {
      if (arr[0].length === 0) {
        arr[1].index();
      }
    });
  }

  render() {
    const {
      customers,
      errors,
      expense,
      expenseActions,
      expensegroupings,
      loading,
      onClickCancel,
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

    if (expense) {
      return (
        <FormWithStore
          error={errors.update ? errors.update.message : null}
          fields={fields}
          header="Edit expense"
          loading={loading.update}
          onClickCancel={onClickCancel}
          onSubmitForm={(payload) => {
            return expenseActions.update(expense.id, {
              'ExpenseEntry': {
                ...expense,
                ...payload,
              },
            }).then(response => {
                if (!errors.update) {
                  closeModal();
                }
              });
          }}
          submitFormButtonText="Update"
        />
      );
    }

    return (
      <SimpleForm
        error={errors.create ? errors.create.message : null}
        fields={fields}
        header="Add a new expense"
        loading={loading.create}
        onClickCancel={onClickCancel}
        onSubmitForm={(payload) => {
          return expenseActions.create({
            'ExpenseEntry': payload,
          }).then(response => {
              if (!errors.create) {
                onClickCancel();
              }
            });
        }}
      />
    );
  }
}

ExpenseForm.propTypes = {
  customers: PropTypes.arrayOf(PropTypes.object),
  expensegroupings: PropTypes.arrayOf(PropTypes.object),
  loading: PropTypes.shape({
    create: PropTypes.bool,
  }).isRequired,
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
