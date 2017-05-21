import { createBrowserHistory } from 'history';
import {
  Redirect,
  Route,
  Router,
} from 'react-router'
import React from 'react'

import { isLoggedIn } from '../stores/appLocalStorage';

import Expenses from '../apps/expenses/main/components/ExpensesMainApp';
import Header from '../apps/header/main/components/HeaderMainApp';
import Login from '../apps/sessions/login/components/LoginApp';
import Timesheets from '../apps/timesheets/main/components/TimesheetMainApp';

export default function MainRoutes() {
  return (
    <Router history={createBrowserHistory()}>
      <div>
        <Header />

        <Route path="/" render={() => <Redirect to="/login" />} />

        <Route
          path="/login"
          render={() => isLoggedIn() ? <Redirect to="/timesheets" /> : <Login />}
        />

        <Route
          path="/expenses"
          render={() => isLoggedIn() ? <Expenses /> : <Redirect to="/login" />}
        />
        <Route
          path="/timesheets"
          render={() => isLoggedIn() ? <Timesheets /> : <Redirect to="/login" />}
        />
      </div>
    </Router>
  );
}
