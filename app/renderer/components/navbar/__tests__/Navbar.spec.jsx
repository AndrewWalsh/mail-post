import React from 'react';
import MockRouter from 'react-mock-router';
import { mount } from 'enzyme';

import Navbar from '../Navbar';

describe('Navbar', () => {
  it('matches snapshot', async () => {
    const wrapper = mount(
      <MockRouter>
        <Navbar />
      </MockRouter>,
    );
    expect(wrapper).toMatchSnapshot();
  });
});
