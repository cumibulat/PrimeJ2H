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

export const ForgotPasswordPage = Loadable({
  loader: () => import('./forgotPassword'),
  loading: () => null,
});

export const FreeTrialPage = Loadable({
  loader: () => import('./freeTrial'),
  loading: () => null,
});
