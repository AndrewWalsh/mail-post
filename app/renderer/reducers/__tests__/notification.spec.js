import td from 'testdouble';
import { NOTIFICATION } from '../../types';

require('testdouble-jest')(td, jest);

describe('notification reducer', () => {
  const stubUuid = td.replace('uuid/v4');
  const uuidStubName = 'stub';
  td.when(stubUuid()).thenReturn(uuidStubName);
  const reducer = require('../notification');

  it('returns initial state', () => {
    const state = { message: '', id: uuidStubName };
    expect(reducer(undefined, {})).toEqual(state);
  });

  it('handles NOTIFICATION', () => {
    const state = { message: 'test' };
    const action = { type: NOTIFICATION, payload: 'new message' };
    const expected = {
      ...state,
      message: action.payload,
      id: uuidStubName,
    };
    expect(reducer(state, action)).toEqual(expected);
  });
});
