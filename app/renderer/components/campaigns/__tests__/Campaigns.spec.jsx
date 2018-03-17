import React from 'react';
import { shallow } from 'enzyme';

import Campaigns from '../Campaigns';

describe('Campaigns', () => {
  it('matches snapshot', async () => {
    const wrapper = shallow(<Campaigns />);
    expect(wrapper).toMatchSnapshot();
  });
});
