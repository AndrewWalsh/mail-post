import React from 'react';
import td from 'testdouble';
import { shallow } from 'enzyme';
import TableRow from '@material-ui/core/TableRow';
import TablePagination from '@material-ui/core/TablePagination';

import Table from '../Table';
import TableToolbar from '../TableToolbar';

require('testdouble-jest')(td, jest);

describe('Table', () => {
  let props;
  let wrapper;

  beforeEach(() => {
    props = {
      data: [
        {
          id: '1',
          name: 'name',
          total_subscribers: '10',
          createdAt: '2015-03-25T12:00:00-06:30',
        },
        {
          id: '2',
          name: 'name',
          total_subscribers: '10',
          createdAt: '2015-03-25T12:00:00-06:30',
        },
      ],
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
      deleteItem: td.function(),
      title: 'Test Table',
    };
    wrapper = shallow(<Table {...props} />);
  });

  it('matches snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('when TableToolbar onClickDelete prop is called, calls prop deleteItem', () => {
    wrapper.find(TableToolbar).prop('onClickDelete')();
    td.verify(props.deleteItem(td.matchers.anything()));
  });

  it('when TableRow is selected, selected state contains item', () => {
    wrapper.find(TableRow).first().simulate('click');
    expect(wrapper.state('selected')).toEqual([props.data[0].id]);
  });

  it('when TableRow is unselected, selected state does not contain item', () => {
    wrapper.find(TableRow).first().simulate('click');
    wrapper.find(TableRow).first().simulate('click');
    expect(wrapper.state('selected')).toEqual([]);
  });

  it('when multiple TableRows are selected, selected state contains items', () => {
    wrapper.find(TableRow).forEach(n => n.simulate('click'));
    const ids = props.data.map(({ id }) => id);
    expect(wrapper.state('selected')).toEqual(ids);
  });

  it('when multiple TableRows are unselected, selected state does not contain items', () => {
    wrapper.find(TableRow).forEach(n => n.simulate('click'));
    wrapper.find(TableRow).forEach(n => n.simulate('click'));
    expect(wrapper.state('selected')).toEqual([]);
  });

  it('when TablePagination prop onChangePage is clicked, page state is updated', () => {
    wrapper.find(TablePagination).simulate('click');
    expect(wrapper.state('page')).toBe(0);
  });
});
