import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the sigma state domain
 */

const selectSigmaDomain = state => state.get('sigma', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by Sigma
 */

const makeSelectSigma = () =>
  createSelector(selectSigmaDomain, substate => substate.toJS());

export default makeSelectSigma;
export { selectSigmaDomain };
