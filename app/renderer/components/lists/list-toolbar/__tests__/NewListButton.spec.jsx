import React from 'react';
import { shallow } from 'enzyme';

import NewListButton from '../NewListButton';

describe('NewListButton', () => {
  it('matches snapshot', async () => {
    const wrapper = shallow(<NewListButton />);
    expect(wrapper).toMatchSnapshot();
  });
});
