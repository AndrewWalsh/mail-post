import React from 'react';
import { shallow } from 'enzyme';

import PageHoc from '../PageHoc';

const TestComponent = () => <div>hello</div>;
describe('PageHoc', () => {
  it('matches snapshot', async () => {
    const Component = PageHoc(TestComponent);
    const wrapper = shallow(<Component />);
    expect(wrapper).toMatchSnapshot();
  });
});
