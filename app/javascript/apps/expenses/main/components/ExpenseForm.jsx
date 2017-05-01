import { PropTypes } from 'prop-types';
import React from 'react';

import SimpleForm from '../../../../components/SimpleForm';

import { CREATE_FORM_FIELDS } from '../utils/constants';

export default function ExpenseForm({
  error,
  loading,
  onClickCancel,
  onSubmitForm,
  vendors,
}) {
  const fields = { ...CREATE_FORM_FIELDS };
  fields.vendor_id.options = vendors.map(vendor => {
    return {
      text: vendor.name,
      value: vendor.id,
    };
  });

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
