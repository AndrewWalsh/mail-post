import React from 'react';
import td from 'testdouble';
import { mount } from 'enzyme';
import IconButton from 'material-ui/IconButton';

import ListTableToolbar from '../ListTableToolbar';

require('testdouble-jest')(td, jest);

describe('ListTableToolbar', () => {
  let props;
  let wrapper;

  beforeEach(() => {
    props = {
      classes: {},
      numSelected: 0,
      onClickDelete: td.function(),
    };
    wrapper = mount(<ListTableToolbar {...props} />);
  });

  it('matches snapshot', async () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('when numSelected is NOT > 0, renders "Lists" heading', async () => {
    expect(wrapper.text().includes('Lists')).toBe(true);
  });

  it('when numSelected > 0, renders "{n} selected" heading', async () => {
    const numSelected = 8;
    wrapper = mount(<ListTableToolbar {...props} numSelected={numSelected} />);
    expect(wrapper.text().includes(`${numSelected} selected`)).toBe(true);
  });

  it('when numSelected > 0 AND IconButton is clicked, calls prop onClickDelete', async () => {
    const numSelected = 8;
    wrapper = mount(<ListTableToolbar {...props} numSelected={numSelected} />);
    wrapper.find(IconButton).simulate('click');
    td.verify(props.onClickDelete(td.matchers.anything()));
  });
});
