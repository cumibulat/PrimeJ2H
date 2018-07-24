
import { fromJS } from 'immutable';
import latihanPageReducer from '../reducer';

describe('latihanPageReducer', () => {
  it('returns the initial state', () => {
    expect(latihanPageReducer(undefined, {})).toEqual(fromJS({}));
  });
});
