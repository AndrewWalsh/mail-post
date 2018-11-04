import sort from '../sort-data';

describe('ListTableToolbar', () => {
  const mockData = [{ a: 1 }, { b: 2 }, { c: 3 }];
  const mockOrder = 'desc';
  const mockOrderBy = 'a';
  const mockProperty = 'a';

  it('when order param is "desc" and orderBy equals property, returns { order: "asc" }', () => {
    const { order } = sort(mockData, mockOrder, mockOrderBy, mockProperty);
    expect(order).toBe('asc');
  });

  it('when order param is "asc" and orderBy does NOT equal property, returns { order: "desc" }', () => {
    const { order } = sort(mockData, mockOrder, mockOrderBy, 'test');
    expect(order).toBe('desc');
  });

  it('when order param is "desc", data is orderer in descending order', () => {
    const { data } = sort(mockData, mockOrder, mockOrderBy, mockProperty);
    expect(data).toEqual(mockData.reverse());
  });

  it('when order param is "asc", data is orderer in ascending order', () => {
    const { data } = sort(mockData, 'asc', mockOrderBy, mockProperty);
    expect(data).toEqual(mockData);
  });
});
