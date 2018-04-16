import React from 'react';
import { shallow } from 'enzyme';

import pageHoc from '../pageHoc';

const TestComponent = () => <div>hello</div>;
describe('pageHoc', () => {
  it('matches snapshot', async () => {
    const Component = pageHoc(TestComponent);
    const wrapper = shallow(<Component />);
    expect(wrapper).toMatchSnapshot();
  });
});
