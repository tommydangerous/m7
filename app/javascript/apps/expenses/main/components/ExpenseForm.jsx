import { PropTypes } from 'prop-types';
import React from 'react';

import SimpleForm from '../../../../components/SimpleForm';

import { CREATE_FORM_FIELDS } from '../utils/constants';

const selectOptions = array => {
  return array.map(obj => {
    return {
      text: obj.name,
      value: obj.id,
    };
  });
};

export default function ExpenseForm({
  customers,
  error,
  loading,
  onClickCancel,
  onSubmitForm,
  vendors,
}) {
  const fields = { ...CREATE_FORM_FIELDS };
  fields.customer_id.options = selectOptions(customers);
  fields.vendor_id.options = selectOptions(vendors);

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
