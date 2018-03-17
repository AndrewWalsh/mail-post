import React from 'react';
import { shallow } from 'enzyme';

import Settings from '../Settings';

describe('Settings', () => {
  it('matches snapshot', async () => {
    const wrapper = shallow(<Settings />);
    expect(wrapper).toMatchSnapshot();
  });
});
