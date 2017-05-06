import { PropTypes } from 'prop-types';
import React from 'react';

const GRID_COLUMNS = 12;

const columnClasses = (idx, widths) => {
  const classes = [];
  Object.keys(widths).forEach(size => {
    const i = widths[size][idx];
    if (i === 0) {
      classes.push(`hide-${size}`);
    } else {
      classes.push(`col-${size}-${i}`);
    }
  });
  return classes.join(' ');
};

const renderHeaders = (headers, widths) => {
  return headers.map((text, idx) => {
    return (
      <div
        className={`${columnClasses(idx, widths)} col-th`}
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
      <div className="row space-1" key={`row-${idx1}`}>
        <div className="border-top col-sm-12" />

        {renderColumnsForRow(obj).map((el, idx2) => {
          return (
            <div
              className={`${columnClasses(idx2, widths)} col-td`}
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
      <div className="row hide-sm space-bottom-sm">
        {renderHeaders(headers, widths)}
      </div>
      {renderRows({ objects, renderColumnsForRow, widths })}
    </div>
  );
}
