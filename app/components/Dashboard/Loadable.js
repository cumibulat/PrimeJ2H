/**
 *
 * Asynchronously loads the component for Dashboard
 *
 */

import Loadable from 'react-loadable';

export const Dashboard = Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
