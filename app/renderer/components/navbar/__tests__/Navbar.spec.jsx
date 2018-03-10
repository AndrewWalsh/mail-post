import React from 'react';
import { shallow } from 'enzyme';

import Navbar from '../Navbar';

describe('Navbar', () => {
  it('renders elements', async () => {
    const wrapper = shallow(<Navbar />);
    expect(wrapper).toMatchSnapshot();
  });
});
