import React from 'react';
import { shallow } from 'enzyme';

import Link from '../Link';

describe('Link', () => {
  it('matches snapshot', async () => {
    const TestComponent = () => <div />;
    const wrapper = shallow(<Link><TestComponent /></Link>);
    expect(wrapper).toMatchSnapshot();
  });
});
