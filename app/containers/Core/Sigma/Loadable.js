/**
 *
 * Asynchronously loads the component for Sigma
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
