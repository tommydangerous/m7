import { PropTypes } from 'prop-types';
import React from 'react';

const renderRows = (objects, renderTableRow) => {
  return objects.map((object) => renderTableRow(object));
};

const renderHeaders = (tableHeaders) => {
  return tableHeaders.map((header) => <th key={header}>{header}</th>);
};

export default function SimpleTable({ objects, renderTableRow, tableHeaders }) {
  return (
    <table className="table table-bordered table-striped">
      <thead>
        <tr>
          {renderHeaders(tableHeaders)}
        </tr>
      </thead>
      <tbody>
        {renderRows(objects, renderTableRow)}
      </tbody>
    </table>
  );
}

SimpleTable.propTypes = {
  objects: PropTypes.arrayOf(PropTypes.object),
  renderTableRow: PropTypes.func.isRequired,
  tableHeaders: PropTypes.arrayOf(PropTypes.string).isRequired,
};
