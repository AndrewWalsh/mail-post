import React from 'react';
import { shallow } from 'enzyme';

import Link from '../Link';

const TestComponent = () => <div>hello</div>;
describe('Link', () => {
  it('matches snapshot', async () => {
    const wrapper = shallow(<Link><TestComponent /></Link>);
    expect(wrapper).toMatchSnapshot();
  });
});
