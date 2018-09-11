/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';
import { Switch, Route } from 'react-router-dom';

// import 'primereact/resources/themes/start/theme.css';
import 'primereact/resources/themes/omega/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'fullcalendar/dist/fullcalendar.css';
import 'font-awesome/css/font-awesome.css';
import 'layout/layout.css';

import Sigma from 'containers/Core/Sigma/Loadable';
import HomePage from 'containers/HomePage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import { UserPage, EditUserPage } from 'containers/Core/Users/Loadable';
import { UserProfilePage } from 'containers/Core/UserProfile/Loadable';

import {
  LoginPage,
  ForgotPasswordPage,
  FreeTrialPage,
} from 'containers/Core/Login/Loadable';

import './App.css';

export default function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/Login" component={LoginPage} />
        <Route exact path="/ForgotPassword" component={ForgotPasswordPage} />
        <Route exact path="/Trial" component={FreeTrialPage} />
        <Sigma>
          <Route exact path="/Home" component={HomePage} />
          <Route exact path="/User" component={UserPage} />
          <Route exact path="/UserProfile" component={UserProfilePage} />
          <Route exact path="/EditUser" component={EditUserPage} />
        </Sigma>
        <Route component={NotFoundPage} />
      </Switch>
    </div>
  );
}
