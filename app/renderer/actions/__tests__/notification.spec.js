import notification from '../notification';
import { NOTIFICATION } from '../../types';

describe('notification action', () => {
  it('returns notifcation action', async () => {
    const payload = 'A notification';
    const test = notification(payload);
    const expected = {
      type: NOTIFICATION,
      payload,
    };
    expect(test).toEqual(expected);
  });
});
