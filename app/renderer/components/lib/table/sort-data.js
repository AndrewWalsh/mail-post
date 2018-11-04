export default (data, order, orderBy, property = null) => {
  let newOrder = 'desc';

  if (orderBy === property && order === 'desc') {
    newOrder = 'asc';
  }

  const newData = newOrder === 'desc'
    ? data.sort((a, b) => (b[property] < a[property] ? -1 : 1))
    : data.sort((a, b) => (a[property] < b[property] ? -1 : 1));

  return { data: newData, order: newOrder };
};
