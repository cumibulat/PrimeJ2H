/**
 *
 * Asynchronously loads the component for LatihanPage
 *
 */

import Loadable from 'react-loadable';
import React from 'react';
import LoadingIndicator from 'components/LoadingIndicator';

// export default Loadable({
//   loader: () => import('./index'),
//   loading: () => null,
// });

export const LatihanPage = Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
