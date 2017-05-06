import { createBrowserHistory } from 'history';
import {
  Redirect,
  Route,
  Router,
} from 'react-router'
import React from 'react'

import { renderAppInContainer } from '../../../utils/rendering';

import { isLoggedIn } from '../../../stores/appLocalStorage';

import Expenses from '../../expenses/main/components/ExpensesMainApp';
import Header from '../../header/main/components/HeaderMainApp';
import Login from '../../sessions/login/components/LoginApp';
import Timesheets from '../../timesheets/main/components/TimesheetMainApp';

renderAppInContainer(
  <Router history={createBrowserHistory()}>
    <Route path="/">
      <div>
        <Header />

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
    </Route>
  </Router>
);
