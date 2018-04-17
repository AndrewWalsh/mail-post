import React from 'react';
import { shallow } from 'enzyme';

import PageHoc from '../PageHoc';

describe('PageHoc', () => {
  it('matches snapshot', async () => {
    const TestComponent = () => <div>hello</div>;
    const Component = PageHoc(TestComponent);
    const wrapper = shallow(<Component />);
    expect(wrapper).toMatchSnapshot();
  });
});
