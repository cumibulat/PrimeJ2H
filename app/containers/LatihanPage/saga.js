// import { take, call, put, select } from 'redux-saga/effects';
import { call, put, takeLatest } from 'redux-saga/effects';

import {
  getCarsSmall,
  getCarsMedium,
  getCarsLarge,
  CarService,
} from 'containers/data/CarService';

import {
  SAGA_GET_CARS_LIST,
  REDUCER_GET_CARS_LIST,
} from './constants';

export function* sagaGetCarsList(action) {
  const cs = new CarService();
  // const cars = [];


  // cs.getCarsSmall().then((data) => {
  //   console.log('isi apa ? ', data);
  // });


  const cars = yield call(getCarsLarge, action);

  // console.log('check dl :: ', cars);
  yield put({
    type: REDUCER_GET_CARS_LIST,
    payload: cars,
  });
}

// Individual exports for testing
export default function* defaultSaga() {
  // See example in containers/HomePage/saga.js
  yield takeLatest(SAGA_GET_CARS_LIST, sagaGetCarsList);
}
