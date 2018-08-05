/**
 *
 * Asynchronously loads the component for Users
 *
 */

import Loadable from 'react-loadable';

export const UserPage = Loadable({
  loader: () => import('./index'),
  loading: () => null,
});

export const EditUserPage = Loadable({
  loader: () => import('./editUser'),
  loading: () => null,
});