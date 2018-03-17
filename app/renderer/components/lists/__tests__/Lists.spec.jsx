import React from 'react';
import { shallow } from 'enzyme';

import Lists from '../Lists';

describe('Lists', () => {
  it('matches snapshot', async () => {
    const wrapper = shallow(<Lists />);
    expect(wrapper).toMatchSnapshot();
  });
});
