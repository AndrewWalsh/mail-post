import React from 'react';
import { shallow } from 'enzyme';

import Lists from '../Lists';

describe('Lists', () => {
  it('renders elements', async () => {
    const wrapper = shallow(<Lists />);
    expect(wrapper).toMatchSnapshot();
  });
});
