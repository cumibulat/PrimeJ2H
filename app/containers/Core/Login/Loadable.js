/**
 *
 * Asynchronously loads the component for Login
 *
 */

import Loadable from 'react-loadable';

export const LoginPage = Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
