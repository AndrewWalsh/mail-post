import React from 'react';
import { shallow } from 'enzyme';

import NavbarLink from '../NavbarLink';

describe('NavbarLink', () => {
  it('matches snapshot', async () => {
    const wrapper = shallow(
      <NavbarLink
        to="a route"
        text="name"
        renderIcon={() => {}}
      />,
    );
    expect(wrapper).toMatchSnapshot();
  });
});
