import { PropTypes } from 'prop-types';
import React from 'react';

const GRID_COLUMNS = 12;

const renderHeaders = (headers, widths) => {
  return headers.map((text, idx) => {
    return (
      <div
        className={`col-sm-${widths[idx]} col-th`}
        key={text}
      >
        <b>
          {text}
        </b>
      </div>
    );
  });
};

const renderRows = (opts = {}) => {
  const {
    objects,
    renderColumnsForRow,
    widths,
  } = opts;

  return objects.map((obj, idx1) => {
    return (
      <div className="row" key={`row-${idx1}`}>
        {renderColumnsForRow(obj).map((el, idx2) => {
          return (
            <div
              className={`col-sm-${widths[idx2]} col-td`}
              key={`col-${idx2}`}
            >
              {el}
            </div>
          );
        })}
      </div>
    );
  });
};

export default function SimpleResponsiveTable({
  headers,
  objects,
  renderColumnsForRow,
  widths,
}) {
  return (
    <div>
      <div className="row">
        {renderHeaders(headers, widths)}
      </div>
      {renderRows({ objects, renderColumnsForRow, widths })}
    </div>
  );
}
