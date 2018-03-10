import React from 'react';
import { shallow } from 'enzyme';

import Campaigns from '../Campaigns';

describe('Campaigns', () => {
  it('renders elements', async () => {
    const wrapper = shallow(<Campaigns />);
    expect(wrapper).toMatchSnapshot();
  });
});
