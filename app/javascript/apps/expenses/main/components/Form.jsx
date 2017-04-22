import React from 'react';

// import SimpleForm from '../../../../components/SimpleForm';

const FIELDS = [
  {
    label: 'Name of pickup location',
    name: 'name',
    type: 'text',
  },
  {
    defaultValue: '',
    label: 'Client name',
    name: 'agent_client_id',
    options: [
      {
        text: 'blade',
        value: 1,
      },
      {
        text: 'gun',
        value: 2,
      },
    ],
    type: 'select',
  },
  {
    label: 'Approval required?',
    name: 'approval_required',
    type: 'checkbox',
  },
];

/*
  <SimpleForm
      header="Add a new expense"
      fields={FIELDS}
      onSubmitForm={() => console.log('hello')}
    />
*/

export default function Form({}) {
  return (
    <h1>Hello</h1>
  );
}
