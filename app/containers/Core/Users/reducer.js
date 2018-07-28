/*
 *
 * Users reducer
 *
 */

import { fromJS } from 'immutable';
import {
  REDUCER_GET_CARS_LIST,
} from './constants';

const initialState = fromJS({
  carsListReducer: [],
});

function usersReducer(state = initialState, action) {
  switch (action.type) {
    case REDUCER_GET_CARS_LIST:
      return state.set('carsListReducer', action.payload);
    default:
      return state;
  }
}

export default usersReducer;
