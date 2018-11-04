import uuidV4 from 'uuid/v4';
import notification from '../notification';
import { NOTIFICATION } from '../../types';

jest.mock('uuid/v4');
uuidV4.mockImplementation(() => 'uuid');

describe('notification reducer', () => {
  it('returns initial state', () => {
    const state = { message: '', id: 'uuid' };
    expect(notification(undefined, {})).toEqual(state);
  });

  it('handles NOTIFICATION', () => {
    const state = { message: 'test' };
    const action = { type: NOTIFICATION, payload: 'new message' };
    const expected = {
      ...state,
      message: action.payload,
      id: 'uuid',
    };
    expect(notification(state, action)).toEqual(expected);
  });
});
