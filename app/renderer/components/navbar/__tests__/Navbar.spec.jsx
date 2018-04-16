import React from 'react';
import { shallow } from 'enzyme';

import Navbar from '../Navbar';

describe('Navbar', () => {
  it('matches snapshot', async () => {
    const wrapper = shallow(<Navbar />);
    expect(wrapper).toMatchSnapshot();
  });
});
