import React from 'react';

import { isLoggedIn } from '../../../../stores/appLocalStorage';

export default function HeaderMainApp() {
  if (!isLoggedIn()) {
    return <div />;
  }

  return (
    <ul className="nav pull-right list-unstyled">
      <li className="pull-left" id="app-header">
        <a className="link-block link-reset"href="/timesheets">
          Timesheets
        </a>
      </li>

      <li className="pull-left" id="app-header">
        <a className="link-block link-reset"href="/expenses">
          Expenses
        </a>
      </li>

      <li className="pull-left" id="app-header">
        <a className="link-block link-reset"href="/login">
          Log Out
        </a>
      </li>
    </ul>
  );
}
