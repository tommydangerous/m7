import { PropTypes } from 'prop-types';
import React from 'react';

import SimpleTable from '../../../../components/SimpleTable';

const renderTableRow = (object) => {
  return (
    <tr key={object.employee.id}>
      <td>{object.employee.first_name}</td>
      <td>{object.employee.id}</td>
    </tr>
  );
};

export default function ExpensesTable({ expenses, loading }) {
  return (
    <div className={`${loading ? '' : 'loading'}`}>
      <SimpleTable
        objects={expenses}
        renderTableRow={renderTableRow}
        tableHeaders={['Name', 'ID']}
      />
    </div>
  );
}

ExpensesTable.propTypes = {
  loading: PropTypes.bool,
};

ExpensesTable.defaultProps = {
  loading: false,
};
