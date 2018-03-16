import React from 'react';
import { shallow } from 'enzyme';

import NewList from '../NewList';

describe('NewList', () => {
  it('renders elements', async () => {
    const wrapper = shallow(<NewList />);
    expect(wrapper).toMatchSnapshot();
  });
});
