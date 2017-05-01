import { PropTypes } from 'prop-types';
import React from 'react';

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

export default function ExpenseForm({
  customers,
  error,
  loading,
  onClickCancel,
  onSubmitForm,
  qbaccounts,
  vendors,
}) {
  const fields = { ...CREATE_FORM_FIELDS };
  fields.customer_id.options = selectOptions(customers);
  fields.vendor_id.options = selectOptions(vendors);

  if (Object.keys(qbaccounts).length === 0) {
    delete fields.qb_account_id;
  } else {
    fields.qb_account_id = selectOptions(qbaccounts);
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
