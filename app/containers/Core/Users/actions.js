/*
 *
 * Users actions
 *
 */

import {
  SAGA_GET_CARS_LIST,
  REDUCER_CLEAR_CARS_LIST_STATUS,
} from './constants';

export function actGetCarsList(action) {
  return {
    type: SAGA_GET_CARS_LIST,
    data: action,
  };
}

export function actClearCarsListStatus(action) {
  return {
    type: REDUCER_CLEAR_CARS_LIST_STATUS,
    data: action,
  };
}
