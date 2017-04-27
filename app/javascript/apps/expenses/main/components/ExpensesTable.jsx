import { PropTypes } from 'prop-types';
import cx from 'classnames';
import React from 'react';

import { TABLE_HEADERS } from '../utils/constants';

import SimpleTable from '../../../../components/SimpleTable';

const renderTableRow = (object) => {
  return (
    <tr key={object.id}>
      <td>{`$${object.amount}`}</td>
      <td>{object.customer_id}</td>
      <td>{object.date}</td>
      <td>{object.description}</td>
      <td>{object.expenses_grouping_id}</td>
      <td>{object.id}</td>
      <td>{object.qb_account_id}</td>
      <td>{object.qb_class_id}</td>
      <td>{object.vendor_id}</td>
      <td>
        <a href="#">Edit</a>
      </td>
    </tr>
  );
};

export default function ExpensesTable({ expenses, loading }) {
  return (
    <div className={cx({ loading })}>
      <SimpleTable
        objects={expenses}
        renderTableRow={renderTableRow}
        tableHeaders={TABLE_HEADERS}
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
