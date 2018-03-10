import React from 'react';
import { shallow } from 'enzyme';

import Link from '../Link';

describe('Link', () => {
  it('renders a Link and passes props', async () => {
    const wrapper = shallow(<Link />);
    expect(wrapper).toMatchSnapshot();
  });
});
