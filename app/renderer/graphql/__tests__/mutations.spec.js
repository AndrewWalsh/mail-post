import * as mutations from '../mutations';

describe('client mutations', () => {
  it('match snapshots', () => {
    Object.keys(mutations).forEach((key) => {
      expect(mutations[key]).toMatchSnapshot();
    });
  });
});

