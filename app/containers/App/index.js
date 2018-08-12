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

import 'primereact/resources/themes/start/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

import HomePage from 'containers/HomePage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import { UserPage, EditUserPage }  from 'containers/Core/Users/Loadable';

export default function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/User" component={UserPage} />
        <Route exact path="/EditUser" component={EditUserPage} />
        <Route component={NotFoundPage} />
      </Switch>
    </div>
  );
}
