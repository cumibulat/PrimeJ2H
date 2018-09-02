import { fromJS } from 'immutable';
import sigmaReducer from '../reducer';

describe('sigmaReducer', () => {
  it('returns the initial state', () => {
    expect(sigmaReducer(undefined, {})).toEqual(fromJS({}));
  });
});
