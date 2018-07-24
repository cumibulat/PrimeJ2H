import { createSelector } from 'reselect';

/**
 * Direct selector to the latihanPage state domain
 */
const selectLatihanPageDomain = (state) => state.get('latihanPage');

/**
 * Other specific selectors
 */


/**
 * Default selector used by LatihanPage
 */

const makeSelectLatihanPage = () => createSelector(
  selectLatihanPageDomain,
  (substate) => substate.toJS()
);

const makeSelectCarsList = () => createSelector(
  selectLatihanPageDomain,
  (substate) => substate.get('carsListReducer')
);

export {
  selectLatihanPageDomain,
  makeSelectLatihanPage,
  makeSelectCarsList,
};
