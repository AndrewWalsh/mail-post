import React from 'react';
import { shallow } from 'enzyme';

import Layout from '../Layout';

describe('Layout', () => {
  const TestComponent = () => <div>hello</div>;
  it('renders children in the main element', async () => {
    const wrapper = shallow(<Layout><TestComponent /></Layout>);

    expect(wrapper.find('Layout__Main').contains(<TestComponent />)).toBe(true);
  });

  it('matches snapshot', async () => {
    const wrapper = shallow(<Layout><TestComponent /></Layout>);
    expect(wrapper).toMatchSnapshot();
  });
});
