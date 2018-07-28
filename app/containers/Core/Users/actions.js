/*
 *
 * Users actions
 *
 */

import {
  SAGA_GET_CARS_LIST,
} from './constants';

export function actGetCarsList(action) {
  return {
    type: SAGA_GET_CARS_LIST,
    data: action,
  };
}