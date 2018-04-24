import { validateName } from '../new-list-helpers';

describe('new-list-helpers', () => {
  const lists = [
    {
      id: 1,
      name: 'hi',
    },
    {
      id: 2,
      name: 'ho',
    },
    {
      id: 1,
      name: 'hum',
    },
  ];

  describe('validateName', () => {
    it('returns undefined if no errors are found', () => {
      expect(validateName(lists, 'unique')).toBe(undefined);
    });

    it('returns error if a list contains a name that matches value', () => {
      expect(validateName(lists, 'hi')).toBe('A list with this name already exists');
    });
  });
});
