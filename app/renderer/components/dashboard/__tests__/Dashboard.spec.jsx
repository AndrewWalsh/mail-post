import React from 'react';
import { shallow } from 'enzyme';

import Dashboard from '../Dashboard';

describe('Dashboard', () => {
  it('matches snapshot', async () => {
    const wrapper = shallow(<Dashboard />);
    expect(wrapper).toMatchSnapshot();
  });
});
