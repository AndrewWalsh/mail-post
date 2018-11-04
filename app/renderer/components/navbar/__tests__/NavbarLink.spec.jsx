import React from 'react';
import { shallow } from 'enzyme';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';

import NavbarLink from '../NavbarLink';

describe('NavbarLink', () => {
  let props;
  beforeEach(() => {
    props = {
      to: 'a route',
      text: 'name',
    };
  });

  it('matches snapshot', () => {
    const wrapper = shallow(<NavbarLink {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('when renderIcon is passed, renders prop', () => {
    const TestComponent = () => <div />;
    const wrapper = shallow(
      <NavbarLink
        {...props}
        renderIcon={() => <TestComponent />}
      />,
    );
    expect(wrapper.dive().find(TestComponent).exists()).toBe(true);
  });

  it('when renderIcon is NOT passed, renders KeyboardArrowRightIcon', () => {
    const wrapper = shallow(<NavbarLink {...props} />);
    expect(wrapper.dive().find(KeyboardArrowRightIcon).exists()).toBe(true);
  });
});
