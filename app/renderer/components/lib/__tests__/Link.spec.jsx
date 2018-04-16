import React from 'react';
import { shallow } from 'enzyme';

import Link from '../Link';

describe('Link', () => {
  it('matches snapshot', async () => {
    const wrapper = shallow(<Link />);
    expect(wrapper).toMatchSnapshot();
  });
});
