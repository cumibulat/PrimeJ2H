/*
 *
 * Users reducer
 *
 */

import { fromJS } from 'immutable';
import {
  REDUCER_GET_CARS_LIST,
  REDUCER_CLEAR_CARS_LIST_STATUS,
} from './constants';

const initialState = fromJS({
  carsListReducer: [],
});

function usersReducer(state = initialState, action) {
  switch (action.type) {
    case REDUCER_GET_CARS_LIST:
      return state.set('carsListReducer', action.payload);
    case REDUCER_CLEAR_CARS_LIST_STATUS: {
      const newData = state.get('carsListReducer');
      newData.status = null;
      return state.set('carsListReducer', newData);
    }

    default:
      return state;
  }
}

export default usersReducer;
