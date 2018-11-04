import React from 'react';
import td from 'testdouble';
import { shallow } from 'enzyme';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import TableCell from '@material-ui/core/TableCell';
import Checkbox from '@material-ui/core/Checkbox';

import TableHeader from '../TableHeader';

require('testdouble-jest')(td, jest);

describe('TableHeader', () => {
  let props;
  let wrapper;

  beforeEach(() => {
    props = {
      numSelected: 0,
      onRequestSort: td.function(),
      onSelectAllClick: td.function(),
      order: 'desc',
      orderBy: 'id',
      rowCount: 0,
      columnData: [
        {
          id: 'name',
          numeric: false,
          disablePadding: true,
          label: 'Name',
        },
        {
          id: 'total_subscribers',
          numeric: true,
          disablePadding: false,
          label: 'Subscribers',
        },
        {
          id: 'createdAt',
          numeric: true,
          disablePadding: false,
          label: 'Created',
        },
      ],
    };
    wrapper = shallow(<TableHeader {...props} />);
  });

  it('matches snapshot', async () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('calls onRequestSort prop when TableSortLabel is clicked', async () => {
    const wrappers = wrapper.find(TableSortLabel);
    wrappers.every(node => node.simulate('click'));
    wrappers.every((node, i) => td.verify(props.onRequestSort(td.matchers.anything, i)));
  });

  it('checkbox is NOT indeterminate when numSelected is NOT > 0', async () => {
    expect(wrapper.find(Checkbox).prop('indeterminate')).toBe(false);
  });

  it('checkbox is NOT indeterminate when numSelected is > 0 AND numSelected > rowCount', async () => {
    const numSelected = 2;
    const rowCount = 1;
    wrapper = shallow(
      <TableHeader
        {...props}
        numSelected={numSelected}
        rowCount={rowCount}
      />,
    );
    expect(wrapper.find(Checkbox).prop('indeterminate')).toBe(false);
  });

  it('checkbox is indeterminate when numSelected is > 0 AND numSelected < rowCount', async () => {
    const numSelected = 1;
    const rowCount = 2;
    wrapper = shallow(
      <TableHeader
        {...props}
        numSelected={numSelected}
        rowCount={rowCount}
      />,
    );
    expect(wrapper.find(Checkbox).prop('indeterminate')).toBe(true);
  });

  it('sortDirection prop is "desc" when item is sorted', async () => {
    const orderBy = 'name';
    const label = 'Name';
    wrapper = shallow(
      <TableHeader
        {...props}
        orderBy={orderBy}
      />,
    );
    wrapper.find(TableCell).everyWhere((node) => {
      const sortDirection = node.prop('sortDirection');
      if (sortDirection !== undefined) {
        const text = node.find(TableSortLabel).children().text();
        if (text === label) {
          expect(node.prop('sortDirection')).toBe(sortDirection);
        } else {
          expect(node.prop('sortDirection')).toBe(false);
        }
      }
      return true;
    });
  });
});
