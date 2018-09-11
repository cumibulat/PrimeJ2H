/**
 *
 * Asynchronously loads the component for UserProfile
 *
 */

import Loadable from 'react-loadable';

export const UserProfilePage = Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
