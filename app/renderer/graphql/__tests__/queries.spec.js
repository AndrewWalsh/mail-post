import * as queries from '../queries';

describe('client queries', () => {
  it('match snapshots', () => {
    Object.keys(queries).forEach((key) => {
      expect(queries[key]).toMatchSnapshot();
    });
  });
});

